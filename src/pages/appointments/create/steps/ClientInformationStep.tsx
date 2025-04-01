import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Typography, Space, Divider, Row, Col, Drawer, Card, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useContacts, useVehicleYears, useVehicleMakes, useVehicleModels, useVehicleTypes } from '../../../../modules/appointments/hooks';
import { ContactResponse } from '../../../../modules/appointments/services/contactsService';
import { VehicleMake, VehicleModel, VehicleType, VehicleYear } from '@/modules/appointments/services/vehiclesService';

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

interface ClientInformationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const ClientInformationStep: React.FC<ClientInformationStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [form] = Form.useForm();
  const [isManualEntry, setIsManualEntry] = useState(formData.vehicleDetails?.isCustomEntry || false);
  const [createContactDrawerVisible, setCreateContactDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactResponse | null>(null);

  // Fetch contacts
  const { data: contactsData, isLoading: isLoadingContacts } = useContacts({ limit: 100 });

  // Fetch vehicle data
  const { data: yearsData, isLoading: isLoadingYears, refetch: refetchYears } = useVehicleYears();
  const { data: makesData, isLoading: isLoadingMakes, refetch: refetchMakes } = useVehicleMakes();
  const { data: modelsData, isLoading: isLoadingModels, refetch: refetchModels } = useVehicleModels();
  const { data: typesData, isLoading: isLoadingTypes, refetch: refetchTypes } = useVehicleTypes();
  console.log(makesData);

  useEffect(() => {
    refetchYears();
    refetchMakes();
    refetchModels();
    refetchTypes();
  }, []);

  useEffect(() => {
    if (contactsData?.data && formData.contactId) {
      const contact = contactsData.data.find((c: any) => c._id === formData.contactId);
      if (contact) {
        setSelectedContact(contact);
      }
    }
  }, [contactsData, formData.contactId]);

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Update form data
    updateFormData({
      contactId: values.contactId,
      vehicleDetails: {
        year: values.year,
        make: values.make,
        model: values.model,
        vehicleType: values.vehicleType,
        isCustomEntry: isManualEntry,
        // If manual entry, include custom fields
        customYear: values.customYear,
        customMake: values.customMake,
        customModel: values.customModel,
        customVehicleType: values.customVehicleType,
      },
    });

    // Go to next step
    onNext();
  };

  // Toggle between select dropdown and manual entry
  const toggleManualEntry = () => {
    setIsManualEntry(!isManualEntry);
  };

  // Handle contact selection
  const handleContactSelect = (value: string) => {
    const contact = contactsData?.data.find((c: any) => c._id === value);
    if (contact) {
      form.setFieldsValue({ contactId: value });
      setSelectedContact(contact);
    }
  };

  // Handle removing selected contact
  const handleRemoveContact = () => {
    form.setFieldsValue({ contactId: undefined });
    setSelectedContact(null);
  };

  // Handle create contact drawer
  const showCreateContactDrawer = () => {
    setCreateContactDrawerVisible(true);
  };

  const closeCreateContactDrawer = () => {
    setCreateContactDrawerVisible(false);
  };

  // Handle create contact submission
  const handleCreateContactSubmit = () => {
    console.log('Create new contact');
    // In a real app, you would save the contact data here
    closeCreateContactDrawer();
  };


  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          contactId: formData.contactId,
          year: formData.vehicleDetails?.year,
          make: formData.vehicleDetails?.make,
          model: formData.vehicleDetails?.model,
          vehicleType: formData.vehicleDetails?.vehicleType,
          customYear: formData.vehicleDetails?.customYear,
          customMake: formData.vehicleDetails?.customMake,
          customModel: formData.vehicleDetails?.customModel,
          customVehicleType: formData.vehicleDetails?.customVehicleType,
        }}
        onFinish={handleSubmit}
      >
        {/* Contact Selection */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ margin: '0 0 12px 0' }}>Contact</Title>

          {/* Show this when a contact is selected */}
          {selectedContact ? (
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px', position: 'relative' }}>
              <Form.Item name="contactId" hidden>
                <Input />
              </Form.Item>

              <Title level={5} style={{ margin: '0 0 8px 0' }}>
                {selectedContact.name}
              </Title>

              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <PhoneOutlined style={{ color: '#1890ff' }} />
                  <Text>{selectedContact.phone}</Text>
                </Space>

                <Space>
                  <MailOutlined style={{ color: '#1890ff' }} />
                  <Text>{selectedContact.email}</Text>
                </Space>
              </Space>

              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemoveContact}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px'
                }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Form.Item
                name="contactId"
                rules={[{ required: true, message: 'Please select a contact' }]}
                style={{ flex: 1, marginBottom: '8px' }}
              >
                <Select
                  placeholder="Select a contact"
                  onChange={handleContactSelect}
                  loading={isLoadingContacts}
                  style={{ width: '100%' }}
                  options={contactsData?.data?.map((contact: any) => ({
                    label: `${contact.name} (${contact.phone})`,
                    value: contact._id
                  }))}
                />
              </Form.Item>
              <Button
                icon={<PlusOutlined />}
                onClick={showCreateContactDrawer}
                style={{ marginTop: '4px' }}
                ghost
              />
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div>
          <Title level={5} style={{ margin: '0 0 12px 0' }}>Vehicle Details</Title>

          <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px' }}>
            {isManualEntry ? (
              <div>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                  <Col xs={12} style={{ flex: 1 }}>
                    <Form.Item
                      name="customYear"
                      label="Year"
                      rules={[{ required: true, message: 'Please enter the year' }]}
                    >
                      <Input placeholder="Enter year" />
                    </Form.Item>
                  </Col>
                  <Col xs={12} style={{ flex: 1 }}>
                    <Form.Item
                      name="customMake"
                      label="Make"
                      rules={[{ required: true, message: 'Please enter the make' }]}
                    >
                      <Input placeholder="Enter make" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="customModel"
                  label="Model"
                  rules={[{ required: true, message: 'Please enter the model' }]}
                >
                  <Input placeholder="Enter model" />
                </Form.Item>
                <Form.Item
                  name="customVehicleType"
                  label="Vehicle Type"
                  rules={[{ required: true, message: 'Please enter the vehicle type' }]}
                >
                  <Input placeholder="Enter vehicle type" />
                </Form.Item>
              </div>
            ) : (
              <div>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                  <Col xs={12} style={{ flex: 1 }}>
                    <Form.Item
                      name="year"
                      label="Year"
                      rules={[{ required: true, message: 'Please select the year' }]}
                    >
                      <Select
                        placeholder="Select year"
                        loading={isLoadingYears}
                        options={yearsData?.data?.map((year: VehicleYear, index: number) => ({
                          label: year.value,
                          value: year.id  
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} style={{ flex: 1 }}>
                    <Form.Item
                      name="make"
                      label="Make"
                      rules={[{ required: true, message: 'Please select the make' }]}
                    >
                      <Select
                        placeholder="Select make"
                        loading={isLoadingMakes}
                        options={makesData?.data?.map((make: VehicleMake, index: number) => {
                          return {
                            label: make.value,
                            value: make.id
                          }
                        })}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="model"
                  label="Model"
                  rules={[{ required: true, message: 'Please select the model' }]}
                >
                  <Select
                    placeholder="Select model"
                    loading={isLoadingModels}
                    options={modelsData?.data?.map((model: VehicleModel, index: number) => ({
                      label: model.value,
                      value: model.id
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="vehicleType"
                  label="Vehicle Type"
                  rules={[{ required: true, message: 'Please select the vehicle type' }]}
                >
                  <Select
                    placeholder="Select vehicle type"
                    loading={isLoadingTypes}
                    options={typesData?.data?.map((type: VehicleType, index: number) => ({
                      label: type.value,
                      value: type.id
                    }))}
                  />
                </Form.Item>
              </div>
            )}
          </div>

          <div style={{ marginTop: '16px', marginBottom: '24px' }}>
            <Link onClick={toggleManualEntry}>
              {isManualEntry
                ? "I prefer to pick from the available Vehicle options."
                : "Can't find a vehicle? Enter it manually."}
            </Link>
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>

      {/* Create Contact Drawer */}
      <Drawer
        title="Create New Contact"
        placement="right"
        onClose={closeCreateContactDrawer}
        open={createContactDrawerVisible}
        width={400}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={closeCreateContactDrawer}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleCreateContactSubmit}>
              Save
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="contactName"
            rules={[{ required: true, message: 'Please enter contact name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="contactEmail"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="contactPhone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            label="Additional Phone Number"
            name="contactAdditionalPhone"
          >
            <Input placeholder="Enter additional phone number" />
          </Form.Item>
          <Form.Item
            label="Note"
            name="contactNote"
          >
            <TextArea placeholder="Enter notes" rows={3} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ClientInformationStep; 