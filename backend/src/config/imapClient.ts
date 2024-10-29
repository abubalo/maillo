import { ImapFlow } from "imapflow";
import { logger } from "../utils/logger";
import { Pool, createPool } from "generic-pool";
import { EventEmitter } from "events";
import { env } from "./env";

export interface ImapClient {
  client: ImapFlow;
  userId: string;
}

export class ImapConnectionPool extends EventEmitter {
  private pools: Map<string, Pool<ImapClient>> = new Map();
  private readonly maxPoolSize = 10;
  private readonly minPoolSize = 2;
  private readonly acquireTimeout = 30000;
  private readonly idleTimeout = 30000;

  async getClient(
    userId: string,
    email: string,
    password: string
  ): Promise<ImapClient> {
    if (!this.pools.has(userId)) {
      const pool = createPool(
        {
          create: async () => {
            try {
              const client = new ImapFlow({
                host: env.IMAP_HOST,
                secure: env.IMAP_SECURE,
                port: env.IMAP_PORT,
                auth: { user: email, pass: password },
              });
              await client.connect();
              this.emit("create");
              return { client, userId };
            } catch (error) {
              this.emit("factoryCreateError", error);
              throw error;
            }
          },
          destroy: async (client) => {
            try {
              await client.client.logout();
              this.emit("destroy");
            } catch (error) {
              this.emit("factoryDestroyError", error);
              throw error;
            }
          },
          validate: (client) => Promise.resolve(client.client.usable),
        },
        {
          max: this.maxPoolSize,
          min: this.minPoolSize,
          acquireTimeoutMillis: this.acquireTimeout,
          idleTimeoutMillis: this.idleTimeout,
          testOnBorrow: true,
        }
      );
      this.pools.set(userId, pool);
    }

    const pool = this.pools.get(userId)!;
    return pool.acquire();
  }

  async releaseClient(client: ImapClient): Promise<void> {
    const pool = this.pools.get(client.userId);
    if (pool) {
      await pool.release(client);
    }
  }

  async destroyPool(userId: string): Promise<void> {
    const pool = this.pools.get(userId);
    if (pool) {
      await pool.drain();
      await pool.clear();
      this.pools.delete(userId);
    }
  }

  getPoolStats() {
    const stats = {
      numUsed: 0,
      numFree: 0,
      numWaitingClients: 0,
      max: 0,
    };

    for (const pool of this.pools.values()) {
      stats.numUsed += pool.borrowed;
      stats.numFree += pool.size - pool.borrowed;
      stats.numWaitingClients += pool.pending;
      stats.max += pool.max;
    }

    return stats;
  }
}

const imapPool = new ImapConnectionPool();

export class ImapConnectionError extends Error {
  cause: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "ImapConnectionError";
    this.cause = cause;
  }
}

export async function getSecureImapClient(
  userId: string,
  email: string,
  password: string
): Promise<ImapClient> {
  try {
    return await imapPool.getClient(userId, email, password);
  } catch (error) {
    logger.error("Failed to get IMAP client", { error, userId });
    throw new ImapConnectionError("Failed to connect to IMAP server", error);
  }
}

export async function releaseImapClient(client: ImapClient): Promise<void> {
  await imapPool.releaseClient(client);
}

export async function destroyUserPool(userId: string): Promise<void> {
  await imapPool.destroyPool(userId);
}

export async function checkImapConnection(
  userId: string,
  email: string,
  password: string
): Promise<boolean> {
  try {
    const client = await getSecureImapClient(userId, email, password);
    await releaseImapClient(client);
    return true;
  } catch (error) {
    logger.error("IMAP connection check failed", { error, userId });
    return false;
  }
}
