import { Router } from 'express';
import { registerUser } from '../../controllers/users';

const userRoutes = Router();

userRoutes.post('/register', registerUser as any);

export default userRoutes;
