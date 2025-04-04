import React, { useState } from 'react';
import { Typography, Space, Button, Spin, Row, Col, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppointments } from '../../modules/appointments/hooks';

const { Title } = Typography;


const AppointmentsPage: React.FC = () => {
  const [activeTab] = useState<string>('all');
  const router = useRouter();

  const { isLoading, isError, error } = useAppointments({
    status: activeTab !== 'all' ? activeTab : undefined
  });

  const handleCreateAppointment = () => {
    router.push('/appointments/create');
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


    return (
      <Row gutter={[16, 16]}>
        {/* {appointments.length > 0 ? (
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
        )} */}
        <Col span={24}>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Appointment list is not available yet
            </div>
          </Card>
        </Col>
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