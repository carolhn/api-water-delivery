import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const createCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json({
      status: 'success',
      message: 'Coupon created successfully',
    });
  },
);
