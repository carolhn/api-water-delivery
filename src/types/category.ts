import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  image?: string;
  user: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
}
