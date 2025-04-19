import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post('/create', isAuthenticated, createOrder as any);
orderRoutes.get('/getAllOrders', isAuthenticated, getAllOrders as any);
orderRoutes.get('/getSingleOrder/:id', isAuthenticated, getSingleOrder as any);

export default orderRoutes;
