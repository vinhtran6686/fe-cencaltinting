import React from 'react';
import { Button as AntButton } from 'antd';
import styled from '@emotion/styled';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { colors, spacing } from '../../../theme/tokens';

/**
 * Our custom variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'text' | 'danger';

/**
 * Extended Button Props that include our custom properties
 */
export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  /** Button variant defines the visual style */
  variant?: ButtonVariant;
  /** Optional fullWidth prop to make button take 100% of container width */
  fullWidth?: boolean;
  /** Size of the button */
  size?: 'small' | 'middle' | 'large';
}

/**
 * Props for our styled components
 */
interface StyledButtonProps {
  fullWidth?: boolean;
}

/**
 * Base styled button component that extends Ant Design's Button
 */
const StyledButton = styled(AntButton)<StyledButtonProps>`
  /* Common button styles */
  &.ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${spacing.xs};
    font-weight: 500;
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    transition: all 0.2s ease-in-out;
    
    /* Hover and focus states */
    &:hover, &:focus {
      color: ${colors.primary};
      border-color: ${colors.primary};
    }

    /* When button has icon, add some space between icon and text */
    .anticon + span {
      margin-left: 8px;
    }
  }
`;

/**
 * Icon-only button variant
 */
const StyledIconButton = styled(StyledButton)`
  &.ant-btn {
    min-width: 32px;
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 16px;
    background-color: transparent;
    border: none;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

/**
 * Back button specific styling
 */
const StyledBackButton = styled(StyledIconButton)`
  &.ant-btn {
    color: ${colors.textPrimary};
    margin-right: ${spacing.sm};
  }
`;

/**
 * Button component with variant support and additional props
 */
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  fullWidth = false,
  size = 'middle',
  ...props 
}) => {
  // Map our variants to Ant Design props
  const getButtonProps = () => {
    switch (variant) {
      case 'primary':
        return { type: 'primary' as const };
      case 'secondary':
        return { type: 'default' as const };
      case 'ghost':
        return { ghost: true };
      case 'link':
        return { type: 'link' as const };
      case 'text':
        return { type: 'text' as const };
      case 'danger':
        return { danger: true };
      default:
        return { type: 'primary' as const };
    }
  };

  return (
    <StyledButton 
      {...getButtonProps()} 
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

/**
 * Icon button component for buttons that primarily display an icon
 */
export const IconButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return <StyledIconButton {...props} />;
};

/**
 * Back button component for navigation
 */
export const BackButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return <StyledBackButton {...props} />;
};

export default {
  Button,
  IconButton,
  BackButton
}; 