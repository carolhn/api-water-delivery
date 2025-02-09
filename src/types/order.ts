import { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  orderItens: Object[];
  shippingAddress: Object;
  orderNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  currency: string;
  status: string;
  delivereAt: Date;
}
