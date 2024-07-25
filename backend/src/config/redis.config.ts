import { env } from '@config/env';

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  ttl: parseInt(process.env.REDIS_CACHE_TTL || '3600', 10),
};
