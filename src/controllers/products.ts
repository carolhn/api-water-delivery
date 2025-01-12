import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../model/product';
import { paginate } from '../utils/pagination';

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
      const query: any = {};

      if (req.query.name) {
        query.name = { $regex: req.query.name as string, $options: 'i' };
      }
      if (req.query.brand) {
        query.brand = { $regex: req.query.brand as string, $options: 'i' };
      }
      if (req.query.category) {
        query.category = {
          $regex: req.query.category as string,
          $options: 'i',
        };
      }
      if (req.query.price) {
        const price = req.query.price as string;
        const priceRange = price.split('-');
        query.price = {
          $gte: parseFloat(priceRange[0]),
          $lte: parseFloat(priceRange[1]),
        };
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;

      const { pagination, query: paginatedQuery } = await paginate(
        Product.find(query),
        page,
        limit,
      );

      const products = await paginatedQuery.exec();

      res.status(200).json({
        status: 'success',
        message: 'Products fetched successfully',
        products,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        throw new Error('Product not found');
      }

      res.status(200).json({
        status: 'success',
        message: 'Product fetched successfully',
        product,
      });
    } catch (error) {
      next(error);
    }
  },
);
