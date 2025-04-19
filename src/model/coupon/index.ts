import mongoose from 'mongoose';
import { ICoupon } from 'src/types/coupon';

const Schema = mongoose.Schema;

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
