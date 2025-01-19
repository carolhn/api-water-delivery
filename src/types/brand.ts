import mongoose from 'mongoose';

export interface IBrand {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
}
