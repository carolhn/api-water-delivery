import { Router } from 'express';
import brandRoutes from './brand';
import categoryRoutes from './category';
import orderRoutes from './order';
import productRoutes from './product';
import reviewRoutes from './review';
import userRoutes from './users';

const router = Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/products', productRoutes);
router.use('/api/v1/categories', categoryRoutes);
router.use('/api/v1/brands', brandRoutes);
router.use('/api/v1/reviews', reviewRoutes);
router.use('/api/v1/orders', orderRoutes);

export default router;
