import React, { useState } from 'react';
import { message, Row, Col } from 'antd';
import { Button, Card, StepBar } from '@/components/common';
import { Title } from '@/components/common/Typography';
import { useCreateAppointment } from '../../hooks';
import ClientInformationStep from '../steps/ClientInformationStep';
import ServiceSelectionStep from '../steps/ServicesStep';
import ReviewAndSendStep from '../steps/ReviewAndSendStep';

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
      description: 'Client Information',
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
      description: 'Services',
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
      description: 'Review & Send',
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
      <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        <Col flex="1">
          <Card variant="default">
            <div className="steps-content" style={{ marginBottom: '24px' }}>
              {steps[currentStep].content}
            </div>
          </Card>
        </Col>
        <Col style={{ width: 260, flexShrink: 0 }}>
          <Card variant="secondary" style={{ position: 'sticky', top: 16 }}>
            <StepBar
              current={currentStep}
              orientation="vertical"
              steps={steps.map(item => ({ title: item.title, description: item.description }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAppointmentFlow; 