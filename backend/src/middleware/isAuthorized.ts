import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../models/user.model';
import { getRedisClient } from '@/utils/redis';
import { redisConfig } from '@/config/redis.config';

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const redis = getRedisClient();
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User ID is missing' });
    }

    const cacheduser = await redis.get(`user:${userId}`);

    if (cacheduser) {
      req.user = JSON.parse(cacheduser);
    } else {
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await redis.setex(
        `user:${userId}`,
        redisConfig.ttl,
        JSON.stringify(user)
      );

      req.user = user;
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
