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

export const getAllBrands = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brands = await Brand.find();

      res.status(200).json({
        status: 'success',
        message: 'Brands fetched successfully',
        brands,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const getBrandById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const brand = await Brand.findById(id);

      if (!brand) {
        throw new Error('Brand not found');
      }

      res.status(200).json({
        status: 'success',
        message: 'Brand fetched successfully',
        brand,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const updateBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    try {
      const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true },
      );

      if (!brand) {
        throw new Error('Brand not found');
      }

      res.status(200).json({
        status: 'success',
        message: `Brand ${name} updated successfully`,
        brand,
      });
    } catch (error) {
      next(error);
    }
  },
);
