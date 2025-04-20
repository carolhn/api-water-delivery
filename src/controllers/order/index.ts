import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order, Product, User } from '../../model/index';
import { OrderItem } from '../../types/order';
import { createPaymentSession } from '../../utils/createPaymentSession';

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { orderItems, shippingAddress } = req.body;

    let totalPrice = req.body.totalPrice;
    if (!totalPrice) {
      totalPrice = orderItems.reduce(
        (total: number, item: OrderItem) => total + item.price * item.quantity,
        0,
      );
    }

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
