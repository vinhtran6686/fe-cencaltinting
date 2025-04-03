import { notification } from 'antd';

// Notification types
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Map status code to notification type
const getNotificationType = (statusCode) => {
  if (statusCode >= 200 && statusCode < 300) return NotificationType.SUCCESS;
  if (statusCode >= 400 && statusCode < 500) return NotificationType.ERROR;
  if (statusCode >= 500) return NotificationType.ERROR;
  return NotificationType.INFO;
};

// Show notification
export const showNotification = (response) => {
  // If there is no response or statusCode, do not show anything
  if (!response || !response.statusCode) return;

  const { statusCode, message, code } = response;
  const type = getNotificationType(statusCode);
  
  // Determine title based on status code
  let title = 'Notification';
  if (type === NotificationType.SUCCESS) title = 'Success';
  if (type === NotificationType.ERROR) title = 'Error';
  if (type === NotificationType.WARNING) title = 'Warning';

  // Show notification
  notification[type]({
    message: title,
    description: message || 'An error occurred during processing.',
    duration: type === NotificationType.ERROR ? 0 : 4.5, // Error notification does not disappear automatically
    key: code || `${type}-${Date.now()}`, // Use code as key if available to avoid duplicates
  });
};

// Shorthand functions
export const showSuccessNotification = (message) => {
  notification.success({
    message: 'Success',
    description: message,
  });
};

export const showErrorNotification = (message) => {
  notification.error({
    message: 'Error',
    description: message,
    duration: 0,
  });
};

export const showWarningNotification = (message) => {
  notification.warning({
    message: 'Warning',
    description: message,
  });
};

export const showInfoNotification = (message) => {
  notification.info({
    message: 'Notification',
    description: message,
  });
}; 