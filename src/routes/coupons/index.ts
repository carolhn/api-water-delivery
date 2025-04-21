import { Router } from 'express';
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updatedCoupon,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';
import isAdmin from '../../middlewares/isAdmin';

const couponRoutes = Router();

couponRoutes.post('/', isAuthenticated, isAdmin, createCoupon as any);
couponRoutes.get('/list', getAllCoupons as any);
couponRoutes.get('/:id', getSingleCoupon as any);
couponRoutes.put('/:id', isAuthenticated, isAdmin, updatedCoupon as any);
couponRoutes.delete('/:id', isAuthenticated, isAdmin, deleteCoupon as any);

export default couponRoutes;
