import { Router } from 'express';
import productRoutes from './product';
import userRoutes from './users';

const router = Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/products', productRoutes);

export default router;
