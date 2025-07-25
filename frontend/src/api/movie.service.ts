import { apiClient } from './api.service';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  clientId: string;
}

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
