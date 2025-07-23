import { request } from 'undici';
import { IHttpClient } from './httpClient.interface';

export class UndiciHttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const { body } = await request(url);
    const data = await body.json();
    return data as T;
  }
}
