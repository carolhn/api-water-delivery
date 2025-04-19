import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Coupon } from '../../model/index';

export const createCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { code, discount, endDate, startDate } = req.body;

    const couponExists = await Coupon.findOne({
      code,
    });

    if (couponExists) {
      throw new Error('Product already exists');
    }

    if (isNaN(discount)) {
      throw new Error('Discount value must be a number');
    }

    const coupon = await Coupon.create({
      code,
      startDate,
      endDate,
      discount,
      user: req.body.user.id,
    });

    res.json({
      status: 'success',
      message: 'Coupon created successfully',
      coupon,
    });
  },
);

export const getAllCoupons = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const coupons = await Coupon.find();

    res.status(200).json({
      status: 'success',
      message: 'Coupons fetched successfully',
      coupons,
    });
  },
);
