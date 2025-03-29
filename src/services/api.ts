import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { refreshToken } from './authService'
import { logErrorToService } from './errorService'
import { sanitizeRequestData, sanitizeResponseData } from '../utils/security'
import { API_TIMEOUT, MAX_RETRY_ATTEMPTS } from '../constants/api'

// Type definitions
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
}

// Extended request config to allow for custom properties
interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
  metadata?: {
    startTime: number;
  };
}

// Create API instance with extended configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: API_TIMEOUT || 30000, // Default timeout: 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Helps identify AJAX requests
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
    // Apply cancel token for GET requests to prevent race conditions
    if (config.method?.toLowerCase() === 'get') {
      config = createCancelToken(config);
    }
    
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
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedRequestConfig | undefined;
    
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
    
    // Log error to monitoring service (e.g., Sentry)
    logErrorToService(formattedError);
    
    // Show appropriate user message based on error type
    if (formattedError.type === 'network') {
      console.error('Network error: Please check your internet connection');
    } else if (formattedError.type === 'timeout') {
      console.error('Request timeout: The server took too long to respond');
    } else if (formattedError.type === 'server') {
      console.error('Server error: Our team has been notified');
    }
    
    return Promise.reject(formattedError);
  }
);

// API service abstraction for better testability and organization
export const apiService = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    api.get(url, { ...config, params }),
    
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    api.post(url, data, config),
    
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    api.put(url, data, config),
    
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    api.patch(url, data, config),
    
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    api.delete(url, config),
};

export default api; 