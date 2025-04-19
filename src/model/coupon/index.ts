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

CouponSchema.virtual('isExpired').get(function () {
  return this.endDate.getTime() < Date.now();
});

CouponSchema.pre('validate', function (next) {
  if (this.endDate < this.startDate) {
    next(new Error('End date cannot be less than the start date'));
  }
  next();
});

CouponSchema.pre('validate', function (next) {
  if (this.startDate.getTime() < Date.now()) {
    next(new Error('Start date cannot be less than today'));
  }
  next();
});

CouponSchema.pre('validate', function (next) {
  if (this.endDate.getTime() < Date.now()) {
    next(new Error('End Date date cannot be less than today'));
  }
  next();
});

CouponSchema.pre('validate', function (next) {
  if (this.discount < 0 || this.discount > 100) {
    next(new Error('Discount cannot be less than 0 or greater than 100'));
  }
  next();
});

const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
