import { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  user: Schema.Types.ObjectId;
}
