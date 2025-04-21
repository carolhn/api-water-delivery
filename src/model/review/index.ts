import mongoose from 'mongoose';
import { IReview } from 'src/types/review';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Review must belong to a user.'],
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Review must belong to a product.'],
      ref: 'Product',
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5.'],
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: [true, 'Please add a message.'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
