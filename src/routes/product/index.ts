import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';
import isAdmin from '../../middlewares/isAdmin';

const productRoutes = Router();

productRoutes.post('/create', isAuthenticated, isAdmin, createProduct as any);
productRoutes.get('/list', getProducts as any);
productRoutes.get('/:id', getProductById as any);
productRoutes.put('/:id', isAuthenticated, isAdmin, updateProduct as any);
productRoutes.delete('/:id', isAuthenticated, isAdmin, deleteProduct as any);

export default productRoutes;
