// @ts-nocheck

import { apiClient } from '@/api/api.service';
import { ClientService } from '@/api/client.service';
import type { Client } from '@/interfaces/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/api/api.service', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ClientService', () => {
  const mockedApiClient = apiClient as {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('listClients chama apiClient.get e retorna a lista', async () => {
    const clientsMock: Client[] = [
      {
        id: '1',
        name: 'Anderson',
        email: 'anderson@example.com',
        status: 'active',
        createdAt: '',
        updatedAt: '',
      },
    ];

    mockedApiClient.get.mockResolvedValueOnce(clientsMock);

    const result = await ClientService.listClients();

    expect(mockedApiClient.get).toHaveBeenCalledWith('/client');
    expect(result).toEqual(clientsMock);
  });

  it('createClient chama apiClient.post com os dados e retorna o cliente criado', async () => {
    const inputData = { name: 'Anderson', email: 'anderson@example.com', password: '123456' };
    const createdClient: Client = {
      ...inputData,
      id: '1',
      status: 'active',
      createdAt: '',
      updatedAt: '',
    };

    mockedApiClient.post.mockResolvedValueOnce(createdClient);

    const result = await ClientService.createClient(inputData);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/client', inputData);
    expect(result).toEqual(createdClient);
  });

  it('updateClient chama apiClient.patch com id e dados e retorna cliente atualizado', async () => {
    const id = '1';
    const updateData: Partial<Client> = { name: 'Novo Nome' };
    const updatedClient: Client = {
      id,
      name: 'Novo Nome',
      email: 'anderson@example.com',
      status: 'active',
      createdAt: '',
      updatedAt: '',
    };

    mockedApiClient.patch.mockResolvedValueOnce(updatedClient);

    const result = await ClientService.updateClient(id, updateData);

    expect(mockedApiClient.patch).toHaveBeenCalledWith(`/client/${id}`, updateData);
    expect(result).toEqual(updatedClient);
  });

  it('deleteClient chama apiClient.delete com id', async () => {
    const id = '1';
    mockedApiClient.delete.mockResolvedValueOnce(undefined);

    const result = await ClientService.deleteClient(id);

    expect(mockedApiClient.delete).toHaveBeenCalledWith(`/client/${id}`);
    expect(result).toBeUndefined();
  });
});
