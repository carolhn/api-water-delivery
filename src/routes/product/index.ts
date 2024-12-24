import { Router } from 'express';
import { createProduct } from '../../controllers/products';
import { isAuthenticated } from '../../middlewares/auth';

const productRoutes = Router();

productRoutes.post('/', isAuthenticated, createProduct as any);

export default productRoutes;
