import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const categoryRoutes = Router();

categoryRoutes.post('/create', isAuthenticated, createCategory as any);
categoryRoutes.get('/list', getAllCategories as any);
categoryRoutes.get('/:id', getCategoryById as any);
categoryRoutes.put('/:id', isAuthenticated, updateCategory as any);
categoryRoutes.delete('/:id', isAuthenticated, deleteCategory as any);

export default categoryRoutes;
