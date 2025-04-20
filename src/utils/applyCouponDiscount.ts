import { Coupon } from '../model';

export const applyCouponDiscount = async (
  couponCode: string,
  totalPrice: number,
) => {
  const couponFound = await Coupon.findOne({
    code: couponCode.toUpperCase(),
  });

  if (!couponFound) {
    throw new Error('Coupon not found');
  }

  if (couponFound.endDate && new Date(couponFound.endDate) < new Date()) {
    throw new Error('Coupon has expired');
  }

  const discountPercentage = couponFound.discount;
  const discountRate = discountPercentage / 100;
  const finalPrice = totalPrice - totalPrice * discountRate;

  return { discount: discountPercentage, finalPrice };
};
