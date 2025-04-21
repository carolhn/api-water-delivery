import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

export const createPaymentSession = async (orderItems: any[]) => {
  const converterOrders = orderItems.map(
    (item: { name: any; description: any; price: number; quantity: any }) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: item?.name,
            description: item?.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: item?.quantity,
      };
    },
  );

  const stripeKey = new Stripe(process.env.STRIPE_KEY as string);

  const session = await stripeKey.checkout.sessions.create({
    line_items: converterOrders,
    metadata: {
      orderItems: JSON.stringify(orderItems),
    },
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    automatic_tax: { enabled: false },
  });
  return session.url;
};
