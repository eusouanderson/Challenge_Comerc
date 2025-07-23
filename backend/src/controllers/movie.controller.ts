import { Context } from 'hono';
import { MovieService } from '../services/movie.service';
import { UndiciHttpClient } from '../services/undiciHttpClient';

const httpClient = new UndiciHttpClient();
const apiKey = process.env.OMDB_API_KEY!;
const movieService = new MovieService(httpClient, apiKey);

export const getMovieById = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const movie = await movieService.getMovieById(id);
    return c.json(movie, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 404);
  }
};

export const searchMovies = async (c: Context) => {
  try {
    const { title } = await c.req.json();
    if (!title) return c.json({ message: 'Title is required' }, 400);

    const movies = await movieService.searchMoviesByTitle(title);
    return c.json(movies, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 404);
  }
};
