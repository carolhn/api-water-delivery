import { Router } from 'express';

import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';
import isAdmin from '../../middlewares/isAdmin';

const brandRoutes = Router();

brandRoutes.post('/create', isAuthenticated, isAdmin, createBrand as any);
brandRoutes.get('/list', getAllBrands as any);
brandRoutes.get('/:id', getBrandById as any);
brandRoutes.put('/:id', isAuthenticated, isAdmin, updateBrand as any);
brandRoutes.delete('/:id', isAuthenticated, isAdmin, deleteBrand as any);

export default brandRoutes;
