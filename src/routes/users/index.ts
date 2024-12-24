import { Router } from 'express';
import { loginUser, registerUser } from '../../controllers/users';

const userRoutes = Router();

userRoutes.post('/register', registerUser as any);
userRoutes.post('/login', loginUser as any);

export default userRoutes;
