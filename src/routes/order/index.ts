import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderStatus,
  getSingleOrder,
  updatedOrder,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post('/create', isAuthenticated, createOrder as any);
orderRoutes.get('/list', getAllOrders as any);
orderRoutes.get('/getSingleOrder/:id', getSingleOrder as any);
orderRoutes.put('/updateOrder/:id', isAuthenticated, updatedOrder as any);
orderRoutes.get('/status', isAuthenticated, getOrderStatus as any);

export default orderRoutes;
