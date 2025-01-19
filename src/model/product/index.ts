import mongoose from 'mongoose';
import { IProduct } from 'src/types/product';

const Schema = mongoose.Schema;

interface IPoductModel extends IProduct {}

const ProductSchema = new Schema<IPoductModel>(
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

const Product = mongoose.model<IPoductModel>('Product', ProductSchema);

export default Product;
