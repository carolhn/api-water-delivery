import { Router } from 'express';
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateShippingAddress,
} from '../../controllers/index';
import { isAuthenticated } from '../../middlewares/auth';

const userRoutes = Router();

userRoutes.post('/register', registerUser as any);
userRoutes.post('/login', loginUser as any);
userRoutes.get('/profile', isAuthenticated, getUserProfile as any);
userRoutes.put(
  '/update/shipping',
  isAuthenticated,
  updateShippingAddress as any,
);

export default userRoutes;
