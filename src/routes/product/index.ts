import { Router } from 'express';
import { createProduct, getProducts } from '../../controllers/products';
import { isAuthenticated } from '../../middlewares/auth';

const productRoutes = Router();

productRoutes.post('/', isAuthenticated, createProduct as any);
productRoutes.get('/', getProducts as any);

export default productRoutes;
