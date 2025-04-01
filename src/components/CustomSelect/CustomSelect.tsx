import React from 'react';
import { Select as AntSelect } from 'antd';
import styled from '@emotion/styled';
import { SelectProps as AntSelectProps } from 'antd/es/select';
import { colors, spacing } from '../../theme/tokens';

export interface CustomSelectProps<ValueType = any> extends Omit<AntSelectProps<ValueType>, 'bordered'> {
  fullWidth?: boolean;
  searchPlaceholder?: string;
  selectStyle?: React.CSSProperties;
}

interface StyledSelectProps {
  fullWidth?: boolean;
}

function styledSelect<ValueType = any>() {
  return styled(AntSelect<ValueType>, {
    shouldForwardProp: (prop) => prop !== 'fullWidth' && prop !== 'selectStyle'
  })<StyledSelectProps>`
    &.ant-select {
      width: ${props => props.fullWidth ? '100%' : 'auto'};
      
      .ant-select-selector {
        border-radius: ${spacing.xs};
        transition: all 0.2s;
      }

      &.ant-select-focused .ant-select-selector {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 2px rgba(81, 147, 246, 0.2);
      }
      
      .ant-select-selection-search-input {
        height: 100%;
      }
      
      .ant-select-arrow {
        transition: transform 0.2s;
      }
      
      &.ant-select-open .ant-select-arrow {
        transform: rotate(180deg);
      }
    }
  `;
}

export const CustomSelect = <ValueType extends any = any>({
  fullWidth = false,
  searchPlaceholder,
  style,
  selectStyle,
  filterOption = true,
  showSearch = true,
  children,
  ...props
}: CustomSelectProps<ValueType>) => {
  const defaultFilterOption = (input: string, option: any) => {
    if (!option?.label && !option?.children) return false;
    const optionText = option.label || option.children;
    return optionText.toLowerCase().includes(input.toLowerCase());
  };
  
  const filterFunc = typeof filterOption === 'function' 
    ? filterOption 
    : filterOption 
      ? defaultFilterOption 
      : undefined;

  const Select = styledSelect<ValueType>();

  return (
    <Select
      showSearch={showSearch}
      filterOption={filterFunc}
      fullWidth={fullWidth}
      placeholder={props.placeholder || "Select an option"}
      style={{ ...style, ...selectStyle }}
      {...props}
    >
      {children}
    </Select>
  );
};

export default CustomSelect; 