import React, { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { DEFAULT_ERROR_MESSAGES } from '../../constants/errorCodes';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationOptions extends Omit<ArgsProps, 'message' | 'description' | 'type'> {
  duration?: number;
}

const DEFAULT_DURATION = 4.5;

const NOTIFICATIONS_ENABLED = process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS === 'true';

interface NotificationContextType {
  showSuccess: (message: string, description?: string, options?: NotificationOptions) => void;
  showInfo: (message: string, description?: string, options?: NotificationOptions) => void;
  showWarning: (message: string, description?: string, options?: NotificationOptions) => void;
  showError: (message: string, description?: string, options?: NotificationOptions) => void;
  showApiError: (error: any) => void;
  isEnabled: () => boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationInitializer = () => {
  const context = useContext(NotificationContext);
  
  React.useEffect(() => {
    if (context) {
      notificationService.setContext(context);
      console.log('Notification service initialized with context');
    }
  }, [context]);
  
  return null;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description?: string,
    options: NotificationOptions = {}
  ) => {
    if (!NOTIFICATIONS_ENABLED) {
      console.log(`[Notification disabled] ${type}: ${message}`, description);
      return;
    }

    notificationApi[type]({
      message,
      description,
      duration: options.duration ?? DEFAULT_DURATION,
      placement: options.placement ?? 'topRight',
      ...options,
    });
  };

  const showApiError = (error: any) => {
    if (!NOTIFICATIONS_ENABLED) return;

    let title = 'Error';
    let message = '';

    if (error) {
      const statusCode = error.status || error.statusCode || error.data?.statusCode;

      if (error.data?.message) {
        message = error.data.message;
      } else if (error.message) {
        message = error.message;
      } else if (statusCode && DEFAULT_ERROR_MESSAGES[statusCode]) {
        message = DEFAULT_ERROR_MESSAGES[statusCode];
      } else {
        message = 'An unexpected error occurred.';
      }

      if (error.type === 'network') {
        title = 'Network Error';
      } else if (error.type === 'timeout') {
        title = 'Request Timeout';
      } else if (error.type === 'server') {
        title = 'Server Error';
      } else if (error.data?.code) {
        title = `Error: ${error.data.code}`;
      } else if (statusCode) {
        title = `Error ${statusCode}`;
      }

      let notificationType: NotificationType = 'error';
      if (statusCode) {
        if (statusCode >= 500) {
          notificationType = 'error';
        } else if (statusCode >= 400) {
          notificationType = 'warning';
        } else {
          notificationType = 'info';
        }
      }

      if (statusCode === 401 || statusCode === 403) {
        notificationType = 'warning';
      }

      showNotification(notificationType, title, message);
    } else {
      showNotification('error', title, 'An unexpected error occurred.');
    }
  };

  const value: NotificationContextType = {
    showSuccess: (message, description, options) => 
      showNotification('success', message, description, options),
    showInfo: (message, description, options) => 
      showNotification('info', message, description, options),
    showWarning: (message, description, options) => 
      showNotification('warning', message, description, options),
    showError: (message, description, options) => 
      showNotification('error', message, description, options),
    showApiError,
    isEnabled: () => NOTIFICATIONS_ENABLED,
  };

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      <NotificationInitializer />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const notificationService = {
  _context: undefined as NotificationContextType | undefined,

  setContext: (context: NotificationContextType) => {
    notificationService._context = context;
  },

  showSuccess: (message: string, description?: string, options?: NotificationOptions) => {
    if (notificationService._context) {
      notificationService._context.showSuccess(message, description, options);
    } else {
      console.warn('Notification context not available. Make sure NotificationProvider is mounted.');
      console.log(`[Notification without context] success: ${message}`, description);
    }
  },

  showInfo: (message: string, description?: string, options?: NotificationOptions) => {
    if (notificationService._context) {
      notificationService._context.showInfo(message, description, options);
    } else {
      console.warn('Notification context not available. Make sure NotificationProvider is mounted.');
      console.log(`[Notification without context] info: ${message}`, description);
    }
  },

  showWarning: (message: string, description?: string, options?: NotificationOptions) => {
    if (notificationService._context) {
      notificationService._context.showWarning(message, description, options);
    } else {
      console.warn('Notification context not available. Make sure NotificationProvider is mounted.');
      console.log(`[Notification without context] warning: ${message}`, description);
    }
  },

  showError: (message: string, description?: string, options?: NotificationOptions) => {
    if (notificationService._context) {
      notificationService._context.showError(message, description, options);
    } else {
      console.warn('Notification context not available. Make sure NotificationProvider is mounted.');
      console.log(`[Notification without context] error: ${message}`, description);
    }
  },

  showApiError: (error: any) => {
    if (notificationService._context) {
      notificationService._context.showApiError(error);
    } else {
      console.warn('Notification context not available. Make sure NotificationProvider is mounted.');
      console.log('[Notification without context] API Error:', error);
    }
  },

  isEnabled: () => {
    if (notificationService._context) {
      return notificationService._context.isEnabled();
    }
    return NOTIFICATIONS_ENABLED;
  }
};

export default NotificationProvider; 