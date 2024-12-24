import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Ipayload, TOKEN_SECRET } from '../utils/generateToken';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(token, TOKEN_SECRET) as Ipayload;

    const { id } = decodedToken;

    req.body.user = { id };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}
