import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product, Review } from '../../model/index';

export const createReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { productID } = req.params;
    const { message, rating } = req.body;

    try {
      const productFound =
        await Product.findById(productID).populate('reviews');

      if (!productFound) {
        throw new Error('Product not found');
      }

      const userId = req.body.user.id;

      const hasReviewed = productFound.reviews.some((review: any) => {
        return review.user.toString() === userId;
      });

      if (hasReviewed) {
        throw new Error('You have already reviewed this product');
      }

      const newReview = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: userId,
      });

      productFound.reviews.push(newReview?._id as string);

      await productFound.save();

      res.status(201).json({
        status: 'success',
        message: `Review created successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
);
