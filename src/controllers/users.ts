import { compare, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../model/user';

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, fullName } = req.body;

    try {
      const userFound = await User.findOne({ email });

      if (userFound) {
        throw new Error('User already exists');
      }

      const passwordHash = await hash(password, 8);

      const newUser = await User.create({
        fullName,
        email,
        password: passwordHash,
      });

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
      const userFound = await User.findOne({ email });

      if (userFound && (await compare(password, userFound.password))) {
        res.status(200).json({
          status: 'success',
          message: 'User logged in successfully',
          data: userFound,
        });
      } else {
        throw new Error('Invalid login details');
      }
    } catch (error) {
      next(error);
    }
  },
);
