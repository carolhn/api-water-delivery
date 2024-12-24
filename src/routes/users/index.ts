import { Router } from 'express';
import {
  getUserProfile,
  loginUser,
  registerUser,
} from '../../controllers/users';
import { isAuthenticated } from '../../middlewares/auth';

const userRoutes = Router();

userRoutes.post('/register', registerUser as any);
userRoutes.post('/login', loginUser as any);
userRoutes.get('/profile', isAuthenticated, getUserProfile as any);

export default userRoutes;
