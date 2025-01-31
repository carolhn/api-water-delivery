import mongoose from 'mongoose';
import { ICategory } from 'src/types/category';

const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
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

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
