// Possible error types
export enum ErrorType {
  NETWORK = 'network',
  TIMEOUT = 'timeout', 
  SERVER = 'server',
  CLIENT = 'client',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  UNKNOWN = 'unknown'
}

// API Error interface
export interface ApiError {
  status?: number;
  statusText?: string;
  data?: unknown;
  message: string;
  type: ErrorType | string;
  originalError?: unknown;
  timestamp?: number;
  url?: string;
  method?: string;
}

// Log errors to console with different formats
const logToConsole = (error: ApiError): void => {
  const errorStyles = {
    network: 'color: white; background-color: #B71C1C; padding: 2px 5px; border-radius: 3px;',
    timeout: 'color: white; background-color: #E65100; padding: 2px 5px; border-radius: 3px;',
    server: 'color: white; background-color: #880E4F; padding: 2px 5px; border-radius: 3px;',
    client: 'color: white; background-color: #0D47A1; padding: 2px 5px; border-radius: 3px;',
    default: 'color: white; background-color: #424242; padding: 2px 5px; border-radius: 3px;'
  };

  const style = errorStyles[error.type as keyof typeof errorStyles] || errorStyles.default;
  
  console.groupCollapsed(`%c ${error.type.toUpperCase()} ERROR: ${error.message}`, style);
  console.log('Status:', error.status);
  console.log('URL:', error.url);
  console.log('Method:', error.method);
  console.log('Timestamp:', new Date(error.timestamp || Date.now()).toLocaleString());
  console.log('Error Data:', error.data);
  console.log('Original Error:', error.originalError);
  console.groupEnd();
};
 

// Log error to service
export const logErrorToService = (error: ApiError): void => {
  // Ensure error has all information
  const enhancedError: ApiError = {
    ...error,
    timestamp: Date.now()
  };
  
  // Log to console in development environment
  if (process.env.NODE_ENV === 'development') {
    logToConsole(enhancedError);
  }
   
  // Send error to backend for check
  // sendErrorToBackend(enhancedError);
};

// Create a user-friendly error message
export const getErrorMessage = (error: ApiError): string => {
  switch (error.type) {
    case ErrorType.NETWORK:
      return 'Unable to connect to server. Please check your internet connection.';
    
    case ErrorType.TIMEOUT:
      return 'Request timed out. Please try again later.';
    
    case ErrorType.SERVER:
      return 'A server error occurred. Our technical team has been notified.';
    
    case ErrorType.AUTHENTICATION:
      return 'Your session has expired. Please log in again.';
    
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to access this resource.';
    
    case ErrorType.VALIDATION:
      return 'Invalid data. Please check your information.';
    
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    
    default:
      return error.message || 'An unknown error occurred.';
  }
};