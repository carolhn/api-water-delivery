import express, { Request, Response } from 'express';

const webHookRoutes = express.Router();

webHookRoutes.post('/webhook', (req: Request, res: Response) => {
  const event = req.body;

  console.log('🔔 Event received:', event.type);

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('💰 Payment succeeded:', event.data.object.id);
      break;
    case 'payment_method.attached':
      console.log('📌 Payment method attached:', event.data.object.id);
      break;
    default:
      console.log(`⚠️ Unhandled event: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export default webHookRoutes;
