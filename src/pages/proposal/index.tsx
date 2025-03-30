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
 
interface ExtendedRequestConfig extends AxiosRequestConfig {
  showSuccessNotification?: boolean;
}

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input;

const ProposalPage: React.FC = () => { 
  const notification = useNotification();
   
  const handleApiSuccess = useHandleApiSuccess();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('Custom Notification');
  const [customMessage, setCustomMessage] = useState('This is a custom notification message');
   
  const handleCallApi = async (endpoint: string, title: string, color: string, statusCode: number) => {
    try { 
      const config: ExtendedRequestConfig | undefined = endpoint.includes('success') 
        ? { showSuccessNotification: false }
        : undefined;
        
      const response = await apiService.get(endpoint, undefined, config); 
       
      if (endpoint.includes('success')) { 
        const responseData = response.data as Record<string, any>;
        const successMessage = responseData?.message || `Success notification from ${title}`;
        handleApiSuccess(response.data, {
          showSuccessNotification: true,
          successMessage
        });
      }
    } catch (error: any) { 
      console.error(`Error calling ${endpoint}:`, error);
    }
  };
  const handleCallApi2 = async (endpoint: string, title: string, color: string, statusCode: number) => {
    try { 
      const config: ExtendedRequestConfig | undefined = endpoint.includes('success') 
        ? { showSuccessNotification: false }
        : undefined;
        
      const response = await apiService.get(endpoint, undefined, config);  
    } catch (error: any) { 
      console.error(`Error calling ${endpoint}:`, error);
    }
  };
  
  const handleCustomApiCall = async () => {
    try {
      const config: ExtendedRequestConfig = { showSuccessNotification: false };
      const response = await apiService.get(API_ENDPOINTS.NOTIFICATIONS.SUCCESS, undefined, config);
      
      notification.showSuccess(customTitle, customMessage);
      
      setIsModalOpen(false);
    } catch (error: any) {
      notification.showError(customTitle, customMessage);
      setIsModalOpen(false);
    }
  };

  const testAbortController = async () => {
    for (let i = 0; i < 5; i++) {
      console.log(`Sending request ${i+1}`);
      
      setTimeout(() => {
        apiService.get(API_ENDPOINTS.NOTIFICATIONS.SUCCESS)
          .then(response => console.log(`Request ${i+1} succeeded`))
          .catch(error => {
            if (error.message && error.message.includes('canceled')) {
              console.log(`Request ${i+1} was cancelled`);
            } else {
              console.error(`Request ${i+1} failed:`, error);
            }
          });
      }, i * 50);
    }
  };

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
 
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              title={<span>Test Abort Controller</span>}
              size="small" 
              extra={<Tag color="processing">Test</Tag>}
              style={{ 
                height: '100%', 
                borderTop: '2px solid #722ed1' 
              }}
            >
              <Paragraph>Tests cancellation of duplicate requests</Paragraph>
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                Sends multiple identical requests rapidly
              </Paragraph>
              <Button 
                type="primary"
                onClick={testAbortController}
                style={{ marginTop: '8px', background: '#722ed1' }}
                block
              >
                Spam Test
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