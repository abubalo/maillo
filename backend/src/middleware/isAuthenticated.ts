import { verifyJwtToken } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

function extractTokenFromCookies(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  const bearerCookie = req.cookies.Bearer;
  if (bearerCookie) {
    return bearerCookie;
  }

  return null;
}
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = extractTokenFromCookies(req);
  if (!token) {
    res.status(401).json({ error: 'Invalid token!' });
    return;
  }

  const { data: user, errorMessage } = await verifyJwtToken(token);

  if (!user) {
    res.status(401).json({ error: errorMessage || 'Invalid token!' });
    return;
  }

  req.userId = user.id;
  next();
  try {
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
