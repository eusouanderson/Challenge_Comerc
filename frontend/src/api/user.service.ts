import { apiClient } from './api.service';

export interface User {
  id: string;
  name: string;
  email: string;
  document: string;
}

export const UserService = {
  async listUsers(): Promise<User[]> {
    return apiClient.get('/users');
  },

  async createUser(data: Omit<User, 'id'> & { password: string }): Promise<User> {
    return apiClient.post('/users', data);
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return apiClient.patch(`/users/${id}`, data);
  },

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  },
};
