import { Router } from 'express';
import { createCategory } from '../../controllers/category';
import { isAuthenticated } from '../../middlewares/auth';

const categoryRoutes = Router();

categoryRoutes.post('/', isAuthenticated, createCategory as any);

export default categoryRoutes;
