import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import type { CheckboxProps as AntCheckboxProps } from 'antd/es/checkbox';
import styled from '@emotion/styled';
import { colors, spacing, borderRadius } from '@/theme/tokens';

export interface CheckboxProps extends AntCheckboxProps {}

const StyledCheckbox = styled(AntCheckbox)`
  &.ant-checkbox-wrapper {
    color: ${colors.textPrimary};
    font-size: 14px;
    align-items: center;
    
    .ant-checkbox {
      top: 0;
      
      .ant-checkbox-inner {
        background-color: transparent;
        border-color: ${colors.grayscale500};
        border-width: 2px;  
        border-radius: ${borderRadius.sm};
        width: 18px;
        height: 18px;
        
        &:after {
          border-color: ${colors.white};
        }
      }
      
      &.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${colors.primary};
          border-color: ${colors.primary};
        }
      }
      
      &:hover .ant-checkbox-inner, 
      &.ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: ${colors.primary};
      }
    }
    
    &:hover .ant-checkbox-inner {
      border-color: ${colors.primary};
    }
    
    // Disabled state
    &.ant-checkbox-wrapper-disabled {
      cursor: not-allowed;
      
      .ant-checkbox-inner {
        background-color: transparent;
        border-color: ${colors.grayscale500};
        opacity: 0.5;
      }
      
      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${colors.primary};
        opacity: 0.5;
      }
      
      span {
        color: ${colors.textPrimary};
        opacity: 0.5;
      }
    }
    
    // Spacing
    & + & {
      margin-left: ${spacing.md};
    }
    
    // Fix alignment
    display: flex;
    align-items: center;
  }
`;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox; 