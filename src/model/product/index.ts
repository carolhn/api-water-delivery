import mongoose from 'mongoose';
import { IProduct } from 'src/types/product';

const Schema = mongoose.Schema;

interface IProductModel extends IProduct {}

const ProductSchema = new Schema<IProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      ref: 'Brand',
    },
    category: {
      type: String,
      required: true,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    images: [
      {
        type: [String],
        default: [],
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],

    price: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

ProductSchema.virtual('quantityLeft').get(function (this: IProductModel) {
  return Math.max(0, this.totalQuantity - this.totalSold);
});

ProductSchema.virtual('totalReviews').get(function (this: IProductModel) {
  return this.reviews.length;
});

ProductSchema.virtual('averageRating').get(function (this: IProductModel) {
  if (!this.reviews || this.reviews.length === 0) return 0;

  const ratingTotal = this.reviews.reduce(
    (sum: number, review: any) => sum + (review as { rating: number }).rating,
    0,
  );

  return Number((ratingTotal / this.reviews.length).toFixed(1));
});

const Product = mongoose.model<IProductModel>('Product', ProductSchema);

export default Product;
