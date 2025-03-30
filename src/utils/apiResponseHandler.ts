import { notificationService } from '../services/notificationService';
import { useNotification } from '../components/providers/NotificationProvider';

/**
 * Handles successful API responses and shows notifications when appropriate
 * @param response API response object
 * @param options Configuration options for handling the response
 */
export const handleApiSuccess = (
  response: any,
  options: {
    showSuccessNotification?: boolean;
    successMessage?: string;
    suppressErrorNotification?: boolean;
  } = {}
) => {
  const { showSuccessNotification = false, successMessage, suppressErrorNotification = false } = options;

  // Handle error responses that have 200 OK status but indicate failure in the response body
  if (response?.success === false && !suppressErrorNotification) {
    const errorMessage = response?.message || 'Operation failed';
    const errorCode = response?.code || '';
    const statusCode = response?.statusCode || 400;
    
    notificationService.showApiError({
      status: statusCode,
      data: response,
      message: errorMessage,
      type: statusCode >= 500 ? 'server' : 'client'
    });
    
    return false;
  }
  
  // Handle successful responses
  if (showSuccessNotification) {
    const title = 'Success';
    const message = successMessage || response?.message || 'Operation completed successfully';
    notificationService.showSuccess(title, message);
  }
  
  return true;
};

/**
 * Hook-based version of handleApiSuccess for use in functional components
 * @returns A function to handle API success responses with notifications
 */
export const useHandleApiSuccess = () => {
  const notification = useNotification();
  
  return (
    response: any,
    options: {
      showSuccessNotification?: boolean;
      successMessage?: string;
      suppressErrorNotification?: boolean;
    } = {}
  ) => {
    const { showSuccessNotification = false, successMessage, suppressErrorNotification = false } = options;

    // Handle error responses that have 200 OK status but indicate failure in the response body
    if (response?.success === false && !suppressErrorNotification) {
      const errorMessage = response?.message || 'Operation failed';
      const errorCode = response?.code || '';
      const statusCode = response?.statusCode || 400;
      
      notification.showApiError({
        status: statusCode,
        data: response,
        message: errorMessage,
        type: statusCode >= 500 ? 'server' : 'client'
      });
      
      return false;
    }
    
    // Handle successful responses
    if (showSuccessNotification) {
      const title = 'Success';
      const message = successMessage || response?.message || 'Operation completed successfully';
      notification.showSuccess(title, message);
    }
    
    return true;
  };
};

/**
 * Helper function to extract error messages from API error responses
 * @param error API error object
 */
export const extractErrorMessage = (error: any): string => {
  if (!error) return 'An unexpected error occurred';
  
  if (error.data?.message) {
    return error.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export default {
  handleApiSuccess,
  useHandleApiSuccess,
  extractErrorMessage
}; 