import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export async function request<T>(
  config: AxiosRequestConfig & {
    default?: T;
    errorHandler?: (error: unknown) => void;
  },
) {
  return axios
    .request<T>({
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: unknown) => {
      handleError(error, config?.errorHandler);
    });
}

export async function get<T>(
  url: string,
  options?: {
    config?: AxiosRequestConfig;
    default?: T;
    errorHandler?: (error: unknown) => void;
  },
) {
  return axios
    .get<T>(url, options?.config)
    .then((response) => {
      return response.data;
    })
    .catch((error: unknown) => {
      handleError(error, options?.errorHandler);
    });
}

function handleError(error: unknown, errorHandler?: (error: unknown) => void) {
  if (errorHandler) {
    errorHandler(error);
    return;
  }

  const error_ = error instanceof AxiosError ? error : new Error(String(error));
  throw error_;
}
