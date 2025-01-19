import mongoose from 'mongoose';
import { ICategory } from 'src/types/category';

const Schema = mongoose.Schema;

interface ICategoryModel extends ICategory {}

const CategorySchema = new Schema<ICategoryModel>(
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

const Category = mongoose.model<ICategoryModel>('Category', CategorySchema);

export default Category;
