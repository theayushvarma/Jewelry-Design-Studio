import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const baseURL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "https://thediamondport.com/api";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Store for cancel tokens
const cancelTokens: { [key: string]: axios.CancelTokenSource } = {};

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Cancel previous request with the same URL
    if (config.url && cancelTokens[config.url]) {
      cancelTokens[config.url].cancel("Operation cancelled by new request");
    }

    // Create new cancel token
    if (config.url) {
      cancelTokens[config.url] = axios.CancelToken.source();
      config.cancelToken = cancelTokens[config.url].token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Clean up cancel token after successful response
    if (response.config.url) {
      delete cancelTokens[response.config.url];
    }
    return response;
  },
  (error: AxiosError) => {
    // Clean up cancel token on error
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
