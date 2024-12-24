import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../model/product';

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, category, user, price, totalQuantity, brand } =
      req.body;

    try {
      const productsExists = await Product.findOne({ name });

      if (productsExists) {
        throw new Error('Product already exists');
      }

      const userId = req.body.user.id;

      const newProduct = await Product.create({
        name,
        description,
        category,
        user: userId,
        price,
        brand,
        totalQuantity,
      });

      res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
);
