import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpClient {
  httpClient: AxiosInstance;

  constructor(token: string, baseURL?: string) {
    this.httpClient = axios.create({
      baseURL: baseURL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    this.httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.replace('/login');
          return;
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.get(url, config).then((response) => response.data);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.post(url, data, config).then((response) => response.data);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.put(url, data, config).then((response) => response.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.delete(url, config).then((response) => response.data);
  }
}
