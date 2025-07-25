import {
  createClient,
  deleteClient,
  listClients,
  loginClient,
  updateClient,
} from '@/controllers/client.controller';
import { Hono } from 'hono';

export const clientRoutes = new Hono();

clientRoutes.post('/', createClient);
clientRoutes.get('/', listClients);
clientRoutes.patch('/:id', updateClient);
clientRoutes.delete('/:id', deleteClient);
clientRoutes.post('/auth', loginClient);
