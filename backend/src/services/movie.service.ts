import { IHttpClient } from './httpClient.interface';
import { redis } from '../db/redis.client';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any;
}

export interface MovieSearchResponse {
  Response: "True" | "False";
  Search?: MovieSearchResult[];
  totalResults?: string;
  Error?: string;
}

export class MovieService {
  private httpClient: IHttpClient;
  private apiKey: string;

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

  async searchMoviesByTitle(title: string, year?: string, page: number = 1): Promise<MovieSearchResponse> {
    const cacheKey = `movies:search:title:${title}:year:${year || ''}:page:${page}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    let url = `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${this.apiKey}&page=${page}`;
    if (year) url += `&y=${encodeURIComponent(year)}`;

    const result = await this.httpClient.get<MovieSearchResponse>(url);

    if (!result || result.Response === 'False') {
      throw new Error(result.Error || `No movies found for title ${title}`);
    }

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600); 
    return result;
  }
}
