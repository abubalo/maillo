import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export default function httpLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  logger.info(
    `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.ip}]`
  );

  res.on('finish', () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    logger.info(
      `Outgoing -> Method: [${req.method}] - Url: [${req.url}] - Status: [${res.statusCode}] IP: [${req.ip}] Duration: [${duration}]ms`
    );
  });

  next();
}
