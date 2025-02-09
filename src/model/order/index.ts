import mongoose from 'mongoose';
import { IOrder } from 'src/types/order';

const Schema = mongoose.Schema;

const randomTxt = Math.random().toString(36).substring(7);
const randomNumbers = Math.floor(1000 + Math.random() * 9000);

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItens: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    paymentStatus: {
      type: String,
      default: 'Not Paid',
    },
    paymentMethod: {
      type: String,
      default: 'Not specified',
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    currency: {
      type: String,
      default: 'Not specified',
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    },
    delivereAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
