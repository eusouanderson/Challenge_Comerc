import { redis } from '../db/redis.client';
import { IHttpClient } from './httpClient.interface';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any;
  clients?: string[];
}

export interface MovieSearchResponse {
  Response: 'True' | 'False';
  Search?: MovieSearchResult[];
  totalResults?: string;
  Error?: string;
}

export class MovieService {
  private httpClient: IHttpClient;
  private apiKey: string;
  private readonly savedMoviesKey = 'movies:saved:list';

  constructor(httpClient: IHttpClient, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async getMovieById(imdbID: string): Promise<MovieSearchResult> {
    const cacheKey = `movie:id:${imdbID}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${this.apiKey}`;
    const movie = await this.httpClient.get<MovieSearchResult & { Response: string }>(url);

    if (!movie || movie.Response === 'False') {
      throw new Error(`Movie with id ${imdbID} not found`);
    }

    await redis.set(cacheKey, JSON.stringify(movie), 'EX', 3600); // cache 1 hora
    return movie;
  }

  async searchMoviesByTitle(
    title: string,
    year?: string,
    page: number = 1
  ): Promise<MovieSearchResponse> {
    const cacheKey = `movies:search:title:${title}:year:${year || ''}:page:${page}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    let url = `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${
      this.apiKey
    }&page=${page}`;
    if (year) url += `&y=${encodeURIComponent(year)}`;

    const result = await this.httpClient.get<MovieSearchResponse>(url);

    if (!result || result.Response === 'False') {
      throw new Error(result.Error || `No movies found for title ${title}`);
    }

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);
    return result;
  }
  /**
   * Retorna todos os filmes alugados por um cliente específico
   */
  async listMoviesByClientId(clientId: string): Promise<MovieSearchResult[]> {
    const movies = await this.listSavedMovies();
    return movies.filter((movie) => movie.clients?.includes(clientId));
  }

  /**
   * Lista os filmes salvos em cache Redis
   */
  async listSavedMovies(): Promise<MovieSearchResult[]> {
    const data = await redis.get(this.savedMoviesKey);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Salva um novo filme na lista em cache Redis
   */
  async saveMovie(movie: MovieSearchResult & { clientId: string }): Promise<void> {
    const savedMovies = await this.listSavedMovies();

    const index = savedMovies.findIndex((m) => m.imdbID === movie.imdbID);

    if (index !== -1) {
      const existing = savedMovies[index];
      const clients = new Set(existing.clients || []);
      clients.add(movie.clientId);
      existing.clients = [...clients];
      savedMovies[index] = existing;
    } else {
      movie.clients = [movie.clientId];
      savedMovies.push(movie);
    }

    await redis.set(this.savedMoviesKey, JSON.stringify(savedMovies));
  }

  async deleteMovie(imdbID: string): Promise<void> {
    const savedMovies = await this.listSavedMovies();
    const filtered = savedMovies.filter((movie) => movie.imdbID !== imdbID);
    await redis.set(this.savedMoviesKey, JSON.stringify(filtered));
  }
  async removeClientFromMovie(imdbID: string, clientId: string): Promise<void> {
    const savedMovies = await this.listSavedMovies();

    const index = savedMovies.findIndex((movie) => movie.imdbID === imdbID);
    if (index === -1) return;

    const movie = savedMovies[index];
    movie.clients = (movie.clients || []).filter((c) => c !== clientId);

    if (movie.clients.length === 0) {
      savedMovies.splice(index, 1);
    } else {
      savedMovies[index] = movie;
    }

    savedMovies[index] = movie;

    await redis.set(this.savedMoviesKey, JSON.stringify(savedMovies));
  }
}
