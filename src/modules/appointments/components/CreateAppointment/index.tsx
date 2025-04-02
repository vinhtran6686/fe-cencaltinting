import React, { useState } from 'react';
import { Steps, Typography, Card, message, Button, Row, Col } from 'antd';
import { useCreateAppointment } from '../../hooks';
import ClientInformationStep from '../steps/ClientInformationStep';
import ServiceSelectionStep from '../steps/ServicesStep';
import ReviewAndSendStep from '../steps/ReviewAndSendStep';

const { Title } = Typography;

interface CreateAppointmentProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const CreateAppointmentFlow: React.FC<CreateAppointmentProps> = ({
  onSuccess,
  onError,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { mutate: createAppointment, isPending: isCreating } = useCreateAppointment();
  const [formData, setFormData] = useState({
    contactId: '',
    vehicleDetails: {
      year: '',
      make: '',
      model: '',
      vehicleType: '',
      isCustomEntry: false,
      customYear: '',
      customMake: '',
      customModel: '',
      customVehicleType: '',
    },
    services: [],
    time: '',
    date: null,
    notes: '',
  });

  const steps = [
    {
      title: 'Step 1',
      description: 'Enter the client information',
      content: (
        <ClientInformationStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={() => handleNext()}
        />
      ),
    },
    {
      title: 'Step 2',
      description: 'Select the services',
      content: (
        <ServiceSelectionStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={() => handleNext()}
          onBack={() => handleBack()}
        />
      ),
    },
    {
      title: 'Step 3',
      description: 'Review the appointment details and send the appointment',
      content: (
        <ReviewAndSendStep
          formData={formData}
          updateFormData={updateFormData}
          onBack={() => handleBack()}
          onSubmit={handleSubmit}
          goToStep={goToStep}
        />
      ),
    },
  ];

  function updateFormData(data: any) {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
  }

  function handleNext() {
    setCurrentStep(prev => prev + 1);
  }

  function handleBack() {
    setCurrentStep(prev => prev - 1);
  }

  function goToStep(step: number) {
    setCurrentStep(step);
  }

  function handleSubmit() {
    // Format the data for the API
    const appointmentData = {
      contactId: formData.contactId,
      vehicleDetails: {
        year: formData.vehicleDetails.isCustomEntry
          ? formData.vehicleDetails.customYear
          : formData.vehicleDetails.year,
        make: formData.vehicleDetails.isCustomEntry
          ? formData.vehicleDetails.customMake
          : formData.vehicleDetails.make,
        model: formData.vehicleDetails.isCustomEntry
          ? formData.vehicleDetails.customModel
          : formData.vehicleDetails.model,
        vehicleType: formData.vehicleDetails.isCustomEntry
          ? formData.vehicleDetails.customVehicleType
          : formData.vehicleDetails.vehicleType,
        isCustomEntry: formData.vehicleDetails.isCustomEntry,
      },
      services: formData.services.map((service: any) => ({
        packageId: service._id || service.id,
        serviceIds: service.children?.map((s: any) => s._id || s.id) || [],
        estimatedTime: service.estimatedTime || 0,
        technicianId: service.technicianId || '',
        startDate: formData.date ? new Date(formData.date).toISOString().split('T')[0] : '',
        startTime: formData.time || '',
      })),
      startDate: formData.date ? new Date(formData.date).toISOString().split('T')[0] : '',
      notes: formData.notes || '',
    };

    // Call the API
    createAppointment(appointmentData, {
      onSuccess: () => {
        message.success('Appointment created successfully!');
        onSuccess && onSuccess();
      },
      onError: (error: any) => {
        message.error(`Failed to create appointment: ${error.message}`);
        onError && onError(error);
      }
    });
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card>
            <div className="steps-content" style={{ marginBottom: '24px' }}>
              {steps[currentStep].content}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ position: 'sticky', top: '24px' }}>
            <Steps
              current={currentStep}
              direction="vertical"
              size="small"
              items={steps.map(item => ({ title: item.title, description: item.description }))}
              style={{ marginBottom: '24px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAppointmentFlow; 