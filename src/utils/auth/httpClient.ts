import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { logError } from '@/utils/sentry';

export interface HttpClientConfig {
  baseURL?: string;
  token?: string;
}

export class HttpClient {
  httpClient: AxiosInstance;

  constructor({ token, baseURL }: HttpClientConfig) {
    this.httpClient = axios.create({
      baseURL: baseURL,
      headers: {
        authorization: token ? `Bearer ${token}` : undefined,
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
        logError(error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.get(url, config).then((response) => response.data);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.post(url, data, config).then((response) => response.data);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.put(url, data, config).then((response) => response.data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.delete(url, config).then((response) => response.data);
  }
}
