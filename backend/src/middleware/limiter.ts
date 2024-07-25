import { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

const rateLimitError = (req: Request, res: Response) => {
  return res.status(429).json({
    error: 'Rate limit exceeded',
    message: 'Too many request attempt, please try again',
  });
};

export const LoginLimiter = rateLimit({
  windowMs: 25 * 60 * 1000, // 25 minutes window
  max: 50,
  message: 'Too many login attempts, please try again later.',
  handler: rateLimitError,
});

export const authLimiter = rateLimit({
  windowMs: 25 * 60 * 1000, // 25 minutes window
  max: 50,
  message: 'Too many login or regisration attempts, please try again later.',
  handler: rateLimitError,
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  handler: rateLimitError,
});

export const fileUploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Too many file uploads from this IP, please try again later.',
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many file uploads from this IP, please try again later.',
    });
  },
});
