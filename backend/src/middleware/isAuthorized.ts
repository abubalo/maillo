import { NextFunction, Request, Response } from "express";
import { getUserById } from "@/services/user.service";
import { getRedisClient } from "@/utils/redis";
import { getUserFromCache, setUserInCache } from "@/cache/user.cache";
import { env } from "@/config/env";

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
        .json({ error: "Unauthorized: User ID is missing" });
    }

    const cacheduser = await getUserFromCache(userId);

    if (cacheduser) {
      req.user = cacheduser;
    } else {
      const user = await getUserById(userId);

      if ("status" in user) {
        return res.status(404).json({ error: "User not found" });
      }

      await redis.setex(
        `user:${userId}`,
        env.REDIS_CACHE_TTL,
        JSON.stringify(user)
      );

      await setUserInCache(userId, user);

      req.user = user;
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
