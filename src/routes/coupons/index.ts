import { Router } from 'express';
import { createCoupon, getAllCoupons } from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const couponRoutes = Router();

couponRoutes.post('/', isAuthenticated, createCoupon as any);
couponRoutes.get('/listCoupons', isAuthenticated, getAllCoupons as any);

export default couponRoutes;
