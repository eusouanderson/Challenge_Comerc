import { apiClient } from './api.service';

export interface Client {
  id: string;
  name: string;
  lastname: string;
  cpf: string;
  email: string;
  cell: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  uf: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

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
