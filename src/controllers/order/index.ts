import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order, Product, User } from '../../model/index';
import { createPaymentSession } from '../../utils/createPaymentSession';

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    const user = await User.findById(req.body.user.id);

    if (!user?.isShippingAddress) {
      throw new Error('Please provide Shipping address');
    }

    if (!orderItems || orderItems.length <= 0) {
      throw new Error('No order items');
    }

    const newOrder = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      totalPrice,
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
      message: `Order created successfully`,
      orderItems,
      user,
    });
  },
);
