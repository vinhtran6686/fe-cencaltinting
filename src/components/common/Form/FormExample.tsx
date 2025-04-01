import React from 'react';
import { Form, FormItem, FormList, FormValidation } from './index';
import { Input, Button, DatePicker, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  gender: string;
  addresses: Array<{
    street: string;
    city: string;
    zipCode: string;
  }>;
  notes: string;
}

/**
 * Example component demonstrating custom Form usage
 */
export const FormExample: React.FC = () => {
  const [form] = Form.useForm<UserFormData>();
  
  const handleSubmit = (values: UserFormData) => {
    console.log('Form values:', values);
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      enhancedValidation
      initialValues={{
        addresses: [{ street: '', city: '', zipCode: '' }],
      }}
    >
      <h2>Personal Information</h2>
      
      <FormItem
        name="fullName"
        label="Full Name"
        required
        rules={[FormValidation.required('Please enter your full name')]}
        helpTooltip="Enter your legal full name as it appears on official documents"
      >
        <Input placeholder="Enter your full name" />
      </FormItem>
      
      <FormItem
        name="email"
        label="Email Address"
        required
        rules={[
          FormValidation.required('Email is required'),
          FormValidation.email(),
        ]}
        labelExtra={<InfoCircleOutlined />}
      >
        <Input placeholder="Enter your email" />
      </FormItem>
      
      <FormItem
        name="phone"
        label="Phone Number"
        rules={[FormValidation.phone()]}
      >
        <Input placeholder="Enter your phone number" />
      </FormItem>
      
      <FormItem
        name="birthDate"
        label="Date of Birth"
      >
        <DatePicker style={{ width: '100%' }} />
      </FormItem>
      
      <FormItem
        name="gender"
        label="Gender"
      >
        <Select placeholder="Select gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </FormItem>
      
      <h2>Security</h2>
      
      <FormItem
        name="password"
        label="Password"
        required
        rules={[
          FormValidation.required('Password is required'),
          FormValidation.password(),
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </FormItem>
      
      <FormItem
        name="confirmPassword"
        label="Confirm Password"
        required
        rules={[
          FormValidation.required('Please confirm your password'),
          FormValidation.match('password', 'Passwords do not match'),
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </FormItem>
      
      <h2>Addresses</h2>
      
      <FormList
        name="addresses"
        addButtonText="Add New Address"
        itemStyle="card"
        minItems={1}
        maxItems={3}
      >
        {(fields, { add, remove }, { errors }) => (
          fields.map((field: any) => (
            <React.Fragment key={field.key}>
              <FormItem
                {...field}
                name={[field.name, 'street']}
                label="Street Address"
                required
                rules={[FormValidation.required()]}
              >
                <Input placeholder="Enter street address" />
              </FormItem>
              
              <FormItem
                {...field}
                name={[field.name, 'city']}
                label="City"
                required
                rules={[FormValidation.required()]}
              >
                <Input placeholder="Enter city" />
              </FormItem>
              
              <FormItem
                {...field}
                name={[field.name, 'zipCode']}
                label="ZIP Code"
                required
                rules={[
                  FormValidation.required(),
                  FormValidation.custom((value) => {
                    if (!/^\d{5}(-\d{4})?$/.test(value)) {
                      throw new Error('Please enter a valid ZIP code');
                    }
                  }),
                ]}
              >
                <Input placeholder="Enter ZIP code" />
              </FormItem>
            </React.Fragment>
          ))
        )}
      </FormList>
      
      <FormItem
        name="notes"
        label="Additional Notes"
        showCount
        maxCount={500}
      >
        <Input.TextArea 
          placeholder="Any additional information" 
          rows={4}
        />
      </FormItem>
      
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button 
          style={{ marginLeft: 8 }} 
          onClick={() => form.resetFields()}
        >
          Reset
        </Button>
      </FormItem>
    </Form>
  );
};

export default FormExample; 