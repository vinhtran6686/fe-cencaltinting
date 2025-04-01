import React, { useState } from 'react';
import { Typography, Space, Button, Tag, Spin, Row, Col, Card } from 'antd';
import { PlusOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppointments, useContactDetails } from '../../modules/appointments/hooks';
import { AppointmentResponse } from '../../modules/appointments/services/appointmentsService';
import { ContactResponse } from '../../modules/appointments/services/contactsService';

const { Title, Text } = Typography;

const statusColors = {
  'scheduled': 'blue',
  'in-progress': 'orange',
  'completed': 'green',
  'canceled': 'red'
};

const AppointmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const router = useRouter();
  
  const { data, isLoading, isError, error } = useAppointments({
    status: activeTab !== 'all' ? activeTab : undefined
  });

  const handleCreateAppointment = () => {
    router.push('/appointments/create');
  };

  const handleViewAppointment = (id: string) => {
    router.push(`/appointments/${id}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spin size="large" tip="Loading appointments..." />
        </div>
      );
    }

    if (isError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          Error loading appointments: {error?.message || 'Unknown error'}
        </div>
      );
    }

    const appointments = data?.data || [];

    return (
      <Row gutter={[16, 16]}>
        {appointments.length > 0 ? (
          appointments.map((appointment: AppointmentResponse) => (
            <Col span={24} key={appointment._id}>
              <AppointmentCard appointment={appointment} onViewDetails={() => handleViewAppointment(appointment._id)} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                No appointments found
              </div>
            </Card>
          </Col>
        )}
      </Row>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Appointments</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateAppointment}
          >
            Create Appointment
          </Button>
        </div>
        
        {renderContent()}
      </Space>
    </div>
  );
};

// Client card component
interface AppointmentCardProps {
  appointment: AppointmentResponse;
  onViewDetails: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onViewDetails }) => {
  const { data: contactData } = useContactDetails(appointment.contactId);
  const contact: ContactResponse = contactData || {
    _id: '',
    name: 'Not specified',
    email: 'Not specified',
    phone: 'Not specified',
    createdAt: '',
    updatedAt: ''
  };

  return (
    <Card 
      hoverable 
      onClick={onViewDetails}
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={4} style={{ marginBottom: '8px' }}>
            {contact.name}
          </Title>
          
          <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
            <Space>
              <PhoneOutlined />
              <Text>{contact.phone}</Text>
            </Space>
            <Space>
              <MailOutlined />
              <Text>{contact.email}</Text>
            </Space>
            {appointment.notes && (
              <Space>
                <MessageOutlined />
                <Text>{appointment.notes}</Text>
              </Space>
            )}
          </Space>
        </div>
        
        <Tag color={statusColors[appointment.status as keyof typeof statusColors] || 'default'} style={{ fontSize: '14px', padding: '2px 10px' }}>
          {appointment.status || 'Unknown'}
        </Tag>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <Space>
          <CalendarOutlined />
          <Text>
            {appointment.startDate ? new Date(appointment.startDate).toLocaleDateString() : 'Not specified'}
            {appointment.endDate ? ` - ${new Date(appointment.endDate).toLocaleDateString()}` : ''}
          </Text>
        </Space>
        
        <Button 
          type="primary" 
          size="small" 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default AppointmentsPage;