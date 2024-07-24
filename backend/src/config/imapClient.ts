import { ImapFlow } from "imapflow";
import { dovecotConfig } from "./dovecot";
import { logger } from "../utils/logger";

let client: ImapFlow | null = null;
const CONNECT_TIMEOUT = 30000; // 30 seconds

export async function getSecureImapClient(): Promise<ImapFlow> {
  if (!client || !client.usable) {
    if (client) {
      await closeImapClient();
    }
    client = new ImapFlow(dovecotConfig);
    try {
      await Promise.race([
        client.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Connection timeout")), CONNECT_TIMEOUT)
        )
      ]);
      logger.info("Connected to IMAP server at localhost:993");
    } catch (error) {
      logger.error("Failed to connect to IMAP server", { error });
      if (error instanceof Error) {
        throw new ImapConnectionError("Failed to connect to IMAP server", { cause: error });
      } else {
        throw new ImapConnectionError("Failed to connect to IMAP server");
      }
    }
  }
  return client;
}

export async function closeImapClient(): Promise<void> {
  if (client) {
    try {
      await client.logout();
    } catch (error) {
      logger.warn("Error during IMAP client logout", { error });
    } finally {
      client = null;
    }
  }
}

class ImapConnectionError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ImapConnectionError';
  }
}

// Simple connection checker
export async function checkImapConnection(): Promise<boolean> {
  try {
    const client = await getSecureImapClient();
    return client.usable;
  } catch (error) {
    logger.error("IMAP connection check failed", { error });
    return false;
  }
}