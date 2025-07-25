import { Hono } from 'hono';
import {
  deleteMovie,
  getMovieById,
  getMoviesByClient,
  listSavedMovies,
  removeClientFromMovieController,
  saveMovie,
  searchMovies,
} from '../controllers/movie.controller';

export const movieRoutes = new Hono();

movieRoutes.post('/search', searchMovies);
movieRoutes.get('/list', listSavedMovies);
movieRoutes.post('/save', saveMovie);
movieRoutes.get('/client/:clientId', getMoviesByClient);
movieRoutes.delete('/:clientId/client', removeClientFromMovieController);
movieRoutes.delete('/:clientId', deleteMovie);
movieRoutes.get('/:clientId', getMovieById);
