import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../model/category';

export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, user } = req.body;

    try {
      const categoryFound = await Category.findOne({ name });

      if (categoryFound) {
        throw new Error('Category already exists');
      }

      const userId = req.body.user.id;

      const newCategory = await Category.create({
        name,
        user: userId,
      });

      res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        newCategory,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories = await Category.find();
      console.log('getAllCategories', categories);

      res.status(200).json({
        status: 'success',
        message: 'Categories fetched successfully',
        categories,
      });
    } catch (error) {
      next(error);
    }
  },
);
