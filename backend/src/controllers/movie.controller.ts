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
    const { title, year, page } = await c.req.json();
    if (!title) return c.json({ message: 'Title is required' }, 400);

    const movies = await movieService.searchMoviesByTitle(title, year, page);
    return c.json(movies, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 404);
  }
};

export const listSavedMovies = async (c: Context) => {
  try {
    const movies = await movieService.listSavedMovies();
    return c.json(movies, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const saveMovie = async (c: Context) => {
  try {
    const movie = await c.req.json();
    const { imdbID, clientId } = movie;

    if (!imdbID || !clientId || typeof clientId !== 'string') {
      return c.json({ message: 'Invalid movie or clientId' }, 400);
    }

    console.log('Saving movie with clientId:', clientId); // Debug

    await movieService.saveMovie(movie);
    return c.json({ message: 'Movie saved successfully' }, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const getMoviesByClient = async (c: Context) => {
  try {
    const clientId = c.req.param('clientId');
    if (!clientId) {
      return c.json({ message: 'Client ID is required' }, 400);
    }

    const movies = await movieService.listMoviesByClientId(clientId);
    return c.json(movies, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const deleteMovie = async (c: Context) => {
  try {
    const imdbID = c.req.param('clientId');
    if (!imdbID) return c.json({ message: 'Movie ID is required' }, 400);

    await movieService.deleteMovie(imdbID);
    return c.json({ message: `Movie ${imdbID} deleted successfully` }, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const removeClientFromMovieController = async (c: Context) => {
  try {
    const imdbID = c.req.param('id');
    const { clientId } = await c.req.json();

    if (!imdbID || !clientId) {
      return c.json({ message: 'Movie ID and clientId are required' }, 400);
    }

    await movieService.removeClientFromMovie(imdbID, clientId);

    return c.json({ message: `Client ${clientId} removed from movie ${imdbID}` }, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};
