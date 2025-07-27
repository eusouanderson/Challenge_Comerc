// @ts-nocheck

import { apiClient } from '@/api/api.service';
import { MovieService } from '@/api/movie.service';
import type { Movie } from '@/interfaces/movie';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/api/api.service', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('MovieService', () => {
  const mockedApiClient = apiClient as {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('searchMovies chama apiClient.post com o título', async () => {
    const payload = { title: 'Inception' };
    const responseMock = [{ imdbID: 'tt1375666', title: 'Inception', year: 2010 }];

    mockedApiClient.post.mockResolvedValueOnce(responseMock);

    const result = await MovieService.searchMovies(payload);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/movies/search', payload);
    expect(result).toEqual(responseMock);
  });

  it('saveMovie chama apiClient.post com o filme', async () => {
    const movie: Movie = { imdbID: 'tt1375666', title: 'Inception', year: 2010 };

    mockedApiClient.post.mockResolvedValueOnce(movie);

    const result = await MovieService.saveMovie(movie);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/movies/save', movie);
    expect(result).toEqual(movie);
  });

  it('listSavedMovies chama apiClient.get com clientId', async () => {
    const clientId = '123';
    const moviesMock: Movie[] = [
      { imdbID: 'tt1375666', title: 'Inception', year: 2010 },
      { imdbID: 'tt0816692', title: 'Interstellar', year: 2014 },
    ];

    mockedApiClient.get.mockResolvedValueOnce(moviesMock);

    const result = await MovieService.listSavedMovies(clientId);

    expect(mockedApiClient.get).toHaveBeenCalledWith(`/movies/client/${clientId}`);
    expect(result).toEqual(moviesMock);
  });

  it('deleteMovie chama apiClient.delete com imdbID', async () => {
    const imdbID = 'tt1375666';

    mockedApiClient.delete.mockResolvedValueOnce(undefined);

    const result = await MovieService.deleteMovie(imdbID);

    expect(mockedApiClient.delete).toHaveBeenCalledWith(`/movies/${imdbID}`);
    expect(result).toBeUndefined();
  });
});
