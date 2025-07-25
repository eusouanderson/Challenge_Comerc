import { ConflictError } from '@/error/conflict.error';
import { UserService } from '@/services/user.service';
import { Context } from 'hono';

const userService = new UserService();

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = await userService.create(body);
    return c.json(result, 201);
  } catch (error) {
    if (error instanceof ConflictError) {
      return c.json({ message: error.message });
    }
    if (error instanceof Error && error.message.startsWith('Validation failed')) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const listUsers = async (c: Context) => {
  try {
    const users = await userService.findAll();
    return c.json(users);
  } catch {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    await userService.update(id, body);
    const updatedUser = await userService.findById(id);
    if (!updatedUser) {
      return c.json({ message: 'User not found' }, 404);
    }
    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation failed')) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.json({ message: 'User ID is required' }, 400);
    }

    const user = await userService.findById(id);
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    await userService.deactivate(id);
    return c.json({ message: 'User deleted successfully' });
  } catch {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};
