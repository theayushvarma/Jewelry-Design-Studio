import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const baseURL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const cancelTokens: { [key: string]: axios.CancelTokenSource } = {};

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url && cancelTokens[config.url]) {
      cancelTokens[config.url].cancel("Operation cancelled by new request");
    }

    if (config.url) {
      cancelTokens[config.url] = axios.CancelToken.source();
      config.cancelToken = cancelTokens[config.url].token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.config.url) {
      delete cancelTokens[response.config.url];
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.config?.url) {
      delete cancelTokens[error.config.url];
    }

    if (axios.isCancel(error)) {
      return Promise.reject({
        message: "Request cancelled",
        isCancelled: true,
      });
    }

    return Promise.reject({
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status,
    });
  }
);

export default api;
