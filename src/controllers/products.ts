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

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let products;

      if (req.query.name) {
        products = await Product.find({
          name: { $regex: req.query.name as string, $options: 'i' },
        });
      }

      if (req.query.brand) {
        products = await Product.find({
          brand: { $regex: req.query.brand as string, $options: 'i' },
        });
      }

      if (req.query.category) {
        products = await Product.find({
          category: { $regex: req.query.category as string, $options: 'i' },
        });
      }

      products = await Product.find({});

      res.status(200).json({
        status: 'success',
        message: 'Products fetched successfully',
        products,
      });
    } catch (error) {
      next(error);
    }
  },
);
