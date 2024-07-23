import { ImapFlow } from "imapflow";
import { dovecotConfig } from "./dovecot";
import { logger } from "../utils/logger";

let client: ImapFlow | null = null;

export async function getImapClient(): Promise<ImapFlow> {
  if (!client) {
    client = new ImapFlow(dovecotConfig);
    try {
      await client.connect();
      logger.info("Connected to IMAP server at localhost:993");
    } catch (error) {
      logger.error("Failed to connect to IMAP server", { error });
      throw error;
    }
  }
  return client;
}

export async function closeImapClient(): Promise<void> {
  if (client) {
    await client.logout();
    client = null;
  }
}
