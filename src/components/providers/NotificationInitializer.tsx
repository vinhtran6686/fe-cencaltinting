import { useEffect } from 'react';
import { useNotification, notificationService } from './NotificationProvider';

/**
 * This component initializes the notification service with the context
 * It should be rendered once within the NotificationProvider
 */
const NotificationInitializer = () => {
  const notificationContext = useNotification();
  
  useEffect(() => {
    // Set the context for the notification service
    notificationService.setContext(notificationContext);
    
    // For debugging purposes
    console.log('Notification service initialized with context');
  }, [notificationContext]);
  
  // This component doesn't render anything
  return null;
};

export default NotificationInitializer; 