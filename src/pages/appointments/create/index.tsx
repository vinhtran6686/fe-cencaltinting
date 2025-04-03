import React from 'react';
import { Typography } from 'antd';
import { useRouter } from 'next/router'; 
import CreateAppointmentFlow from '../../../modules/appointments/components/CreateAppointment';

const { Title } = Typography;

const AppointmentCreatePage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/appointments');
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: '16px', lineHeight: '52px' }}>Create Appointment</Title>
      <CreateAppointmentFlow 
        onSuccess={handleSuccess}
        onError={(error) => console.error('Appointment creation failed:', error)}
      />
    </div>
  );
};

export default AppointmentCreatePage; 