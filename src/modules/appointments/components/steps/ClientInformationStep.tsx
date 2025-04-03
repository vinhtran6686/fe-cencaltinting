import React, { useState, useEffect } from 'react';
import { Space, Divider, Row, Col, Spin, Flex } from 'antd';
import { Typography as AntTypography } from 'antd';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Form, FormItem } from '@/components/common/Form';
import { Input, TextArea } from '@/components/common/Input';
import { CustomDrawer } from '@/components/common/Drawer';
import { Title, Paragraph, Text } from '@/components/common/Typography';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useContacts,
  useVehicleYears,
  useVehicleMakes,
  useVehicleModels,
  useVehicleTypes,
  useCreateContact,
  useContactValidation
} from '@/modules/appointments/hooks';
import { ContactResponse, CreateContactPayload } from '@/modules/appointments/services/contactsService';
import { VehicleMake, VehicleModel, VehicleType, VehicleYear } from '@/modules/appointments/services/vehiclesService';
import { colors, spacing } from '@/theme/tokens';
import { Select } from '@/components/common/Select';
import FormValidation from '@/components/common/Form/FormValidation';
import { useNotification } from '@/components/providers/NotificationProvider';

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
  const [contactForm] = Form.useForm();
  const [isManualEntry, setIsManualEntry] = useState(formData.vehicleDetails?.isCustomEntry || false);
  const [createContactDrawerVisible, setCreateContactDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactResponse | null>(null);

  // Get contact validation rules
  const contactValidation = useContactValidation();

  // Get notification service
  const notification = useNotification();

  // Fetch contacts
  const { data: contactsData, isLoading: isLoadingContacts } = useContacts({ limit: 100 });

  // Create contact mutation
  const { mutate: createContact, isPending: isCreatingContact } = useCreateContact();

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

  // Custom validator to ensure additional phone is different from phone
  const validateDifferentPhone = (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const mainPhone = contactForm.getFieldValue('contactPhone');
    if (value === mainPhone) {
      return Promise.reject('Additional phone must be different from primary phone');
    }

    return Promise.resolve();
  };

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
    contactForm.resetFields();
  };

  const closeCreateContactDrawer = () => {
    setCreateContactDrawerVisible(false);
  };

  // Handle create contact submission
  const handleCreateContactSubmit = async () => {
    try {
      // Validate form fields
      const values = await contactForm.validateFields();

      // Transform form data to match API payload
      const payload: CreateContactPayload = {
        name: values.contactName,
        email: values.contactEmail,
        phone: values.contactPhone,
        additionalInformation: values.contactAdditionalPhone,
        notes: values.contactNote,
      };

      // Call the create contact API with disabled automatic notifications
      createContact({
        data: payload,
        options: { showSuccessNotification: false }
      }, {
        onSuccess: (newContact) => {
          // Select the newly created contact
          form.setFieldsValue({ contactId: newContact._id });
          setSelectedContact(newContact);

          // Close the drawer
          closeCreateContactDrawer();

          // Show success notification
          notification.showSuccess(
            'Contact Created',
            `${newContact.name} has been added to your contacts.`
          );
        },
      });
    } catch (error) {
      // Validation error handled by the form - errors will be displayed automatically
    }
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
            <Flex vertical gap={spacing.sm}>
              <Title level={5} style={{ margin: '0' }}>Contact <span style={{ color: 'red' }}>*</span></Title>
              <FormItem name="contactId" hidden>
                  <Input />
                </FormItem>
              <Space size="small">
                <Text style={{ fontWeight: 'bold', width: '64px', color: colors.descriptionText, whiteSpace: 'nowrap' }}>Client</Text>
                <Space size="small" style={{ flex: 1, flexWrap: 'wrap' }}>
                  <Text ellipsis={{ tooltip: true }} style={{ maxWidth: '100%' }}>{selectedContact.name} </Text>
                  <Divider type="vertical" style={{ margin: '0 4px', height: '24px' }}/>
                  <Text> {selectedContact.phone} </Text>
                  <Divider type="vertical" style={{ margin: '0 4px', height: '24px' }}  />
                  <Text> {selectedContact.email} </Text>
                </Space>
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={handleRemoveContact}
                  style={{
                  }}
                />
              </Space>
            </Flex>
          ) : (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
              <FormItem
                name="contactId"
                label="Contact"
                rules={contactValidation.contactSelectionRules}
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
                      rules={[FormValidation.required('Please select a make')]}
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
                  rules={[FormValidation.required('Please select a model')]}
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
                  rules={[FormValidation.required('Please select a vehicle type')]}
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
        title="Add Contact"
        open={createContactDrawerVisible}
        onClose={closeCreateContactDrawer}
        onSave={handleCreateContactSubmit}
        width={400}
        cancelText="Cancel"
        saveText={isCreatingContact ? "Saving..." : "Save"}
        disableSave={isCreatingContact} // Only disable during API call
      >
        <Paragraph>All fields are required except Note.</Paragraph>
        <Form
          layout="vertical"
          form={contactForm}
        >
          <FormItem
            label="Name"
            name="contactName"
            rules={contactValidation.nameRules}
          >
            <Input placeholder="Name" />
          </FormItem>
          <FormItem
            label="Email"
            name="contactEmail"
            rules={contactValidation.emailRules}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem
            label="Phone Number"
            name="contactPhone"
            rules={contactValidation.phoneRules}
          >
            <Input placeholder="Phone Number" />
          </FormItem>
          <FormItem
            label="Additional Phone Number"
            name="contactAdditionalPhone"
            rules={[
              ...contactValidation.additionalPhoneRules.slice(0, 2), // Use the first two rules (required, phoneInternational)
              { validator: validateDifferentPhone } // Add custom validator directly
            ]}
          >
            <Input placeholder="Phone Number" />
          </FormItem>
          <FormItem
            label="Note"
            name="contactNote"
            rules={contactValidation.noteRules}
          >
            <TextArea placeholder="Enter" rows={1} style={{ minHeight: 40 }} />
          </FormItem>
        </Form>
      </CustomDrawer>
    </div>
  );
};

export default ClientInformationStep; 