import React from 'react';
import { Input as AntInput } from 'antd';
import styled from '@emotion/styled';
import { InputProps as AntInputProps } from 'antd/es/input';
import { colors, spacing, fontSizes } from '../../../theme/tokens';

/**
 * Extended Input Props that include our custom properties
 */
export interface InputProps extends AntInputProps {
  /** Optional fullWidth prop to make input take 100% of container width */
  fullWidth?: boolean;
}

/**
 * Base styled input component that extends Ant Design's Input
 */
const StyledInput = styled(AntInput)<InputProps>`
  &.ant-input {
    border-radius: ${spacing.xs};
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    
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
      fullWidth={fullWidth}
      {...props}
    />
  );
};

/**
 * Password input variant
 */
export const Password = styled(AntInput.Password)<InputProps>`
  &.ant-input-password {
    border-radius: ${spacing.xs};
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }
`;

/**
 * Text area variant
 */
export const TextArea = styled(AntInput.TextArea)<InputProps>`
  &.ant-input {
    border-radius: ${spacing.xs};
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }
`;

export default {
  Input,
  Password,
  TextArea
}; 