import React, { useEffect, useState } from 'react';
import { Typography, Space, Button, Tag, Spin, Row, Col, Card } from 'antd';
import { PlusOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { appointments } from '../../modules/appointments';
import { fetchAppointments } from '../../modules/appointments/redux/appointmentsThunks';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

const statusColors = {
  'scheduled': 'blue',
  'in-progress': 'orange',
  'completed': 'green',
  'cancelled': 'red'
};

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appointmentsList = useAppSelector(appointments.selectors.selectAllAppointments);
  const status = useAppSelector(appointments.selectors.selectAppointmentStatus);
  const error = useAppSelector(appointments.selectors.selectAppointmentError);
  const [activeTab, setActiveTab] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const handleCreateAppointment = () => {
    router.push('/appointments/create');
  };

  const handleViewAppointment = (id: string) => {
    router.push(`/appointments/${id}`);
  };

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spin size="large" tip="Loading appointments..." />
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          Error loading appointments: {error}
        </div>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {Array.isArray(appointmentsList) && appointmentsList.length > 0 ? (
          appointmentsList.map((appointment: any) => (
            <Col span={24} key={appointment.id}>
              <Card 
                hoverable 
                onClick={() => handleViewAppointment(appointment.id)}
                style={{ width: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Title level={4} style={{ marginBottom: '8px' }}>
                      {appointment.clientName || appointment.clientId || 'Not specified'}
                    </Title>
                    
                    <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
                      <Space>
                        <PhoneOutlined />
                        <Text>{appointment.clientPhone || 'Not specified'}</Text>
                      </Space>
                      <Space>
                        <MailOutlined />
                        <Text>{appointment.clientEmail || 'Not specified'}</Text>
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
                      handleViewAppointment(appointment.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
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

export default AppointmentsPage;