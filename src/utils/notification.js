import { notification } from 'antd';

// Các loại thông báo
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

// Hiển thị thông báo
export const showNotification = (response) => {
  // Nếu không có response hoặc statusCode, không hiển thị gì
  if (!response || !response.statusCode) return;

  const { statusCode, message, code } = response;
  const type = getNotificationType(statusCode);
  
  // Xác định title dựa vào status code
  let title = 'Thông báo';
  if (type === NotificationType.SUCCESS) title = 'Thành công';
  if (type === NotificationType.ERROR) title = 'Lỗi';
  if (type === NotificationType.WARNING) title = 'Cảnh báo';

  // Hiển thị notification
  notification[type]({
    message: title,
    description: message || 'Đã xảy ra lỗi trong quá trình xử lý.',
    duration: type === NotificationType.ERROR ? 0 : 4.5, // Notification lỗi không tự động biến mất
    key: code || `${type}-${Date.now()}`, // Dùng code làm key nếu có, để tránh duplicate
  });
};

// Shorthand functions
export const showSuccessNotification = (message) => {
  notification.success({
    message: 'Thành công',
    description: message,
  });
};

export const showErrorNotification = (message) => {
  notification.error({
    message: 'Lỗi',
    description: message,
    duration: 0,
  });
};

export const showWarningNotification = (message) => {
  notification.warning({
    message: 'Cảnh báo',
    description: message,
  });
};

export const showInfoNotification = (message) => {
  notification.info({
    message: 'Thông báo',
    description: message,
  });
}; 