import { User } from '@/types';
import { getFromCache, setInCache, deleteFromCache } from './cache';

const userCachePrefix = 'user:';

export async function getUserFromCache(userId: string): Promise<User | null> {
  return getFromCache(`${userCachePrefix}${userId}`);
}

export async function setUserInCache(userId: string, userData: User): Promise<void> {
  return setInCache(`${userCachePrefix}${userId}`, userData);
}

export async function deleteUserFromCache(userId: string): Promise<void> {
  return deleteFromCache(`${userCachePrefix}${userId}`);
}
