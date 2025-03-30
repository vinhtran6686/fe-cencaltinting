/**
 * HTTP Status codes used in the application
 */
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
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Error codes that may be returned from the API
 */
export const ERROR_CODES = {
  ERR_UNAUTHORIZED: 'Unauthorized access',
  ERR_FORBIDDEN: 'Access forbidden',
  ERR_NOT_FOUND: 'Resource not found',
  ERR_VALIDATION: 'Validation error',
  ERR_SERVER: 'Server error',
  ERR_NETWORK: 'Network error',
  ERR_TIMEOUT: 'Request timeout',
  ERR_CONFLICT: 'Resource conflict',
};

/**
 * Default error messages for different status codes
 */
export const DEFAULT_ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: 'Invalid request. Please check the data you submitted.',
  [HTTP_STATUS.UNAUTHORIZED]: 'You need to be logged in to access this resource.',
  [HTTP_STATUS.FORBIDDEN]: 'You do not have permission to access this resource.',
  [HTTP_STATUS.NOT_FOUND]: 'The requested resource was not found.',
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'The requested method is not allowed.',
  [HTTP_STATUS.CONFLICT]: 'The request conflicts with the current state of the server.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'The server cannot process the request data.',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too many requests. Please try again later.',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'An internal server error occurred. Our team has been notified.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'The service is temporarily unavailable. Please try again later.',
};

export default {
  HTTP_STATUS,
  ERROR_CODES,
  DEFAULT_ERROR_MESSAGES,
}; 