import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { logError } from '@/utils/sentry';
import { config } from '@/config';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, User } from '@/utils/hooks/storage';
import { RefreshToken } from '@/models/refreshToken.dto';
import { jwtDecode } from 'jwt-decode';
import { showToast } from '@/components/organisms/toast/ToastProvider';
import { XMarkIcon } from '@heroicons/react/24/outline';
import i18n from '@/utils/i18n';

const isTokenValid = (token?: string): boolean => {
  if (!token) {
    return false;
  }
  try {
    const decodedToken: RefreshToken | User = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    return expirationDate >= currentDate;
  } catch (e: any) {
    logError(e);
    return false;
  }
};

export interface HttpClientConfig {
  baseURL?: string;
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
        return this.refresh().then((renewedToken) => {
          if (renewedToken) {
            request.headers.set('authorization', `Bearer ${renewedToken}`);
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
        if (error.response && error.response.status === 401) {
          return this.refresh().then((result) => {
            if (result && error.config) {
              return this.httpClient.request(error.config);
            }
            window.location.replace('/login');
            return Promise.reject(error);
          });
        }
        showToast({
          message: i18n.t('state.error'),
          icon: XMarkIcon,
          iconColor: 'error',
        });
        logError(error);
        return Promise.reject(error);
      }
    );
  }

  async refresh(): Promise<string | null> {
    const refreshToken = getRefreshToken();
    if (!isTokenValid(refreshToken)) {
      setRefreshToken(undefined);
      return null;
    }
    return axios
      .post(`${config.authUrl}/refresh-token`, { refreshToken: refreshToken })
      .then((response) => {
        if (!response.data?.access_token) {
          console.error('No token');
          return null;
        }
        setAccessToken(response.data.access_token);
        if (response.data.refresh_token) {
          setRefreshToken(response.data.refresh_token);
        }
        return response.data.access_token;
      })
      .catch(() => {
        setRefreshToken(undefined);
        return null;
      });
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
