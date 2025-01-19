import mongoose from 'mongoose';
import { IBrand } from 'src/types/brand';

const Schema = mongoose.Schema;

interface IBrandModel extends IBrand {}

const BrandSchema = new Schema<IBrandModel>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

const Category = mongoose.model<IBrandModel>('Brand', BrandSchema);

export default Category;
