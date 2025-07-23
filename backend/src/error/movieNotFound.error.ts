export class MovieNotFoundError extends Error {
  constructor(message = 'Movie not found.') {
    super(message);
    this.name = 'MovieNotFoundError';
  }
}
