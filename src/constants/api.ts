// Maximum request timeout (ms)
export const API_TIMEOUT = process.env.NEXT_PUBLIC_API_TIMEOUT ? 
  parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) : 30000;

// Maximum retry attempts when request fails
export const MAX_RETRY_ATTEMPTS = 3;

const BASE_URL = '';

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

  // Notification test endpoints
  NOTIFICATIONS: {
    SUCCESS: '/api/v1/easyplayers/notifications/success',
    FORBIDDEN: '/api/v1/easyplayers/notifications/forbidden',
    UNAUTHORIZED: '/api/v1/easyplayers/notifications/unauthorized',
    NOT_FOUND: '/api/v1/easyplayers/notifications/not-found',
    SERVER_ERROR: '/api/v1/easyplayers/notifications/server-error',
  },

  APPOINTMENTS: {
    LIST: `${BASE_URL}/appointments`,
    DETAILS: (id: string) => `${BASE_URL}/appointments/${id}`,
    CREATE: `${BASE_URL}/appointments`,
    UPDATE: (id: string) => `${BASE_URL}/appointments/${id}`,
    DELETE: (id: string) => `${BASE_URL}/appointments/${id}`,
  },

  CONTACTS: {
    LIST: `${BASE_URL}/contacts`,
    DETAILS: (id: string) => `${BASE_URL}/contacts/${id}`,
    CREATE: `${BASE_URL}/contacts`,
    UPDATE: (id: string) => `${BASE_URL}/contacts/${id}`,
    DELETE: (id: string) => `${BASE_URL}/contacts/${id}`,
  },

  VEHICLES: {
    YEARS: `${BASE_URL}/vehicles/years`,
    MAKES: `${BASE_URL}/vehicles/makes`,
    MODELS: `${BASE_URL}/vehicles/models`,
    TYPES: `${BASE_URL}/vehicles/types`,
  },

  SERVICES: {
    PACKAGES: `${BASE_URL}/services/packages`,
    TAGS: `${BASE_URL}/services/tags`,
    PACKAGE_DETAILS: (id: string) => `${BASE_URL}/services/packages/${id}`,
  },

  TECHNICIANS: {
    LIST: `${BASE_URL}/technicians`,
    AVAILABILITY: (id: string) => `${BASE_URL}/technicians/${id}/availability`,
  },

  SCHEDULING: {
    AVAILABLE_SLOTS: `${BASE_URL}/scheduling/available-slots`,
    CALCULATE_END_TIME: `${BASE_URL}/scheduling/calculate-end-time`,
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