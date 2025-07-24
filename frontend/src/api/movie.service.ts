import { apiClient } from './api.service';

export interface Movie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export const MovieService = {
  async searchMovies(payload: { title: string; year?: string }) {
    return apiClient.post('/movies/search', payload);
  },

  async saveMovie(movie: Movie) {
    return apiClient.post('/api/movies', movie);
  },

  async listSavedMovies(): Promise<Movie[]> {
    return apiClient.get('/api/movies/list');
  },

  async deleteSavedMovie(id: string) {
    return apiClient.delete(`/api/movies/${id}`);
  },
};
