import React, { useState } from 'react';
import { Card, Steps, Button, Typography, Space, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import ClientInformationStep from './steps/ClientInformationStep';
import ServicesStep from './steps/ServicesStep';
import ReviewAndSendStep from './steps/ReviewAndSendStep';

const { Title } = Typography;
const { Step } = Steps;

// Define steps for the process
const steps = [
  {
    title: 'Client Info',
    description: 'Step 1',
    fullTitle: 'Client Information'
  },
  {
    title: 'Services',
    description: 'Step 2',
    fullTitle: 'Services'
  },
  {
    title: 'Review & Send',
    description: 'Step 3',
    fullTitle: 'Review & Send'
  }
];

const CreateAppointmentPage: React.FC = () => {
  const router = useRouter();
  
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    // Client information
    contact: null,
    vehicleDetails: {
      isCustomEntry: false,
      year: null,
      make: null,
      model: null,
      vehicleType: null,
      customYear: '',
      customMake: '',
      customModel: '',
      customVehicleType: '',
    },
    
    // Selected services
    services: [],
    
    // Scheduling information
    date: null,
    time: null,
    technicianId: null,
  });
  
  // Handle form data updates
  const updateFormData = (data: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data
    }));
  };
  
  // Navigation handlers
  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = () => {
    // In a real application, we would send the form data to the server here
    console.log('Submitting appointment:', formData);
    
    // Navigate to the list page after submission
    // You could also show a success message
    router.push('/appointments');
  };
  
  // Render the appropriate step content based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ClientInformationStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ServicesStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <ReviewAndSendStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <div style={{ padding: '24px' }}>
      <Row>
        <Col span={24}>
          <Title level={4} style={{ margin: '0 0 24px 0' }}>
            {steps[currentStep].fullTitle}
          </Title>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card style={{ marginBottom: '24px' }}>
            {renderStepContent()}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ position: 'sticky', top: '24px' }}>
            <Steps 
              current={currentStep} 
              direction="vertical"
              size="small"
              style={{ padding: '16px 8px' }}
            >
              {steps.map(step => (
                <Step 
                  key={step.title} 
                  title={step.title} 
                  description={step.description}
                />
              ))}
            </Steps>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAppointmentPage; 