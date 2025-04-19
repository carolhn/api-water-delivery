import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updatedOrder,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post('/create', isAuthenticated, createOrder as any);
orderRoutes.get('/getAllOrders', isAuthenticated, getAllOrders as any);
orderRoutes.get('/getSingleOrder/:id', isAuthenticated, getSingleOrder as any);
orderRoutes.put('/updateOrder/:id', isAuthenticated, updatedOrder as any);

export default orderRoutes;
