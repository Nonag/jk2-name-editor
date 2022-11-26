import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { REACT_APP_API_URL } from 'src/constants';
import { toSnakeCase } from 'src/utils';

export const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000 * 15,
});

// Add a request interceptor and transform POST request URL-Params to snake_case.
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = toSnakeCase(config.params);

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
