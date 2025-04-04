import React, { useState, useEffect, useCallback } from 'react';
import { Space, Divider, Row, Col, Flex, Spin } from 'antd';
import { Typography as AntTypography } from 'antd';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Form, FormItem } from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import { Title, Text } from '@/components/common/Typography';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useContacts,
  useVehicleYears,
  useVehicleMakes,
  useVehicleModels,
  useVehicleTypes,
  useCreateContact,
} from '@/modules/appointments/hooks';
import { ContactResponse } from '@/modules/appointments/services/contactsService';
import { VehicleMake, VehicleModel, VehicleType, VehicleYear } from '@/modules/appointments/services/vehiclesService';
import { colors, spacing } from '@/theme/tokens';
import { Select } from '@/components/common/Select';
import FormValidation from '@/components/common/Form/FormValidation';
import { ContactSelectionDrawer, CreateContactDrawer } from '../shared';
import { StyledSelectContactBox } from '../../styles/ClientInformation.styles';

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
  const [contactListDrawerVisible, setContactListDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactResponse | null>(null);

  // Fetch contacts
  const { data: contactsData, isLoading: isLoadingContacts, refetch: refetchContacts } = useContacts({ limit: 100 });

  // Fetch vehicle data
  const { data: yearsData, isLoading: isLoadingYears } = useVehicleYears();
  const { data: makesData, isLoading: isLoadingMakes } = useVehicleMakes();
  const { data: modelsData, isLoading: isLoadingModels } = useVehicleModels();
  const { data: typesData, isLoading: isLoadingTypes } = useVehicleTypes();

  const { mutate: createContact, isPending: isCreatingContact } = useCreateContact();

  // Find and set selected contact when contact ID changes or when contacts data is loaded
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
  const toggleManualEntry = useCallback(() => {
    setIsManualEntry(prevState => !prevState);
  }, []);

  // Handle removing selected contact
  const handleRemoveContact = useCallback(() => {
    form.setFieldsValue({ contactId: undefined });
    setSelectedContact(null);
  }, [form]);

  // Handle open contact list drawer
  const showContactListDrawer = useCallback(() => {
    setContactListDrawerVisible(true);
  }, []);

  const closeContactListDrawer = useCallback(() => {
    setContactListDrawerVisible(false);
  }, []);

  // Handle create contact drawer
  const showCreateContactDrawer = useCallback(() => {
    setCreateContactDrawerVisible(true);
  }, []);

  const closeCreateContactDrawer = useCallback(() => {
    setCreateContactDrawerVisible(false);
  }, []);

  // Handle contact selected from drawer
  const handleContactSelected = useCallback((contactId: string) => {
    if (contactsData?.data) {
      const contact = contactsData.data.find((c: any) => c._id === contactId);
      if (contact) {
        form.setFieldsValue({ contactId });
        setSelectedContact(contact);
        closeContactListDrawer();
      }
    }
  }, [contactsData, form, closeContactListDrawer]);

  // Handle successful contact creation
  const handleContactCreated = useCallback((newContactId: string) => {
    // Refetch contacts to update list
    refetchContacts();
  }, [refetchContacts]);

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
            <Flex vertical gap={spacing.sm}>
              <Title level={5} style={{ margin: '0' }}>Contact <span style={{ color: 'red' }}>*</span></Title>
              <FormItem name="contactId" hidden>
                <Input />
              </FormItem>
              <Space size="small">
                <Text style={{ fontWeight: 'bold', width: '64px', color: colors.descriptionText, whiteSpace: 'nowrap' }}>Client</Text>
                <Space size="small" style={{ flex: 1, flexWrap: 'wrap' }}>
                  <Text ellipsis={{ tooltip: true }} style={{ maxWidth: '100%' }}>{selectedContact.name} </Text>
                  <Divider type="vertical" style={{ margin: '0 4px', height: '24px' }} />
                  <Text> {selectedContact.phone} </Text>
                  <Divider type="vertical" style={{ margin: '0 4px', height: '24px' }} />
                  <Text> {selectedContact.email} </Text>
                </Space>
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={handleRemoveContact}
                />
              </Space>
            </Flex>
          ) : (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
              <FormItem
                name="contactId"
                label="Contact"
                rules={[FormValidation.required('Please select a contact')]}
                style={{ flex: 1, marginBottom: '8px' }}
              > 
                <StyledSelectContactBox onClick={showContactListDrawer}>
                  Select a contact
                  <span></span>
                </StyledSelectContactBox>
              </FormItem>
              <Button
                icon={isCreatingContact ? <Spin size="small" /> : <PlusOutlined />}
                onClick={showCreateContactDrawer}
                color="default"
                variant="outlined"
                style={{ width: 48, height: 48 }}
                size="large"
                disabled={isCreatingContact}
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
                    rules={[FormValidation.required('Please enter the vehicle year')]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Enter year" />
                  </FormItem>
                  <FormItem
                    name="customMake"
                    label="Make"
                    rules={[FormValidation.required('Please enter the vehicle make')]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Enter make" />
                  </FormItem>
                </Flex>
                <FormItem
                  name="customModel"
                  label="Model"
                  rules={[FormValidation.required('Please enter the vehicle model')]}
                >
                  <Input placeholder="Enter model" />
                </FormItem>
                <FormItem
                  name="customVehicleType"
                  label="Vehicle Type"
                  rules={[FormValidation.required('Please enter the vehicle type')]}
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
                      rules={[FormValidation.required('Please select a year')]}
                    >
                      <Select
                        placeholder="Select"
                        loading={isLoadingYears}
                        options={(yearsData || []).map((year: VehicleYear) => ({
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
                      rules={[FormValidation.required('Please select a make')]}
                    >
                      <Select
                        placeholder="Select"
                        loading={isLoadingMakes}
                        options={(makesData || []).map((make: VehicleMake) => {
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
                  rules={[FormValidation.required('Please select a model')]}
                >
                  <Select
                    placeholder="Select"
                    loading={isLoadingModels}
                    options={(modelsData || []).map((model: VehicleModel) => ({
                      label: model.value,
                      value: model.id
                    }))}
                  />
                </FormItem>
                <FormItem
                  name="vehicleType"
                  label="Vehicle Type"
                  rules={[FormValidation.required('Please select a vehicle type')]}
                >
                  <Select
                    placeholder="Select"
                    loading={isLoadingTypes}
                    options={(typesData || []).map((type: VehicleType) => ({
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

      {/* Contact Selection Drawer */}
      <ContactSelectionDrawer
        open={contactListDrawerVisible}
        onClose={closeContactListDrawer}
        onSelect={handleContactSelected}
        onAddContactClick={showCreateContactDrawer}
        contacts={contactsData?.data}
        isLoading={isLoadingContacts}
      />

      {/* Create Contact Drawer */}
      <CreateContactDrawer
        open={createContactDrawerVisible}
        onClose={closeCreateContactDrawer}
        onSuccess={handleContactCreated}
      />
    </div>
  );
};

export default ClientInformationStep; 