import { notificationService } from '../services/notificationService';
import { useNotification } from '../components/providers/NotificationProvider';

/**
 * Handles successful API responses and shows notifications when appropriate
 * @param response API response object
 * @param options Configuration options for handling the response
 */
export const handleApiSuccess = (
  response: unknown,
  options: {
    showSuccessNotification?: boolean;
    successMessage?: string;
    suppressErrorNotification?: boolean;
  } = {}
) => {
  const { showSuccessNotification = false, successMessage, suppressErrorNotification = false } = options;
  const typedResponse = response as { success?: boolean; message?: string; code?: string; statusCode?: number };

  // Handle error responses that have 200 OK status but indicate failure in the response body
  if (typedResponse?.success === false && !suppressErrorNotification) {
    const errorMessage = typedResponse?.message || 'Operation failed';
    const statusCode = typedResponse?.statusCode || 400;
    
    notificationService.showApiError({
      status: statusCode,
      data: typedResponse,
      message: errorMessage,
      type: statusCode >= 500 ? 'server' : 'client'
    });
    
    return false;
  }
  
  // Handle successful responses
  if (showSuccessNotification) {
    const title = 'Success';
    const message = successMessage || typedResponse?.message || 'Operation completed successfully';
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
    response: unknown,
    options: {
      showSuccessNotification?: boolean;
      successMessage?: string;
      suppressErrorNotification?: boolean;
    } = {}
  ) => {
    const { showSuccessNotification = false, successMessage, suppressErrorNotification = false } = options;
    const typedResponse = response as { success?: boolean; message?: string; code?: string; statusCode?: number };

    // Handle error responses that have 200 OK status but indicate failure in the response body
    if (typedResponse?.success === false && !suppressErrorNotification) {
      const errorMessage = typedResponse?.message || 'Operation failed';
      const statusCode = typedResponse?.statusCode || 400;
      
      notification.showApiError({
        status: statusCode,
        data: typedResponse,
        message: errorMessage,
        type: statusCode >= 500 ? 'server' : 'client'
      });
      
      return false;
    }
    
    // Handle successful responses
    if (showSuccessNotification) {
      const title = 'Success';
      const message = successMessage || typedResponse?.message || 'Operation completed successfully';
      notification.showSuccess(title, message);
    }
    
    return true;
  };
};

/**
 * Helper function to extract error messages from API error responses
 * @param error API error object
 */
export const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';
  
  const typedError = error as { data?: { message?: string }; message?: string };
  
  if (typedError.data?.message) {
    return typedError.data.message;
  }
  
  if (typedError.message) {
    return typedError.message;
  }
  
  return 'An unexpected error occurred';
};

const apiResponseHandler = {
  handleApiSuccess,
  useHandleApiSuccess,
  extractErrorMessage
};

export default apiResponseHandler; 