import React, { useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Space, Tooltip } from 'antd';
import { colors, spacing } from '../../theme/tokens';
import { CustomSelect } from '../CustomSelect';
import { CustomSelectProps } from '../CustomSelect';

export interface Contact {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  additionalInformation?: string;
  notes?: string;
}

export interface ContactSelectProps extends Omit<CustomSelectProps, 'options' | 'value' | 'onChange'> {
  contacts: Contact[];
  value?: string | number;
  onChange?: (value: string | number, option: any) => void;
  onCreateContact?: () => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

const CreateButton = styled(Button)`
  margin-left: ${spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ContactSelect: React.FC<ContactSelectProps> = ({
  contacts,
  value,
  onChange,
  onCreateContact,
  loading = false,
  placeholder = 'Select a contact',
  className,
  ...props
}) => {
  const options = contacts.map(contact => ({
    label: (
      <Space>
        <UserOutlined />
        <span>{contact.name}</span>
        <span style={{ color: colors.textSecondary }}>({contact.phone})</span>
      </Space>
    ),
    value: contact.id,
    contact: contact,
  }));
  
  const handleChange = (value: any, option: any) => {
    onChange?.(value, option);
  };
  
  const handleCreateClick = () => {
    onCreateContact?.();
  };
  
  return (
    <SelectContainer className={className}>
      <CustomSelect
        options={options}
        value={value}
        onChange={handleChange}
        loading={loading}
        fullWidth
        showSearch
        placeholder={placeholder}
        filterOption={(input, option) => {
          const contact = option?.contact as Contact;
          if (!contact) return false;
          
          return (
            contact.name.toLowerCase().includes(input.toLowerCase()) ||
            contact.phone.toLowerCase().includes(input.toLowerCase()) ||
            contact.email.toLowerCase().includes(input.toLowerCase())
          );
        }}
        {...props}
      />
      
      {onCreateContact && (
        <Tooltip title="Create new contact">
          <CreateButton 
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
          />
        </Tooltip>
      )}
    </SelectContainer>
  );
};

export default ContactSelect; 