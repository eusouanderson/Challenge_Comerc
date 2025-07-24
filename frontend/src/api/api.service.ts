export class HTTPClient {
  private static instance: HTTPClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  public static getInstance(): HTTPClient {
    if (!HTTPClient.instance) {
      HTTPClient.instance = new HTTPClient();
    }
    return HTTPClient.instance;
  }

  public async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  public async post<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  public async patch<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  public async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}

export const apiClient = HTTPClient.getInstance();