import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Schema } from 'mongoose';
import { Brand, Category, Product } from '../../model/index';
import { paginate } from '../../utils/pagination';

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, category, user, price, totalQuantity, brand } =
      req.body;

    try {
      const productsExists = await Product.findOne({ name });
      if (productsExists) {
        throw new Error('Product already exists');
      }

      const categoryFound = await Category.findOne({ name: category });
      if (!categoryFound) {
        throw new Error(
          'Category not found, please create category first ou check category name',
        );
      }

      const brandFound = await Brand.findOne({ name: brand });
      if (!brandFound) {
        throw new Error(
          'Brand not found, please create brand first or check brand name',
        );
      }

      const newProduct = await Product.create({
        name,
        description,
        category,
        user: req.body.user.id,
        price,
        brand,
        totalQuantity,
      });

      categoryFound.products.push(
        newProduct._id as any as Schema.Types.ObjectId,
      );

      brandFound.products.push(newProduct._id as any as Schema.Types.ObjectId);

      await categoryFound.save();
      await brandFound.save();

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

export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, description, category, user, price, totalQuantity, brand } =
        req.body;

      const userId = req.body.user.id;

      const updateFieldsProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          category,
          user: userId,
          price,
          totalQuantity,
          brand,
        },
        { new: true },
      );

      if (!updateFieldsProduct) {
        throw new Error('Product not found');
      }

      res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        updateFieldsProduct,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleteProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deleteProduct) {
        throw new Error('Product not found');
      }

      res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);
