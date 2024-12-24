import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export function handleErrors(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    message,
    statusCode,
  });
}

export function notFound(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  next(err);
}
