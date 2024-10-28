import Redis from 'ioredis';
import { redisConfig } from '@config/redis.config';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(redisConfig);
  }
  return redisClient;
}