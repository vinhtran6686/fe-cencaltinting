import React, { useCallback } from 'react';
import { Form } from '@/components/common/Form';
import { Input, TextArea } from '@/components/common/Input';
import { CustomDrawer } from '@/components/common/Drawer';
import { Paragraph } from '@/components/common/Typography';
import { CreateContactPayload } from '@/modules/appointments/services/contactsService';
import { useContactValidation, useCreateContact } from '@/modules/appointments/hooks';
import { useNotification } from '@/components/providers/NotificationProvider';
import { FormInstance } from 'antd';

interface CreateContactDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (newContactId: string) => void;
}

const CreateContactDrawer: React.FC<CreateContactDrawerProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const contactValidation = useContactValidation();
  const notification = useNotification();
  
  // Create contact mutation
  const { mutate: createContact, isPending: isCreatingContact } = useCreateContact();

  // Custom validator to ensure additional phone is different from phone
  const validateDifferentPhone = useCallback((_: any, value: string) => {
    if (!value) return Promise.resolve();

    const mainPhone = form.getFieldValue('contactPhone');
    if (value === mainPhone) {
      return Promise.reject('Additional phone must be different from primary phone');
    }

    return Promise.resolve();
  }, [form]);

  // Handle create contact submission
  const handleCreateContactSubmit = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

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
          // Close the drawer
          onClose();

          // Invoke success callback
          onSuccess(newContact._id);

          // Show success notification
          notification.showSuccess(
            'Contact Created',
            `${newContact.name} has been added to your contacts.`
          );

          // Reset form
          form.resetFields();
        },
      });
    } catch (error) {
      // Validation error handled by the form - errors will be displayed automatically
    }
  };

  // Reset form when drawer opens
  const handleOpen = useCallback(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  // Reset form when drawer closes
  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [onClose, form]);

  // Call handleOpen when the open prop changes
  React.useEffect(() => {
    handleOpen();
  }, [open, handleOpen]);

  return (
    <CustomDrawer
      title="Add Contact"
      open={open}
      onClose={handleClose}
      onSave={handleCreateContactSubmit}
      width={400}
      cancelText="Cancel"
      saveText={isCreatingContact ? "Saving..." : "Save"}
      disableSave={isCreatingContact} // Only disable during API call
    >
      <Paragraph>All fields are required except Note.</Paragraph>
      <Form
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Name"
          name="contactName"
          rules={contactValidation.nameRules}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="contactEmail"
          rules={contactValidation.emailRules}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="contactPhone"
          rules={contactValidation.phoneRules}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          label="Additional Phone Number"
          name="contactAdditionalPhone"
          rules={[
            ...contactValidation.additionalPhoneRules.slice(0, 2), // Use the first two rules (required, phoneInternational)
            { validator: validateDifferentPhone } // Add custom validator directly
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          label="Note"
          name="contactNote"
          rules={contactValidation.noteRules}
        >
          <TextArea placeholder="Enter" rows={1} style={{ minHeight: 40 }} />
        </Form.Item>
      </Form>
    </CustomDrawer>
  );
};

export default CreateContactDrawer; 