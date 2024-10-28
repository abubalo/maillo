
import * as jwt from 'jsonwebtoken';
import { User } from '../types';
import { getUserById } from '@/services/auth.service';
import { env } from '@/config/env';

type ErrorType = 'TOKEN_EXPIRED' | 'INVALID_PAYLOAD' | 'USER_NOT_FOUND' | 'TOKEN_INVALID';

type Result<T> = 
  | { success: true; value: T }
  | { success: false; errorMessage: string; errorType: ErrorType };

export async function generateJwtToken(user: Partial<User>): Promise<string> {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTime = currentTimestamp + 24 * 60 * 60; // 24 hours

  const payload = {
    sub: user._id,
    iat: currentTimestamp,
    exp: expirationTime,
    role: user.role,
  };

  return await new Promise<string>((resolve, reject) => {
    jwt.sign(payload, env.JWT_SECRET, { algorithm: 'HS256' }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
}

export async function verifyJwtToken(token: string): Promise<Result<User>> {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;

    if (typeof decoded.sub !== 'number') {
      return { success: false, errorMessage: 'Invalid token payload', errorType: 'INVALID_PAYLOAD' };
    }

    const userId = decoded.sub;
    const result = await getUserById(userId);

    if ("status" in result) {
      return { success: false, errorMessage: 'User does not exist', errorType: 'USER_NOT_FOUND' };
    }

    return { success: true, value: result };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, errorMessage: 'Token has expired', errorType: 'TOKEN_EXPIRED' };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, errorMessage: 'Invalid token', errorType: 'TOKEN_INVALID' };
    }
    return { success: false, errorMessage: 'Unable to verify token', errorType: 'TOKEN_INVALID' };
  }
}

