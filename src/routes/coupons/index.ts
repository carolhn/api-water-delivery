import { Router } from 'express';
import { createCoupon } from '../../controllers/index';

const couponRoutes = Router();

couponRoutes.post('/', createCoupon as any);

export default couponRoutes;
