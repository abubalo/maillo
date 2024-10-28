import WebSocket from "ws";
import { ImapClient, getSecureImapClient } from "../config/imapClient";
import { logger } from "@utils/logger";
import EventEmitter from "events";

interface UserConnection {
  userId: string;
  email: string;
  imapClient: ImapClient;
  webSockets: Set<WebSocket>;
}

export class EmailNotificationManager extends EventEmitter {
  private userConnections: Map<string, UserConnection> = new Map();

  async addUser(
    userId: string,
    email: string,
    password: string,
    ws: WebSocket
  ) {
    try {
      let connection = this.userConnections.get(userId);

      if (!connection) {
        const imapClient = await getSecureImapClient(userId, email, password);

        connection = {
          userId,
          email,
          imapClient,
          webSockets: new Set([ws]),
        };

        this.userConnections.set(userId, connection);

        await this.setupImapListener(connection);
      } else {
        connection.webSockets.add(ws);
      }

      ws.on("close", () => this.handleWebSocketClose(userId, ws));

      logger.info(`User ${userId} connected for email notification!`);
    } catch (error) {
      logger.error("Error setting up email notifications", { error, userId });
      throw error;
    }
  }

  private async setupImapListener(connection: UserConnection) {
    const { userId, imapClient } = connection;

    imapClient.client.on("exists", async (count: number) => {
      try {
        const mailboxLock = await imapClient.client.getMailboxLock("INBOX");

        try {
          const message = await imapClient.client.fetchOne(count.toString(), {
            source: true,
            flags: true,
          });

          const notification = {
            type: "NEW_EMAIL",
            messageId: count,
            flages: Array.from(message.flags),
            timestamp: new Date().toISOString(),
          };

          this.broadcastToUser(userId, notification);
        } finally {
          mailboxLock.release();
        }
      } catch (error) {
        logger.error("Error processing new email", { error, userId });
      }
    });

    imapClient.client.on("mailbox", (mailBoxInfo) => {
      const notification = {
        type: "MAILBOX_UPDATE",
        mailBox: mailBoxInfo,
        timestamp: new Date().toISOString(),
      };

      this.broadcastToUser(userId, notification);
    });
  }

  private broadcastToUser<T>(userId: string, message: T): void {
    const connection = this.userConnections.get(userId);

    if (connection) {
      const payload = JSON.stringify(message);
      connection.webSockets.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(payload);
        }
      });
    }
  }

  private async handleWebSocketClose(
    userId: string,
    ws: WebSocket
  ): Promise<void> {
    const connection = this.userConnections.get(userId);

    if (connection) {
      connection.webSockets.delete(ws);

      if (connection.webSockets.size === 0) {
        try {
          await this.removeUser(userId);
        } catch (error) {
          logger.error("Error removing user connection", { error, userId });
        }
      }
    }
  }

  async removeUser(userId: string): Promise<void> {
    const connection = this.userConnections.get(userId);

    if (connection) {
      connection.webSockets.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      });

      try {
        await connection.imapClient.client.logout();
      } catch (error) {
        logger.error("Error logging out IMAP client", { error, userId });
      }
    }
    this.userConnections.delete(userId);
    logger.info(`Removed email notifications for user ${userId}`);
  }
}

export const emailNotificationManager = new EmailNotificationManager();
