import React from 'react';
import { Input as AntInput } from 'antd';
import styled from '@emotion/styled';
import { InputProps as AntInputProps } from 'antd/es/input';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea';
import { colors, spacing, fontSizes, borderRadius } from '../../../theme/tokens';

/**
 * Extended Input Props that include our custom properties
 */
export interface InputProps extends AntInputProps {
  /** Optional fullWidth prop to make input take 100% of container width */
  fullWidth?: boolean;
}

/**
 * Extended TextArea Props 
 */
export interface TextAreaProps extends AntTextAreaProps {
  /** Optional fullWidth prop to make input take 100% of container width */
  fullWidth?: boolean;
}

interface StyledInputProps {
  $fullWidth?: boolean;
}

/**
 * Base styled input component that extends Ant Design's Input
 */
const StyledInput = styled(AntInput, {
  shouldForwardProp: (prop) => prop !== '$fullWidth'
})<StyledInputProps>`
  &.ant-input {
    border-radius: ${borderRadius.lg};
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }
`;

/**
 * Input component with additional props
 */
export const Input: React.FC<InputProps> = ({ 
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledInput 
      $fullWidth={fullWidth}
      {...props}
    />
  );
};

/**
 * Password input component
 */
const StyledPassword = styled(AntInput.Password, {
  shouldForwardProp: (prop) => prop !== '$fullWidth'
})<StyledInputProps>`
  &.ant-input-password {
    border-radius: ${borderRadius.lg};
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }
`;

export const Password: React.FC<InputProps> = ({ 
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledPassword
      $fullWidth={fullWidth}
      {...props}
    />
  );
};

/**
 * TextArea component
 */
const StyledTextArea = styled(AntInput.TextArea, {
  shouldForwardProp: (prop) => prop !== '$fullWidth'
})<StyledInputProps>`
  &.ant-input {
    border-radius: ${borderRadius.lg};
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }
`;

export const TextArea: React.FC<TextAreaProps> = ({ 
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledTextArea
      $fullWidth={fullWidth}
      {...props as any} // Type cast để tránh lỗi TypeScript
    />
  );
};

export default {
  Input,
  Password,
  TextArea
}; 