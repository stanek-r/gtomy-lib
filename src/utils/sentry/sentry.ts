import axios, { AxiosError } from 'axios';
import { captureException, captureMessage } from '@sentry/react';
import { isSentryEnabled } from './initSentry';

/**
 * Log error to Sentry
 * @param error - Error to log
 */
export function logError(error: string | Error | AxiosError): void {
  if (!isSentryEnabled()) {
    return;
  }
  if (typeof error === 'string') {
    handleErrorMessage(error);
    return;
  }
  if (axios.isAxiosError(error)) {
    handleHttpRequestError(error);
    return;
  }
  handleError(error);
}

/**
 * Log error to Sentry
 *
 * @param msg - Error message to log
 * @param data - Additional data to log
 */
function handleErrorMessage(msg: string, data?: any): string {
  return captureMessage(msg, {
    extra: {
      __serialized__: data,
    },
    level: 'error',
  });
}

/**
 * Log error to Sentry
 * @param error - Error to log
 */
function handleHttpRequestError(error: AxiosError): string {
  const captureData = (error.response?.status || 0) >= 400;
  return captureException(error, {
    extra: {
      status: error.status || error.response?.status,
      message: error.message,
      data: captureData && error.response?.data,
      __serialized__: error,
    },
    level: 'error',
  });
}

/**
 * Log error to Sentry
 * @param error - Error to log
 */
function handleError(error: Error): string {
  return captureException(error, {
    level: 'error',
  });
}
