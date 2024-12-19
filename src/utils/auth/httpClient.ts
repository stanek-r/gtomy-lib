import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isTokenValid } from '@/utils/auth/userUtils';
import { config } from '@/config';
import { getRefetch, setRefetch } from '@/utils/hooks/storage/useRefetchStore';
import i18n from '@/utils/i18n';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/hooks/storage/useAuthStore';
import { logError } from '@/utils/sentry/sentry';
import { showToast } from '@/components/organisms/toast/ToastProvider';

export interface HttpClientConfig {
  baseURL?: string;
}

export interface JwtResponse {
  access_token: string;
  refresh_token: string;
}

export class HttpClient {
  private httpClient: AxiosInstance;

  constructor({ baseURL }: HttpClientConfig) {
    this.httpClient = axios.create({
      baseURL: baseURL,
    });

    this.httpClient.interceptors.request.use((request) => {
      const token = getAccessToken();
      if (token != null) {
        if (isTokenValid(token)) {
          request.headers.set('authorization', `Bearer ${token}`);
          return request;
        }
        if (getRefetch()) {
          return request;
        }
        return this.refresh().then((renewedToken) => {
          if (renewedToken) {
            request.headers.set('authorization', `Bearer ${renewedToken}`);
          } else {
            setRefreshToken(undefined);
            setAccessToken(undefined);
          }
          return request;
        });
      }
      return request;
    });
    this.httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        logError(error);
        return Promise.reject(error);
      }
    );
  }

  async refresh(): Promise<string | null> {
    const refreshToken = getRefreshToken();
    if (!isTokenValid(refreshToken)) {
      return null;
    }
    setRefetch(true);
    return axios
      .post(`${config.authUrl}/refresh-token`, { refreshToken: refreshToken })
      .then((response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
          return null;
        }
        setAccessToken(response.data.access_token);
        if (response.data.refresh_token) {
          setRefreshToken(response.data.refresh_token);
        }
        return response.data.access_token;
      })
      .catch(() => {
        return null;
      })
      .finally(() => {
        setRefetch(false);
      });
  }

  async get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient.get(url, config).then((response) => response.data);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient
      .post(url, data, config)
      .then((response) => response.data)
      .catch(this.showErrorToast);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient
      .put(url, data, config)
      .then((response) => response.data)
      .catch(this.showErrorToast);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.httpClient
      .delete(url, config)
      .then((response) => response.data)
      .catch(this.showErrorToast);
  }

  private showErrorToast(error: any): void {
    showToast({
      message: i18n.t('state.error2'),
      icon: XMarkIcon,
      iconColor: 'error',
    });
    throw error;
  }
}
