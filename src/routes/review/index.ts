import { Router } from 'express';

import { createReview } from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const reviewRoutes = Router();

reviewRoutes.post('/:productID', isAuthenticated, createReview as any);

export default reviewRoutes;
