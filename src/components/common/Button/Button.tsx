import React from 'react';
import { Button as AntButton } from 'antd';
import styled from '@emotion/styled';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { colors, spacing } from '../../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'text' | 'danger';

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: 'small' | 'middle' | 'large';
}

interface StyledButtonProps {
  fullWidth?: boolean;
}

const StyledButton = styled(AntButton, {
  shouldForwardProp: (prop) => prop !== 'fullWidth'
})<StyledButtonProps>`
  &.ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${spacing.xs};
    font-weight: 500;
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    transition: all 0.2s ease-in-out;
    
    &:hover, &:focus {
      color: ${colors.primary};
      border-color: ${colors.primary};
    }

    .anticon + span {
      margin-left: 8px;
    }
  }
`;

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

const StyledBackButton = styled(StyledIconButton)`
  &.ant-btn {
    background-color: #212226;
    color: ${colors.textPrimary};
    margin-right: ${parseInt(spacing.xs) * 3}px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'middle',
  ...props
}) => {
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

export const IconButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return <StyledIconButton {...props} />;
};

export const BackButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return <StyledBackButton {...props} />;
};

export default {
  Button,
  IconButton,
  BackButton
}; 