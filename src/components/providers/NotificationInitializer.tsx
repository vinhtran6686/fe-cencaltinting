import { useEffect } from 'react';
import { useNotification, notificationService } from './NotificationProvider';

const NotificationInitializer = () => {
  const notificationContext = useNotification();
  
  useEffect(() => {
    notificationService.setContext(notificationContext);
    
    console.log('Notification service initialized with context');
  }, [notificationContext]);
  
  return null;
};

export default NotificationInitializer; 