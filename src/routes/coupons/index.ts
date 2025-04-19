import { Router } from 'express';
import { createCoupon } from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const couponRoutes = Router();

couponRoutes.post('/', isAuthenticated, createCoupon as any);

export default couponRoutes;
