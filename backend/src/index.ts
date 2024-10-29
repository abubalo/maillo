import "tsconfig-paths/register";
import app from "./app";
import Logging from "./utils/Logging";
import { env } from "./config/env";
import * as db from "./config/db";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { emailNotificationManager } from "@/notifications/emailNotificationManager";
import {
  WebSocketAuthenticator,
  WS_RATE_LIMITS,
  wsConnections,
} from "@config/webSocketAuth";
import { Request } from "express";
import { logger } from "./utils/logger";
import {parse as parseUrl} from "url";

const server = http.createServer(app);

const webSocketServer = new WebSocketServer({
  server,
  verifyClient: async (info, callback) => {
    try {
      const req = info.req as Request;
      if (!req.url) {
        callback(false, 400, "Invalid request");
        return;
      }

      const { query } = parseUrl(req.url, true);
      if (!query.token) {
        callback(false, 401, "Authentication token required");
        return;
      }

      callback(true);
    } catch (error) {
      logger.error("WebSocket verification failed:", error);
      callback(false, 401, "Unauthorized");
    }
  },
});

webSocketServer.on("connection", async (ws: WebSocket, request: Request) => {
  try {
    const authenticatedWs = await WebSocketAuthenticator.authenticateConnection(
      ws,
      request
    );
    if (!authenticatedWs) {
      return;
    }

    Logging.log(
      `Authenticated WebSocket connection established for user: ${authenticatedWs.user._id}`
    );

    authenticatedWs.on("message", async (message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "subscribe_email_notifications") {
          await emailNotificationManager.addUser(
            String(authenticatedWs.user._id),
            authenticatedWs.user.email,
            data.password,
            authenticatedWs
          );

          authenticatedWs.send(
            JSON.stringify({
              type: "subscription_success",
              message: "Successfully subscribed to email notifications",
            })
          );
        }
      } catch (error) {
        logger.error("WebSocket message handling error:", error);
        authenticatedWs.send(
          JSON.stringify({
            type: "error",
            message: "Failed to process message",
          })
        );
      }
    });
  } catch (error) {
    logger.error("Error handling WebSocket connection:", error);
    ws.close(1011, "Internal server error");
  }
});

setInterval(() => {
  const now = Date.now();
  wsConnections.forEach((tracker, ip) => {
    if (now - tracker.lastReset > WS_RATE_LIMITS.windowMs) {
      wsConnections.delete(ip);
    }
  });
}, WS_RATE_LIMITS.windowMs);

const startServer = async () => {
  try {
    await db.connectDB();
    server.listen(env.PORT, () => {
      Logging.log(`Server is running on localhost:${env.PORT}`);
    });
  } catch (error) {
    Logging.error(`Error starting the server:', ${error}`);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string) => {
  Logging.log(`Received ${signal}. Initiating graceful shutdown...`);

  server.close(async (error) => {
    if (error) {
      Logging.error(`Error occured durring server shutdown: ${error}`);
      process.exit(1);
    }
    try {
      Logging.log("All connections closed. Exiting process.");
      process.exit(0);
    } catch (shutdownError) {
      Logging.error(`Error occured durring shutdown process. ${shutdownError}`);
      process.exit(1);
    }
  });

  setTimeout(() => {
    Logging.warn("Graceful shutdown timed out. Forcing exit.");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();
