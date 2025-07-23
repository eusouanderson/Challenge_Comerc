import { IHttpClient } from './httpClient.interface';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any;
}

export class MovieService {
  private httpClient: IHttpClient;
  private apiKey: string;

  constructor(httpClient: IHttpClient, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async getMovieById(imdbID: string): Promise<MovieSearchResult> {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${this.apiKey}`;
    const movie = await this.httpClient.get<MovieSearchResult>(url);

    if (!movie || movie.Response === 'False') {
      throw new Error(`Movie with id ${imdbID} not found`);
    }
    return movie;
  }

  async searchMoviesByTitle(title: string): Promise<{ Search: MovieSearchResult[] }> {
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${this.apiKey}`;
    const result = await this.httpClient.get<{ Search: MovieSearchResult[] }>(url);

    if (!result || result.Response === 'False') {
      throw new Error(`No movies found for title ${title}`);
    }
    return result;
  }
}
