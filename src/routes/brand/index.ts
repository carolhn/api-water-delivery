import { Router } from 'express';

import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from '../../controllers/brand';
import { isAuthenticated } from '../../middlewares/auth';

const brandRoutes = Router();

brandRoutes.post('/create', isAuthenticated, createBrand as any);
brandRoutes.get('/list', getAllBrands as any);
brandRoutes.get('/:id', getBrandById as any);
brandRoutes.put('/:id', isAuthenticated, updateBrand as any);
brandRoutes.delete('/:id', isAuthenticated, deleteBrand as any);

export default brandRoutes;
