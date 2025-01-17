import { Router } from 'express';
import { createCategory } from '../../controllers/category';

const categoryRoutes = Router();

categoryRoutes.post('/', createCategory as any);

export default categoryRoutes;
