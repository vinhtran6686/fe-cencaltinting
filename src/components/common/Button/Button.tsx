import React from 'react';
import { Button as AntButton } from 'antd';
import styled from '@emotion/styled';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { colors } from '../../../theme/tokens';

export interface ButtonProps extends AntButtonProps { }

const StyledButton = styled(AntButton)`
  &.ant-btn {
    &:hover, &:focus {
      color: ${colors.primary};
      border-color: ${colors.primary};
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default { Button };

