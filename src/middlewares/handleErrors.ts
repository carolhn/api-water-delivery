import { NextFunction, Request, Response } from 'express';
import { IAppError } from '../utils/errors';

export function handleErrors(
  error: Error | IAppError,
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if ('statusCode' in error) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else {
    response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
