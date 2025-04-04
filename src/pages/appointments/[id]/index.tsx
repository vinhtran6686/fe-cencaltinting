import React from 'react';
import { useRouter } from 'next/router';
import { Card, Typography, Descriptions, Button, Spin, Tag, Row, Col, Space, Avatar } from 'antd';
import { 
  ArrowLeftOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  UserOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useAppointmentDetails, useContactDetails } from '../../../modules/appointments/hooks';

const { Title, Text } = Typography;

// Status colors
const statusColors = {
  'scheduled': 'blue',
  'in-progress': 'orange',
  'completed': 'green',
  'canceled': 'red'
};

const AppointmentDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Fetch appointment details
  const { 
    data: appointmentData, 
    isLoading: isLoadingAppointment, 
    isError: isAppointmentError,
    error: appointmentError
  } = useAppointmentDetails(id as string);
  
  // Fetch contact details if we have an appointment
  const { 
    data: contactData, 
    isLoading: isLoadingContact 
  } = useContactDetails(appointmentData?.contactId || '');
  
  // Handle back button
  const handleBack = () => {
    router.push('/appointments');
  };
  
  // Handle cancel (in real implementation, would use useCancelAppointment hook)
  const handleCancel = () => {
    // Implement cancel functionality
    console.log('Cancel appointment:', id);
  };
  
  // Loading state
  if (isLoadingAppointment) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading appointment details..." />
      </div>
    );
  }
  
  // Error state
  if (isAppointmentError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading appointment: {appointmentError?.message || 'Unknown error'}
      </div>
    );
  }
  
  // If no data
  if (!appointmentData) {
    return (
      <div style={{ padding: '20px' }}>
        Appointment not found
      </div>
    );
  }
  
  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginRight: '8px' }}
          />
          <Title level={3} style={{ margin: 0 }}>Appointment Details</Title>
        </Space>
        
        <Tag color={statusColors[appointmentData.status] || 'default'} style={{ padding: '4px 12px', fontSize: '16px' }}>
          {appointmentData.status.charAt(0).toUpperCase() + appointmentData.status.slice(1)}
        </Tag>
      </div>
      
      <Row gutter={[24, 24]}>
        {/* Client Information */}
        <Col span={24} md={12}>
          <Card title="Client Information">
            {isLoadingContact ? (
              <Spin />
            ) : contactData ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: '16px' }} />
                  <div>
                    <Title level={4} style={{ margin: 0 }}>{contactData.name}</Title>
                    <Space direction="vertical" style={{ marginTop: '8px' }}>
                      <Space>
                        <MailOutlined />
                        <Text>{contactData.email}</Text>
                      </Space>
                      <Space>
                        <PhoneOutlined />
                        <Text>{contactData.phone}</Text>
                      </Space>
                    </Space>
                  </div>
                </div>
                
                {contactData.additionalInformation && (
                  <div>
                    <Text strong>Additional Information:</Text>
                    <p>{contactData.additionalInformation}</p>
                  </div>
                )}
                
                {contactData.notes && (
                  <div>
                    <Text strong>Notes:</Text>
                    <p>{contactData.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <Text>No contact information available</Text>
            )}
          </Card>
        </Col>
        
        {/* Vehicle Information */}
        <Col span={24} md={12}>
          <Card title="Vehicle Information">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Year">
                {appointmentData.vehicleDetails.year}
              </Descriptions.Item>
              <Descriptions.Item label="Make">
                {appointmentData.vehicleDetails.make}
              </Descriptions.Item>
              <Descriptions.Item label="Model">
                {appointmentData.vehicleDetails.model}
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Type">
                {appointmentData.vehicleDetails.vehicleType}
              </Descriptions.Item>
              <Descriptions.Item label="Custom Entry">
                {appointmentData.vehicleDetails.isCustomEntry ? 'Yes' : 'No'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        
        {/* Appointment Details */}
        <Col span={24}>
          <Card title="Appointment Schedule">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card type="inner" title="Date & Time">
                  <Space direction="vertical" size="middle">
                    <Space>
                      <CalendarOutlined style={{ fontSize: '18px' }} />
                      <Text strong>Start Date:</Text>
                      <Text>{new Date(appointmentData.startDate).toLocaleDateString()}</Text>
                    </Space>
                    
                    {appointmentData.services.map((service, index) => (
                      <Space key={index}>
                        <ClockCircleOutlined style={{ fontSize: '18px' }} />
                        <Text strong>Start Time:</Text>
                        <Text>{service.startTime}</Text>
                      </Space>
                    ))}
                    
                    <Space>
                      <CalendarOutlined style={{ fontSize: '18px' }} />
                      <Text strong>End Date:</Text>
                      <Text>{new Date(appointmentData.endDate).toLocaleDateString()}</Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card type="inner" title="Notes">
                  {appointmentData.notes || 'No notes provided.'}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Services */}
        <Col span={24}>
          <Card title="Services">
            {appointmentData.services.map((service, index) => (
              <Card 
                key={index}
                type="inner"
                title={`Service ${index + 1}`}
                style={{ marginBottom: '16px' }}
              >
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Package ID">
                    {service.packageId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Estimated Time">
                    {service.estimatedTime} minutes
                  </Descriptions.Item>
                  <Descriptions.Item label="Technician ID">
                    {service.technicianId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Service Items">
                    {service.serviceIds?.length > 0 
                      ? service.serviceIds.map(id => (
                          <Tag key={id} style={{ margin: '2px' }}>{id}</Tag>
                        ))
                      : 'No service items'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ))}
          </Card>
        </Col>
      </Row>
      
      {/* Actions */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        {appointmentData.status === 'scheduled' && (
          <Button 
            danger
            onClick={handleCancel}
            style={{ marginRight: '12px' }}
          >
            Cancel Appointment
          </Button>
        )}
        
        <Button type="primary" onClick={() => router.push(`/appointments/${id}/edit`)}>
          Edit Appointment
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetailPage; 