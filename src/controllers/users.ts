import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../model/user';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
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
    return res.status(500).json({ message: 'Internal server error', error });
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
      return res.status(200).json({ message: 'User logged in successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid login details' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
