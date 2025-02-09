import { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  orderItems: Object[];
  shippingAddress: Object;
  orderNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  totalPrice: number;
  currency: string;
  status: string;
  delivereAt: Date;
}
