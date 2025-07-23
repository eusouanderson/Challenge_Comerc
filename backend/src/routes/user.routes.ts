import { Hono } from 'hono';
import { createUser, listUsers, updateUser, deleteUser } from '../controllers/user.controller';

export const userRoutes = new Hono();

userRoutes.post('/', createUser);
userRoutes.get('/', listUsers);
userRoutes.patch('/:id', updateUser); 
userRoutes.delete('/:id', deleteUser);
