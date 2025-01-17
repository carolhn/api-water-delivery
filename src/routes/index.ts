import { Router } from 'express';
import categoryRoutes from './category';
import productRoutes from './product';
import userRoutes from './users';

const router = Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/products', productRoutes);
router.use('/api/v1/categories', categoryRoutes);

export default router;
