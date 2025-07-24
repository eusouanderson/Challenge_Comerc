import { Context } from 'hono';
import { ClientService } from '@/services/client.service';
import { ConflictError } from '@/error/conflict.error';

const clientService = new ClientService();

export const createClient = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = await clientService.create(body);
    return c.json(result, 201);
  } catch (error) {
    if (error instanceof ConflictError) {
      return c.json({ message: error.message }, error.statusCode);
    }
    if (error instanceof Error && error.message.startsWith('Validation failed')) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const listClients = async (c: Context) => {
  try {
    const clients = await clientService.findAll();
    return c.json(clients);
  } catch {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const updateClient = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    await clientService.update(id, body);
    const updatedClient = await clientService.findById(id);
    if (!updatedClient) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.json(updatedClient);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation failed')) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};

export const deleteClient = async (c: Context) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.json({ message: 'Client ID is required' }, 400);
    }

    const client = await clientService.findById(id);
    if (!client) {
      return c.json({ message: 'Client not found' }, 404);
    }

    await clientService.deactivate(id);
    return c.json({ message: 'Client deleted successfully' });
  } catch {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};
