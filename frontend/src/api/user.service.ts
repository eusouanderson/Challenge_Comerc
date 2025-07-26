import { apiClient } from './api.service';

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  document: string;
}

export const UserService = {
  async listUsers(): Promise<User[]> {
    return apiClient.get('/users');
  },

  async createUser(data: Partial<User> & { password?: string }): Promise<User> {
    if (!data.name || !data.email || !data.document || !data.password) {
      return Promise.reject(new Error('Preencha todos os campos obrigatórios.'));
    }
    return apiClient.post('/users', data);
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return apiClient.patch(`/users/${id}`, data);
  },

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  },
};
