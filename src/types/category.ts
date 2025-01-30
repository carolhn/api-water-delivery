import { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  image?: string;
  user: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
}
