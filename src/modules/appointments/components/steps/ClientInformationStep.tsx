import React, { useState, useEffect } from 'react';
import { Space, Divider, Row, Col, Spin, Flex } from 'antd';
import { Typography as AntTypography } from 'antd';
import { Button, Card } from '@/components/common';
import { Form, FormItem } from '@/components/common/Form';
import { Input, TextArea } from '@/components/common/Input';
import { CustomDrawer } from '@/components/common/Drawer';
import { Title, Text, Paragraph } from '@/components/common/Typography';
import { PlusOutlined, DeleteOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useContacts, useVehicleYears, useVehicleMakes, useVehicleModels, useVehicleTypes } from '@/modules/appointments/hooks';
import { ContactResponse } from '@/modules/appointments/services/contactsService';
import { VehicleMake, VehicleModel, VehicleType, VehicleYear } from '@/modules/appointments/services/vehiclesService';
import { spacing } from '@/theme/tokens';
import { Select } from '@/components/common/Select';


const { Link } = AntTypography;

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
    // setIsManualEntry(!isManualEntry);
  };

  // Handle contact selection
  const handleContactSelect = (value: string) => {
    // const contact = contactsData?.data.find((c: any) => c._id === value);
    // if (contact) {
    //   form.setFieldsValue({ contactId: value });
    //   setSelectedContact(contact);
    // }
  };

  // Handle removing selected contact
  const handleRemoveContact = () => {
    // form.setFieldsValue({ contactId: undefined });
    // setSelectedContact(null);
  };

  // Handle create contact drawer
  const showCreateContactDrawer = () => {
    // setCreateContactDrawerVisible(true);
  };

  const closeCreateContactDrawer = () => {
    // setCreateContactDrawerVisible(false);
  };

  // Handle create contact submission
  const handleCreateContactSubmit = () => {
    // console.log('Create new contact');
    // // In a real app, you would save the contact data here
    // closeCreateContactDrawer();
  };


  return (
    <div>
      <Form
        form={form}
        initialValues={{
          contactId: formData.contactId || undefined,
          year: formData.vehicleDetails?.year || undefined,
          make: formData.vehicleDetails?.make || undefined,
          model: formData.vehicleDetails?.model || undefined,
          vehicleType: formData.vehicleDetails?.vehicleType || undefined,
          customYear: formData.vehicleDetails?.customYear || '',
          customMake: formData.vehicleDetails?.customMake || '',
          customModel: formData.vehicleDetails?.customModel || '',
          customVehicleType: formData.vehicleDetails?.customVehicleType || '',
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        {/* Contact Selection */}
        <div style={{ marginBottom: '24px' }}>

          {selectedContact ? (
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px', position: 'relative' }}>
              <FormItem name="contactId" hidden>
                <Input />
              </FormItem>

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
              <FormItem
                name="contactId"
                label="Contact"
                rules={[{ required: true, message: 'Please select a contact' }]}
                style={{ flex: 1, marginBottom: '8px' }}
              >
                <Select
                  placeholder="Select"
                  onChange={handleContactSelect}
                  loading={isLoadingContacts}
                  options={(contactsData?.data || [])?.map((contact: any) => ({
                    label: `${contact.name} (${contact.phone})`,
                    value: contact._id
                  }))}
                />
              </FormItem>
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
          <Title level={5} style={{ marginBottom: spacing.md }}>Vehicle Detail</Title>
          <Card variant="inline">
            {isManualEntry ? (
              <div>
                <Flex gap={spacing.md}>
                  <FormItem
                    name="customYear"
                    label="Year"
                    required
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Enter year" />
                  </FormItem>
                  <FormItem
                    name="customMake"
                    label="Make"
                    required
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Enter make" />
                  </FormItem>
                </Flex>
                <FormItem
                  name="customModel"
                  label="Model"
                  required
                >
                  <Input placeholder="Enter model" />
                </FormItem>
                <FormItem
                  name="customVehicleType"
                  label="Vehicle Type"
                  required
                >
                  <Input placeholder="Enter vehicle type" />
                </FormItem>
              </div>
            ) : (
              <div>
                <Row gutter={16} style={{ marginBottom: spacing.lg }}>
                  <Col xs={12} style={{ flex: 1 }}>
                    <FormItem
                      name="year"
                      label="Year"
                      rules={[{ required: true, message: 'Please select a year' }]}
                    >
                      <Select
                        placeholder="Select"
                        loading={isLoadingYears}
                        options={(yearsData || []).map((year: VehicleYear, index: number) => ({
                          label: year.value,
                          value: year.id
                        }))}
                      />
                    </FormItem>
                  </Col>
                  <Col xs={12} style={{ flex: 1 }}>
                    <FormItem
                      name="make"
                      label="Make"
                      required
                    >
                      <Select
                        placeholder="Select"
                        loading={isLoadingMakes}
                        options={(makesData || []).map((make: VehicleMake, index: number) => {
                          return {
                            label: make.value,
                            value: make.id
                          }
                        })}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <FormItem
                  name="model"
                  label="Model"
                  required
                >
                  <Select
                    placeholder="Select"
                    loading={isLoadingModels}
                    options={(modelsData || []).map((model: VehicleModel, index: number) => ({
                      label: model.value,
                      value: model.id
                    }))}
                  />
                </FormItem>
                <FormItem
                  name="vehicleType"
                  label="Vehicle Type"
                  required
                >
                  <Select
                    placeholder="Select"
                    loading={isLoadingTypes}
                    options={(typesData || []).map((type: VehicleType, index: number) => ({
                      label: type.value,
                      value: type.id
                    }))}
                  />
                </FormItem>
              </div>
            )}
          </Card>

          <Flex style={{ margin: '24px 0' }}>
            <Link onClick={toggleManualEntry}>
              {isManualEntry
                ? "I prefer to pick from the available Vehicle options."
                : "Can't find a vehicle? Enter it manually."}
            </Link>
          </Flex>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>

      {/* Create Contact Drawer */}
      <CustomDrawer
        title="Create New Contact"
        open={createContactDrawerVisible}
        onClose={closeCreateContactDrawer}
        onSave={handleCreateContactSubmit}
        width={400}
        cancelText="Cancel"
        saveText="Save"
      >
        <Form layout="vertical">
          <FormItem
            label="Name"
            name="contactName"
            required
          >
            <Input placeholder="Enter full name" />
          </FormItem>
          <FormItem
            label="Email"
            name="contactEmail"
            required
          >
            <Input placeholder="Enter email address" />
          </FormItem>
          <FormItem
            label="Phone Number"
            name="contactPhone"
            required
          >
            <Input placeholder="Enter phone number" />
          </FormItem>
          <FormItem
            label="Additional Phone Number"
            name="contactAdditionalPhone"
          >
            <Input placeholder="Enter additional phone number" />
          </FormItem>
          <FormItem
            label="Note"
            name="contactNote"
          >
            <TextArea placeholder="Enter notes" rows={3} />
          </FormItem>
        </Form>
      </CustomDrawer>
    </div>
  );
};

export default ClientInformationStep; 