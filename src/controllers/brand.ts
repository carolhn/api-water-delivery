import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Brand from '../model/brand';

export const createBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    try {
      const brandFound = await Brand.findOne({ name });

      if (brandFound) {
        throw new Error('Brand already exists');
      }

      const userId = req.body.user.id;

      const newBrand = await Brand.create({
        name: name.toLowerCase(),
        user: userId,
      });

      res.status(201).json({
        status: 'success',
        message: `Brand ${name} created successfully`,
        newBrand,
      });
    } catch (error) {
      next(error);
    }
  },
);
