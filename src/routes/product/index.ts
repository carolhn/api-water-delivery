import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../../controllers/products';
import { isAuthenticated } from '../../middlewares/auth';

const productRoutes = Router();

productRoutes.post('/create', isAuthenticated, createProduct as any);
productRoutes.get('/list', getProducts as any);
productRoutes.get('/:id', getProductById as any);
productRoutes.put('/:id', isAuthenticated, updateProduct as any);

export default productRoutes;
