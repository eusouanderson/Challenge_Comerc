// @ts-nocheck

import { HTTPClient } from '@/api/api.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HTTPClient', () => {
  let httpClient: HTTPClient;

  beforeEach(() => {
    httpClient = HTTPClient.getInstance();

    // Mock global fetch
    global.fetch = vi.fn();
  });

  it('deve fazer GET com sucesso', async () => {
    const mockResponse = { data: 'ok' };
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const res = await httpClient.get('/test-get');
    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/test-get'));
  });

  it('deve lançar erro no GET com resposta não ok', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Erro no GET',
    });

    await expect(httpClient.get('/error-get')).rejects.toThrow('Erro no GET');
  });

  it('deve fazer POST com sucesso', async () => {
    const mockResponse = { success: true };
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const res = await httpClient.post('/test-post', { foo: 'bar' });
    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-post'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ foo: 'bar' }),
      })
    );
  });

  // Mesma lógica para PATCH e DELETE:
  it('deve fazer PATCH com sucesso', async () => {
    const mockResponse = { updated: true };
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const res = await httpClient.patch('/test-patch', { id: 1 });
    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-patch'),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ id: 1 }),
      })
    );
  });

  it('deve fazer DELETE com sucesso', async () => {
    const mockResponse = { deleted: true };
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const res = await httpClient.delete('/test-delete');
    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-delete'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
