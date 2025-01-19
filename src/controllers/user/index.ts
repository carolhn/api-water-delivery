import { compare, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../../model/index';
import { generateToken } from '../../utils/generateToken';

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
          token: generateToken({ id: userFound.id }),
        });
      } else {
        throw new Error('Invalid login details');
      }
    } catch (error) {
      next(error);
    }
  },
);

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.user.id;

      const user = await User.findById(userId).select('-password');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({
        status: 'success',
        message: 'User profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
);
