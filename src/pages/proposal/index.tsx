import React, { useState } from 'react'
import { 
  Typography, 
  Card, 
  Button, 
  Divider, 
  Row, 
  Col, 
  Tag,
  Space,
  Modal,
  Input
} from 'antd'
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  WarningOutlined, 
  LockOutlined, 
  ExclamationCircleOutlined,
  BellOutlined,
  EditOutlined
} from '@ant-design/icons'
import { apiService } from '../../services/apiService'
import { useHandleApiSuccess } from '../../utils/apiResponseHandler'
import { useNotification } from '../../components/providers/NotificationProvider'
import { API_ENDPOINTS } from '../../constants/api'
import { AxiosRequestConfig } from 'axios'

// Extend AxiosRequestConfig to include our custom property
interface ExtendedRequestConfig extends AxiosRequestConfig {
  showSuccessNotification?: boolean;
}

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input;

const ProposalPage: React.FC = () => {
  // Use the notification hook
  const notification = useNotification();
  
  // Use the API response handler hook
  const handleApiSuccess = useHandleApiSuccess();

  // State for custom notification modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('Custom Notification');
  const [customMessage, setCustomMessage] = useState('This is a custom notification message');
  
  // Handler functions for API calls
  const handleCallApi = async (endpoint: string, title: string, color: string, statusCode: number) => {
    try {
      // For success endpoints, we'll control the notification manually
      const config: ExtendedRequestConfig | undefined = endpoint.includes('success') 
        ? { showSuccessNotification: false } // Disable automatic notifications
        : undefined;
        
      const response = await apiService.get(endpoint, undefined, config); 
      
      // Handle success responses (only for success endpoint)
      if (endpoint.includes('success')) {
        // Use message from API response or fallback to default
        const responseData = response.data as Record<string, any>;
        const successMessage = responseData?.message || `Success notification from ${title}`;
        handleApiSuccess(response.data, {
          showSuccessNotification: true,
          successMessage
        });
      }
    } catch (error: any) {
      // Error notifications are handled automatically by the API interceptor
      console.error(`Error calling ${endpoint}:`, error);
    }
  };
  const handleCallApi2 = async (endpoint: string, title: string, color: string, statusCode: number) => {
    try {
      // For success endpoints, we'll control the notification manually
      const config: ExtendedRequestConfig | undefined = endpoint.includes('success') 
        ? { showSuccessNotification: false } // Disable automatic notifications
        : undefined;
        
      const response = await apiService.get(endpoint, undefined, config);  
    } catch (error: any) {
      // Error notifications are handled automatically by the API interceptor
      console.error(`Error calling ${endpoint}:`, error);
    }
  };
  
  // Function to call API with custom notification
  const handleCustomApiCall = async () => {
    try {
      // Use a success endpoint but override the notification
      // Disable automatic notification from API interceptor
      const config: ExtendedRequestConfig = { showSuccessNotification: false };
      const response = await apiService.get(API_ENDPOINTS.NOTIFICATIONS.SUCCESS, undefined, config);
      
      // Show custom notification
      notification.showSuccess(customTitle, customMessage);
      
      setIsModalOpen(false);
    } catch (error: any) {
      // If API call fails, show error with custom message
      notification.showError(customTitle, customMessage);
      setIsModalOpen(false);
    }
  };

  // List of test endpoints with icon and color information
  const testEndpoints = [
    { 
      title: 'Success Notification', 
      endpoint: API_ENDPOINTS.NOTIFICATIONS.SUCCESS,
      description: 'Triggers a success notification (200 OK)',
      type: 'primary',
      color: 'success',
      icon: <CheckCircleOutlined />,
      statusCode: 200
    },
    { 
      title: 'Forbidden Error', 
      endpoint: API_ENDPOINTS.NOTIFICATIONS.FORBIDDEN,
      description: 'Triggers a Forbidden error notification',
      type: 'default',
      color: 'warning',
      icon: <LockOutlined />,
      statusCode: 403
    },
    { 
      title: 'Unauthorized Error', 
      endpoint: API_ENDPOINTS.NOTIFICATIONS.UNAUTHORIZED,
      description: 'Triggers an Unauthorized error notification',
      type: 'default',
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      statusCode: 401
    },
    { 
      title: 'Not Found Error', 
      endpoint: API_ENDPOINTS.NOTIFICATIONS.NOT_FOUND,
      description: 'Triggers a Not Found error notification',
      type: 'default',
      color: 'warning',
      icon: <WarningOutlined />,
      statusCode: 404
    },
    { 
      title: 'Server Error', 
      endpoint: API_ENDPOINTS.NOTIFICATIONS.SERVER_ERROR,
      description: 'Triggers a Server Error notification',
      type: 'danger',
      color: 'error',
      icon: <CloseCircleOutlined />,
      statusCode: 500
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}><BellOutlined /> Notification Test Page</Title>
      
      <Card>
        <Paragraph>
          This page allows you to test different types of notifications triggered by API responses.
          Click on the buttons below to trigger different types of notifications.
        </Paragraph>
        
        <Divider orientation="left">Test API Endpoints</Divider>
        <button onClick={() => handleCallApi2(API_ENDPOINTS.NOTIFICATIONS.NOT_FOUND, 'Not Found', 'warning', 404)}>Test</button>
        <Row gutter={[16, 16]}>
          {testEndpoints.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card 
                title={
                  <span>
                    {item.icon} {item.title}
                  </span>
                }
                size="small" 
                extra={
                  <Tag color={item.color}>
                    Status {item.statusCode}
                  </Tag>
                }
                style={{ 
                  height: '100%', 
                  borderTop: `2px solid var(--${item.color}-color, #d9d9d9)` 
                }}
              >
                <Paragraph>{item.description}</Paragraph>
                <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                  Endpoint: {item.endpoint}
                </Paragraph>
                <Button 
                  type="primary"
                  danger={item.color === 'error'}
                  onClick={() => handleCallApi(item.endpoint, item.title, item.color, item.statusCode)}
                  style={{ marginTop: '8px' }}
                  block
                >
                  Test
                </Button>
              </Card>
            </Col>
          ))}
          
          {/* Custom notification button */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              title={<span><EditOutlined /> Custom Notification</span>}
              size="small" 
              extra={<Tag color="processing">Custom</Tag>}
              style={{ 
                height: '100%', 
                borderTop: '2px solid #1677ff' 
              }}
            >
              <Paragraph>Test with your own custom notification message</Paragraph>
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                Uses API_ENDPOINTS.NOTIFICATIONS.SUCCESS
              </Paragraph>
              <Button 
                type="primary"
                onClick={() => setIsModalOpen(true)}
                style={{ marginTop: '8px', background: '#1677ff' }}
                block
              >
                Custom
              </Button>
            </Card>
          </Col>
        </Row>

        <Divider />
        
        <Card title="About Notifications" size="small" style={{ marginTop: '16px' }}>
          <Paragraph>
            <strong>How it works:</strong> The notification system automatically detects the type of API response and displays an appropriate notification:
          </Paragraph>
          <ul>
            <li><Tag color="success">Success</Tag> Green notifications for successful operations (2xx)</li>
            <li><Tag color="warning">Warning</Tag> Yellow notifications for client errors (4xx)</li>
            <li><Tag color="error">Error</Tag> Red notifications for server errors (5xx)</li>
            <li><Tag color="processing">Info</Tag> Blue notifications for informational messages</li>
          </ul>
        </Card>
      </Card>
      
      {/* Custom Notification Modal */}
      <Modal
        title="Custom Notification"
        open={isModalOpen}
        onOk={handleCustomApiCall}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text>Notification Title:</Text>
            <Input 
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              style={{ marginTop: '8px' }}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Text>Notification Message:</Text>
            <TextArea 
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              style={{ marginTop: '8px' }}
            />
          </div>
        </Space>
      </Modal>
    </div>
  )
}

export default ProposalPage 