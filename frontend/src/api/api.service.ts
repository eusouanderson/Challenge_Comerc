class HTTPClient {
  private static instance: HTTPClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    console.log('API base URL:', this.baseUrl);
  }

  public static getInstance(): HTTPClient {
    if (!HTTPClient.instance) {
      HTTPClient.instance = new HTTPClient();
    }
    return HTTPClient.instance;
  }

  public async get<T>(endpoint: string): Promise<T | null> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  
}

// Uso:

const apiClient = HTTPClient.getInstance();

(async () => {
  const dados = await apiClient.get<any>('/meu-endpoint');
  console.log('Dados recebidos:', dados);
})();
