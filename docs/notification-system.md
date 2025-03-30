# Notification System

This document describes the notification system implemented in the application.

## Overview

The application uses Ant Design's notification component to display notifications to users based on API responses. Notifications are automatically shown for API errors and can be manually triggered for success cases.

## Components

The notification system consists of the following components:

1. **Notification Service**: Core service handling the display of notifications
2. **API Interceptor Integration**: Automatically shows notifications for API errors
3. **API Response Handler**: Utility to handle API success responses
4. **Error Constants**: Predefined messages for common error scenarios

## Usage

### Automatic Notifications

Error notifications are automatically shown when an API request fails. The notification type and message are determined based on the status code and error message returned from the API.

### Manual Notifications

To manually show notifications in your components:

```typescript
import { notificationService } from '@/services/notificationService';

// Success notification
notificationService.showSuccess('Operation Successful', 'The data was saved successfully');

// Error notification (if needed, only available in useNotificationService hook)
// Use the hook-based version in components
import { useNotificationService } from '@/services/notificationService';

function MyComponent() {
  // Get notification service with all available methods 
  const notification = useNotificationService();

  const handleError = () => {
    notification.showError('Error', 'Failed to save data');
  };

  const handleWarning = () => {
    notification.showWarning('Warning', 'This action cannot be undone');
  };

  const handleInfo = () => {
    notification.showInfo('Information', 'Your session will expire in 5 minutes');
  };

  // ... rest of component
}
```

### Handling API Responses

When making API calls directly, you can use the `apiResponseHandler` to handle responses:

```typescript
import { apiService } from '@/services/api';
import { handleApiSuccess } from '@/utils/apiResponseHandler';

const handleSubmit = async (data) => {
  try {
    const response = await apiService.post('/endpoint', data);
    
    // Will show success notification if configured to do so
    const isSuccess = handleApiSuccess(response.data, {
      showSuccessNotification: true,
      successMessage: 'Data was successfully saved!'
    });
    
    if (isSuccess) {
      // Continue with success flow
    }
  } catch (error) {
    // Error notification is handled automatically by the API interceptor
    console.error('Failed to submit:', error);
  }
};
```

## Notification Types

The system uses four notification types based on the context:

1. **Success (green)**: Shown for successful operations
2. **Info (blue)**: Shown for informational messages
3. **Warning (yellow)**: Shown for 4xx errors and warnings
4. **Error (red)**: Shown for 5xx errors and critical failures

## Customization

The notification appearance (duration, placement, etc.) can be customized when calling the notification methods:

```typescript
notificationService.success('Success', 'Operation completed', {
  duration: 10, // 10 seconds
  placement: 'bottomRight',
  onClick: () => console.log('Notification clicked')
});
```

## Status Code Mapping

The system maps HTTP status codes to appropriate notification types:

- 2xx: Success notification (if explicitly configured)
- 4xx: Warning notification
- 5xx: Error notification

## Error Code Handling

The system recognizes specific error codes returned by the API and displays appropriate messages. These are defined in the `errorCodes.ts` file. 