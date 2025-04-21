import { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
}
