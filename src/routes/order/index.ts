import { Router } from 'express';
import { createOrder, getAllOrders } from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post('/create', isAuthenticated, createOrder as any);
orderRoutes.get('/getAllOrders', isAuthenticated, getAllOrders as any);

export default orderRoutes;
