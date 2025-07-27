// @ts-nocheck

import { apiClient } from '@/api/api.service';
import type { Client } from '@/interfaces/client.ts';

export const ClientService = {
  async listClients(): Promise<Client[]> {
    return apiClient.get('/client');
  },

  async createClient(
    data: Omit<Client, 'id' | 'status' | 'createdAt' | 'updatedAt'> & { password: string }
  ): Promise<Client> {
    return apiClient.post('/client', data);
  },

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    return apiClient.patch(`/client/${id}`, data);
  },

  async deleteClient(id: string): Promise<void> {
    return apiClient.delete(`/client/${id}`);
  },
};
