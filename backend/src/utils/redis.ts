import { env } from "@/config/env";
import Redis from "ioredis";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_UPSTACH_URL || "");
  }
  return redisClient;
}
