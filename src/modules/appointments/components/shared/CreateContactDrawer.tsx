import React, { useCallback, useMemo } from 'react';
import { Form, FormItem } from '@/components/common/Form';
import { Input, TextArea } from '@/components/common/Input';
import { CustomDrawer } from '@/components/common/Drawer';
import { Paragraph } from '@/components/common/Typography';
import { CreateContactPayload } from '@/modules/appointments/services/contactsService';
import { useContactValidation, useCreateContact } from '@/modules/appointments/hooks';
import { useNotification } from '@/components/providers/NotificationProvider';
import { FormInstance } from 'antd';
import { Rule } from 'antd/es/form';

interface CreateContactDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (newContactId: string) => void;
  isContactListOpen?: boolean;
  zIndex?: number;
}

interface ContactFormProps {
  form: FormInstance;
  handleFinish: (values: any) => void;
  contactValidation: {
    nameRules: Rule[];
    emailRules: Rule[];
    phoneRules: Rule[];
    additionalPhoneRules: Rule[];
    noteRules: Rule[];
    [key: string]: any;
  };
}

const initialFormState = {
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactAdditionalPhone: '',
  contactNote: ''
};

// Form component được tách riêng để tránh re-render không cần thiết
const ContactForm: React.FC<ContactFormProps> = React.memo(({ form, handleFinish, contactValidation }) => {
  // Custom validator to ensure additional phone is different from phone
  const validateDifferentPhone = useCallback((_: any, value: string) => {
    if (!value) return Promise.resolve();

    const mainPhone = form.getFieldValue('contactPhone');
    if (value === mainPhone) {
      return Promise.reject('Additional phone must be different from primary phone');
    }

    return Promise.resolve();
  }, [form]);

  // Memoize form rules
  const additionalPhoneRules = useMemo(() => [
    ...contactValidation.additionalPhoneRules.slice(0, 2),
    { validator: validateDifferentPhone }
  ], [contactValidation.additionalPhoneRules, validateDifferentPhone]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      initialValues={initialFormState}
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
        rules={additionalPhoneRules}
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
  );
});

const CreateContactDrawer: React.FC<CreateContactDrawerProps> = ({
  open,
  onClose,
  onSuccess,
  isContactListOpen = false,
  zIndex = 1001,
}) => {
  const [form] = Form.useForm();
  const contactValidation = useContactValidation();
  const notification = useNotification();
  
  const { mutate: createContact, isPending: isCreatingContact } = useCreateContact();

  // Form submission handler
  const handleFinish = useCallback((values: any) => {
    // Transform form data to match API payload
    const payload: CreateContactPayload = {
      name: values.contactName,
      email: values.contactEmail,
      phone: values.contactPhone,
      additionalInformation: values.contactAdditionalPhone,
      notes: values.contactNote,
    };

    // Call the create contact API with refreshOnSuccess flag
    createContact({
      data: payload,
      options: { 
        showSuccessNotification: false,
        refreshOnSuccess: isContactListOpen 
      }
    }, {
      onSuccess: (newContact) => {
        form.resetFields();
        onClose();
        onSuccess(newContact._id);
        notification.showSuccess(
          'Contact Created',
          `${newContact.name} has been added to your contacts.`
        );
      },
    });
  }, [createContact, form, notification, onClose, onSuccess, isContactListOpen]);

  // Trigger form submit from drawer save button
  const handleCreateContactSubmit = useCallback(() => {
    const formValues = form.getFieldsValue();
    form.validateFields()
      .then(values => {
        handleFinish(values);
      })
      .catch(errorInfo => {
        console.log("Validation failed:", errorInfo);
      });
  }, [form, handleFinish]);

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
      disableSave={isCreatingContact}
      zIndex={zIndex}
    >
      <Paragraph>All fields are required except Note.</Paragraph>
      <ContactForm 
        form={form} 
        handleFinish={handleFinish} 
        contactValidation={contactValidation}
      />
    </CustomDrawer>
  );
};

export default React.memo(CreateContactDrawer); 