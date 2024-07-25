import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import logger from '../../utils/logger';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error: ${err.message} \n${err.stack}`);

  if (err instanceof createHttpError.HttpError) {
    // Handle known HTTP errors
    res.status(err.statusCode).json({ error: err.message });
  } else {
    // Handle unexpected errors
    const error = createHttpError(500, 'Internal Server Error');
    res.status(error.statusCode).json({ error: error.message });
  }

  next(err);
};
