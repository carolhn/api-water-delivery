import { Router } from 'express';
import { createOrder } from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const orderRoutes = Router();

orderRoutes.post('/create', isAuthenticated, createOrder as any);

export default orderRoutes;
