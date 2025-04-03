import React from 'react';
import { Button as AntButton } from 'antd';
import styled from '@emotion/styled';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { colors } from '../../../theme/tokens';

export type CustomButtonVariant = 'primary' | 'outline';

export interface ButtonProps extends AntButtonProps {
  customVariant?: CustomButtonVariant;
}

const StyledButton = styled(AntButton)`
  &.ant-btn {
    &:hover, &:focus {
      color: ${colors.primary};
      border-color: ${colors.primary};
    }

    &.ant-btn-variant-outlined {
      color: ${colors.primary};
      border-color: ${colors.primary};
      background: transparent;

      &:hover, &:focus {
        color: ${colors.primary};
        border-color: ${colors.primary};
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  customVariant = 'primary',
  ...props
}) => {
  const getButtonProps = () => {
    switch (customVariant) {
      case 'outline':
        return { type: 'default' as const, className: 'ant-btn-outline' };
      default:
        return { type: 'primary' as const };
    }
  };

  return (
    <StyledButton
      {...getButtonProps()}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default { Button };

