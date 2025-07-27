// @ts-nocheck

import { apiClient } from '@/api/api.service';
import type { Movie } from '@/interfaces/movie';

export const MovieService = {
  searchMovies(payload: { title: string }) {
    return apiClient.post('/movies/search', payload);
  },
  saveMovie(movie: Movie) {
    return apiClient.post('/movies/save', movie);
  },
  listSavedMovies(clientId: string) {
    return apiClient.get(`/movies/client/${clientId}`);
  },
  deleteMovie(imdbID: string) {
    return apiClient.delete(`/movies/${imdbID}`);
  },
};
