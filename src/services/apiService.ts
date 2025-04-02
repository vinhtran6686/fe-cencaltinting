import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { refreshToken } from './authService'
import { sanitizeRequestData, sanitizeResponseData } from '../utils/security'
import { API_TIMEOUT, MAX_RETRY_ATTEMPTS } from '../constants/api'
import { notificationService } from './notificationService'

// Type definitions
export interface ApiResponse<T = any> {
  data: T
  message: string
  statusCode: number
  timestamp: string
}

// Extended request config to allow for custom properties
interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
  metadata?: {
    startTime: number;
  };
  showSuccessNotification?: boolean;
}

// Thêm định nghĩa custom request config
export interface CustomRequestConfig extends AxiosRequestConfig {
  showSuccessNotification?: boolean;
}

// Create API instance with extended configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // For CSRF protection with cookies
});

// Request retry mechanism
const retryQueue = new Map();
const retryRequest = (config: ExtendedRequestConfig, retryCount = 0) => {
  const requestId = config.url + JSON.stringify(config.params);
  retryQueue.set(requestId, { config, retryCount });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      api.request(config)
        .then(response => {
          retryQueue.delete(requestId);
          resolve(response);
        })
        .catch(error => {
          retryQueue.delete(requestId);
          reject(error);
        });
    }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
  });
};

// Cancel token management
const pendingRequests = new Map();
const createCancelToken = (config: ExtendedRequestConfig): ExtendedRequestConfig => {
  const requestId = config.url + JSON.stringify(config.params);

  // Cancel previous pending request with same ID
  if (pendingRequests.has(requestId)) {
    const controller = pendingRequests.get(requestId);
    controller.abort();
    pendingRequests.delete(requestId);
  }

  // Create new AbortController
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(requestId, controller);

  return config;
};

// Request interceptor
api.interceptors.request.use(
  async (config: ExtendedRequestConfig) => {
    // Apply cancel token for ALL requests to prevent race conditions
    config = createCancelToken(config);

    // Authentication token handling
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // CSRF protection if needed
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Sanitize request data for security
    if (config.data) {
      config.data = sanitizeRequestData(config.data);
    }

    // Add request timestamp for debugging/logging
    config.metadata = { startTime: new Date().getTime() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to safely show success notification from interceptor
const safeShowSuccessNotification = (title: string, message: string) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    try {
      notificationService.showSuccess(title, message);
    } catch (e) {
      console.warn('Failed to show notification:', e);
    }
  }
};

// Function to safely handle API error notification from interceptor
const safeHandleApiError = (error: any) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    try {
      notificationService.showApiError(error);
    } catch (e) {
      console.warn('Failed to show error notification:', e);
      // Fallback to console for errors
      console.error(`API Error: ${error.message || error.data?.message || 'Unknown error'}`);
    }
  }
};

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as ExtendedRequestConfig;
    // Calculate request duration for performance monitoring
    const requestTime = new Date().getTime() - (config.metadata?.startTime || 0);
    console.debug(`Request to ${config.url} took ${requestTime}ms`);

    // Clean up cancel token if exists
    const requestId = config.url + JSON.stringify(config.params);
    if (pendingRequests.has(requestId)) {
      pendingRequests.delete(requestId);
    }

    // Sanitize response data for security
    if (response.data) {
      response.data = sanitizeResponseData(response.data);
    }

    // Only show success notifications if explicitly requested
    if (response.data && response.data?.message && config.showSuccessNotification) {
      safeShowSuccessNotification('Success', response.data.message);
    }

    return response;
  },
  async (error: AxiosError) => {

    const originalRequest = error.config as ExtendedRequestConfig | undefined;

    // Clean up cancel token if exists for error cases too
    if (originalRequest) {
      const requestId = originalRequest.url + JSON.stringify(originalRequest.params);
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
      }
    }

    // Handle token expiration (401)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try to refresh the token
        const newToken = await refreshToken();
        if (newToken && originalRequest) {
          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle retry logic for certain errors (network, 5xx)
    if ((error.code === 'ECONNABORTED' || (error.response?.status !== undefined && error.response?.status >= 500)) &&
      originalRequest && !originalRequest._retry) {
      const retryCount = originalRequest._retryCount || 0;
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        originalRequest._retryCount = retryCount + 1;
        originalRequest._retry = true;
        return retryRequest(originalRequest, retryCount);
      }
    }

    // Categorize and format error for better handling
    const formattedError = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      type: error.code === 'ECONNABORTED' ? 'timeout' :
        !error.response ? 'network' :
          error.response.status >= 500 ? 'server' : 'client',
      originalError: error,
    };

    // Show notification based on error type and status code 
    safeHandleApiError(formattedError);

    return Promise.reject(formattedError);
  }
);

// API service abstraction for better testability and organization
export const apiService = {
  get: <T>(url: string, params?: any, config?: CustomRequestConfig): Promise<T> =>
    api.get(url, { ...config, params }).then(response => response.data.data),

  post: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> =>
    api.post(url, data, config).then(response => response.data.data),

  put: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> =>
    api.put(url, data, config).then(response => response.data.data),

  patch: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> =>
    api.patch(url, data, config).then(response => response.data.data),

  delete: <T>(url: string, config?: CustomRequestConfig): Promise<T> =>
    api.delete(url, config).then(response => response.data.data),
};

export default api; 