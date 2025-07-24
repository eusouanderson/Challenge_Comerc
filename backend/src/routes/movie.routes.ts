import { Hono } from 'hono';
import { getMovieById, searchMovies } from '../controllers/movie.controller';

export const movieRoutes = new Hono();

movieRoutes.post('/search', searchMovies);
movieRoutes.get('/:id', getMovieById);
