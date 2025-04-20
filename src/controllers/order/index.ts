import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order, Product, User } from '../../model/index';
import { applyCouponDiscount } from '../../utils/applyCouponDiscount';
import { createPaymentSession } from '../../utils/createPaymentSession';

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { orderItems, shippingAddress } = req.body;
    const { coupon } = req.query;

    const user = await User.findById(req.body.user.id);

    if (!user?.isShippingAddress) {
      throw new Error('Please provide Shipping address');
    }

    const totalPrice = orderItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    let discount = 0;
    let finalPrice = totalPrice;

    if (coupon) {
      const discountResult = await applyCouponDiscount(
        coupon.toString(),
        totalPrice,
      );
      discount = discountResult.discount;
      finalPrice = discountResult.finalPrice;
    }

    const newOrder = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      discount,
      totalPrice: finalPrice,
    });

    const productIds = orderItems.map((item: any) => item._id);

    const products = await Product.find({ _id: { $in: productIds } });

    await Promise.all(
      orderItems.map(async (orderItem: any) => {
        const productOrder = products.find(product => {
          return product._id.toString() === orderItem._id.toString();
        });

        if (productOrder) {
          productOrder.totalSold += orderItem.quantity;
          await productOrder.save();
        }
      }),
    );

    user?.orders.push(newOrder._id as string);
    await user?.save();

    const sessionUrl = await createPaymentSession(orderItems);

    res.send({ url: sessionUrl });

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      order: newOrder,
      user,
    });
  },
);

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const orders = await Order.find();
    res.status(200).json({
      status: 'success',
      message: `Orders fetched successfully`,
      orders,
    });
  },
);

export const getSingleOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const order = await Order.findById(id);

    res.status(200).json({
      status: 'success',
      message: `Order fetched successfully`,
      order,
    });
  },
);

export const updatedOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrders = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      message: `Order updated successfully`,
      updatedOrders,
    });
  },
);
