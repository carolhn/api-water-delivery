import { Router } from 'express';
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updatedCoupon,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const couponRoutes = Router();

couponRoutes.post('/', isAuthenticated, createCoupon as any);
couponRoutes.get('/listCoupons', isAuthenticated, getAllCoupons as any);
couponRoutes.get('/:id', isAuthenticated, getSingleCoupon as any);
couponRoutes.put('/:id', isAuthenticated, updatedCoupon as any);
couponRoutes.delete('/:id', isAuthenticated, deleteCoupon as any);

export default couponRoutes;
