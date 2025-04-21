import { NextFunction, Request, Response } from 'express';
import { User } from '../model/index';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.user.id;

  const user = await User.findById(userId);

  if (user?.isAdmin) {
    next();
  } else {
    next(new Error('You are not authorized to access this resource'));
  }
};

export default isAdmin;
