import mongoose from 'mongoose';
import { IBrand } from 'src/types/brand';

const Schema = mongoose.Schema;

const BrandSchema = new Schema<IBrand>(
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

const Category = mongoose.model<IBrand>('Brand', BrandSchema);

export default Category;
