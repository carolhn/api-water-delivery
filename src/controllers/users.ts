import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../model/user';
import { AppError } from '../utils/errors/index';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw AppError('User already exists', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = await User.create({
      fullName,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    throw AppError('Internal server error', 500);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound && (await compare(password, userFound.password))) {
      throw AppError('User logged in successfully', 200);
    } else {
      throw AppError('Invalid login details', 400);
    }
  } catch (error) {
    throw AppError('Internal server error', 500);
  }
};
