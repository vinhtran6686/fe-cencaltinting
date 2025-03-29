// Maximum request timeout (ms)
export const API_TIMEOUT = 30000;

// Maximum retry attempts when request fails
export const MAX_RETRY_ATTEMPTS = 3;

// List of API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Users
  USERS: {
    ME: '/users/me',
    LIST: '/users',
    DETAIL: (id: string | number) => `/users/${id}`,
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string | number) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string | number) => `/products/${id}`,
    DELETE: (id: string | number) => `/products/${id}`,
  },
  
  // Example other resources
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string | number) => `/orders/${id}`,
    CREATE: '/orders',
  },
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Common headers
export const COMMON_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  MULTIPART: {
    'Content-Type': 'multipart/form-data',
  },
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};