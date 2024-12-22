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

    const user = await User.create({
      fullName,
      email,
      password,
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
