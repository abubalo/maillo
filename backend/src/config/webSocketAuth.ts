import { WebSocket } from "ws";
import { Request } from "express";
import { parse as parseUrl } from "url";
import { logger } from "../utils/logger";
import { verifyJwtToken } from "../utils/jwt";
import { User } from "../types";
import { Socket } from "net";

interface AuthenticatedWebSocket extends WebSocket {
  user: User;
  isAlive: boolean;
  connectionTime: number;
  messageCount: number;
  _socket: Socket;
}

interface WsConnectionTracker {
  connections: number;
  lastReset: number;
}

export const wsConnections: Map<string, WsConnectionTracker> = new Map();
export const WS_RATE_LIMITS = {
  maxConnectionsPerIP: 50,
  windowMs: 15 * 60 * 1000,
  maxMessagesPerMinute: 60,
  maxConnectionsPerUser: 5,
};

export class WebSocketAuthenticator {
  private static activeUserConnections: Map<
    string,
    Set<AuthenticatedWebSocket>
  > = new Map();

  static async authenticateConnection(
    ws: WebSocket,
    request: Request
  ): Promise<AuthenticatedWebSocket | null> {
    try {
      const { query } = parseUrl(request.url || "", true);
      const token = query.token as string;

      if (!token) {
        throw new Error("No authentication token provided");
      }

      const authResult = await verifyJwtToken(token);

      if (!authResult.success) {
        throw new Error(authResult.errorMessage);
      }

      const user = authResult.value;

      if (
        !this.checkRateLimits(
          request.socket.remoteAddress || "",
          String(user._id)
        )
      ) {
        throw new Error("Rate limit exceeded");
      }

      const authWs = ws as AuthenticatedWebSocket;
      authWs.user = user;
      authWs.isAlive = true;
      authWs.connectionTime = Date.now();
      authWs.messageCount = 0;

      this.trackUserConnection(authWs);

      this.setupPingPong(authWs);

      this.setupMessageRateLimiting(authWs);

      return authWs;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      logger.error("WebSocket authentication failed:", error);
      ws.close(1008, errorMessage);
      return null;
    }
  }

  private static checkRateLimits(ip: string, userId: string): boolean {
    const now = Date.now();
    let tracker = wsConnections.get(ip);

    if (!tracker || now - tracker.lastReset > WS_RATE_LIMITS.windowMs) {
      tracker = { connections: 0, lastReset: now };
    }

    if (tracker.connections >= WS_RATE_LIMITS.maxConnectionsPerIP) {
      return false;
    }

    const userConnections = this.activeUserConnections.get(userId)?.size || 0;
    if (userConnections >= WS_RATE_LIMITS.maxConnectionsPerUser) {
      return false;
    }

    tracker.connections++;
    wsConnections.set(ip, tracker);

    return true;
  }

  private static trackUserConnection(ws: AuthenticatedWebSocket): void {
    const userId = String(ws.user._id);
    const userConnections = this.activeUserConnections.get(userId) || new Set();
    userConnections.add(ws);
    this.activeUserConnections.set(userId, userConnections);

    ws.on("close", () => {
      const connections = this.activeUserConnections.get(userId);
      if (connections) {
        connections.delete(ws);
        if (connections.size === 0) {
          this.activeUserConnections.delete(userId);
        }
      }

      const ip = ws._socket.remoteAddress;
      if (ip) {
        const tracker = wsConnections.get(ip);
        if (tracker) {
          tracker.connections = Math.max(0, tracker.connections - 1);
        }
      }
    });
  }

  private static setupPingPong(ws: AuthenticatedWebSocket): void {
    const pingInterval = setInterval(() => {
      if (!ws.isAlive) {
        clearInterval(pingInterval);
        ws.terminate();
        return;
      }
      ws.isAlive = false;
      ws.ping();
    }, 30000);

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("close", () => {
      clearInterval(pingInterval);
    });
  }

  private static setupMessageRateLimiting(ws: AuthenticatedWebSocket): void {
    let messageCount = 0;
    let lastReset = Date.now();

    ws.on("message", (message: Buffer) => {
      const now = Date.now();

      if (now - lastReset >= 60000) {
        messageCount = 0;
        lastReset = now;
      }

      messageCount++;

      if (messageCount > WS_RATE_LIMITS.maxMessagesPerMinute) {
        ws.send(
          JSON.stringify({
            type: "error",
            message:
              "Message rate limit exceeded. Please wait before sending more messages.",
          })
        );
        return;
      }

      try {
        const data = JSON.parse(message.toString());
      } catch (error) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Invalid message format",
          })
        );
      }
    });
  }

  static getUserConnections(
    userId: string
  ): Set<AuthenticatedWebSocket> | undefined {
    return this.activeUserConnections.get(String(userId));
  }

  static broadcastToUser(userId: string, message: any): void {
    const connections = this.getUserConnections(String(userId));
    if (connections) {
      const payload = JSON.stringify(message);
      connections.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(payload);
        }
      });
    }
  }
}
