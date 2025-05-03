import { Request, Response, NextFunction } from 'express';
import { environment } from '../config/env';

interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
    ...(environment.nodeEnv === 'development' && { stack: err.stack }),
  });
};
