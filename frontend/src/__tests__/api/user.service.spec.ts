// @ts-nocheck

import { apiClient } from '@/api/api.service';
import { UserService } from '@/api/user.service';
import type { User } from '@/interfaces/user';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/api/api.service', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('UserService', () => {
  const mockedApiClient = apiClient as {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('listUsers chama apiClient.get e retorna usuários', async () => {
    const usersMock: User[] = [
      {
        id: '1',
        name: 'Anderson',
        email: 'anderson@test.com',
        document: '123456789' /* outros campos */,
      },
      { id: '2', name: 'Maria', email: 'maria@test.com', document: '987654321' },
    ];
    mockedApiClient.get.mockResolvedValueOnce(usersMock);

    const result = await UserService.listUsers();

    expect(mockedApiClient.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual(usersMock);
  });

  it('createUser rejeita se campos obrigatórios não forem preenchidos', async () => {
    await expect(UserService.createUser({})).rejects.toThrow(
      'Preencha todos os campos obrigatórios.'
    );
    await expect(UserService.createUser({ name: 'A' })).rejects.toThrow(
      'Preencha todos os campos obrigatórios.'
    );
    await expect(UserService.createUser({ name: 'A', email: 'a@test.com' })).rejects.toThrow(
      'Preencha todos os campos obrigatórios.'
    );
    await expect(
      UserService.createUser({ name: 'A', email: 'a@test.com', document: '123' })
    ).rejects.toThrow('Preencha todos os campos obrigatórios.');
  });

  it('createUser chama apiClient.post com dados válidos', async () => {
    const newUser: Partial<User> & { password: string } = {
      name: 'Anderson',
      email: 'anderson@test.com',
      document: '123456789',
      password: '123456',
    };
    const createdUser: User = { ...newUser, id: '1' } as User;

    mockedApiClient.post.mockResolvedValueOnce(createdUser);

    const result = await UserService.createUser(newUser);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/users', newUser);
    expect(result).toEqual(createdUser);
  });

  it('updateUser chama apiClient.patch com id e dados', async () => {
    const id = '1';
    const updateData: Partial<User> = { name: 'Anderson Silva' };
    const updatedUser: User = {
      id,
      name: 'Anderson Silva',
      email: 'anderson@test.com',
      document: '123456789',
    };

    mockedApiClient.patch.mockResolvedValueOnce(updatedUser);

    const result = await UserService.updateUser(id, updateData);

    expect(mockedApiClient.patch).toHaveBeenCalledWith(`/users/${id}`, updateData);
    expect(result).toEqual(updatedUser);
  });

  it('deleteUser chama apiClient.delete com id', async () => {
    const id = '1';

    mockedApiClient.delete.mockResolvedValueOnce(undefined);

    const result = await UserService.deleteUser(id);

    expect(mockedApiClient.delete).toHaveBeenCalledWith(`/users/${id}`);
    expect(result).toBeUndefined();
  });
});
