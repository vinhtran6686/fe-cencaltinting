import React, { useState } from 'react';
import { Form, Input, Select, Button, Typography, Space, Divider, Row, Col, Drawer, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface ClientInformationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const mockContacts = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
];

const mockYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
const mockMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes'];
const mockModels = ['Camry', 'Accord', 'F-150', 'Silverado', '3 Series', 'C-Class'];
const mockVehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van', 'Coupe', 'Convertible'];

const ClientInformationStep: React.FC<ClientInformationStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [form] = Form.useForm();
  const [isManualEntry, setIsManualEntry] = useState(formData.vehicleDetails?.isCustomEntry || false);
  const [createContactDrawerVisible, setCreateContactDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(
    formData.contact ? mockContacts.find(c => c.id === formData.contact) : null
  );

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Update form data
    updateFormData({
      contact: values.contact,
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
    const contact = mockContacts.find(c => c.id === value);
    form.setFieldsValue({ contact: value });
    setSelectedContact(contact);
  };

  // Handle removing selected contact
  const handleRemoveContact = () => {
    form.setFieldsValue({ contact: undefined });
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
          contact: formData.contact,
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
              <Form.Item name="contact" hidden>
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
                name="contact"
                rules={[{ required: true, message: 'Please select a contact' }]}
                style={{ flex: 1, marginBottom: '8px' }}
              >
                <Select
                  placeholder="Select a contact"
                  onChange={handleContactSelect}
                  style={{ width: '100%' }}
                >
                  {mockContacts.map(contact => (
                    <Option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.phone})
                    </Option>
                  ))}
                </Select>
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
                      <Select placeholder="Select year">
                        {mockYears.map(year => (
                          <Option key={year} value={year}>{year}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={12} style={{ flex: 1 }}>
                    <Form.Item
                      name="make"
                      label="Make"
                      rules={[{ required: true, message: 'Please select the make' }]}
                    >
                      <Select placeholder="Select make">
                        {mockMakes.map(make => (
                          <Option key={make} value={make}>{make}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="model"
                  label="Model"
                  rules={[{ required: true, message: 'Please select the model' }]}
                >
                  <Select placeholder="Select model">
                    {mockModels.map(model => (
                      <Option key={model} value={model}>{model}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="vehicleType"
                  label="Vehicle Type"
                  rules={[{ required: true, message: 'Please select the vehicle type' }]}
                >
                  <Select placeholder="Select vehicle type">
                    {mockVehicleTypes.map(type => (
                      <Option key={type} value={type}>{type}</Option>
                    ))}
                  </Select>
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