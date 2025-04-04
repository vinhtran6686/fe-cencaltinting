"use client"

import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { Select as AntSelect, Empty } from 'antd'; 
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { SelectProps as AntSelectProps } from 'antd/es/select';
import { colors, spacing, borderRadius, shadows } from '../../../theme/tokens';
import { Input } from '@/components/common/Input';
import Image from 'next/image';

export interface SelectProps extends Omit<AntSelectProps<any>, 'dropdownRender'> {
  fullWidth?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  placeholder?: string;
}

interface StyledSelectProps {
  $fullWidth?: boolean;
}

// Global styles to override Ant Design dropdown
const GlobalSelectStyles = () => (
  <Global
    styles={css`
      .ant-select-dropdown {
        padding: 12px !important;
        border: 1px solid ${colors.borderColor} !important;
        background-color: ${colors.bgTertiary} !important;
        border-radius: ${borderRadius.lg} !important;
        box-shadow: ${shadows.md} !important;
      }
      
      .ant-select-item {
        padding: 8px !important;
      }
      
      .ant-select-item-option-active {
        background-color: ${colors.formItemBackground} !important;
      }
      
      .ant-select-item-option-selected {
        background-color: ${colors.primary}20 !important;
      }
    `}
  />
);

// Styled Components
const StyledSelect = styled(AntSelect, {
  shouldForwardProp: (prop) => prop !== '$fullWidth'
})<StyledSelectProps>`
  &.ant-select {
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    display: flex;
    height: 100%;
    align-items: center;
    .ant-select-selector {
      background-color: ${colors.formItemBackground} !important;
      border-color: ${colors.borderColor} !important;
      border-radius: ${borderRadius.lg} !important;
      padding: 0 ${spacing.md} !important;
      min-height: 48px !important;
      display: flex;
      align-items: center;
      
      .ant-select-selection-search {
        display: flex;
        align-items: center;
      }
      
      .ant-select-selection-search-input,
      .ant-select-selection-item {
        display: flex;
        align-items: center;
        color: ${colors.textPrimary};
      }
      
      .ant-select-selection-placeholder {
        color: ${colors.placeholder} !important; 
        display: flex;
        align-items: center;
        opacity: 1 !important;
      }
    }
    
    &:hover .ant-select-selector {
      border-color: ${colors.primary} !important;
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: ${colors.primary} !important;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
    }
    
    .ant-select-arrow {
      color: ${colors.textPrimary};
    }
  }
`;

const DropdownContainer = styled.div`
`;

const SearchContainer = styled.div` 
  position: sticky;
  top: 0;
  z-index: 1; 
`;

const StyledSearchInput = styled(Input)`
  background-color: ${colors.formItemBackground};
  height:52px;
  border-color: ${colors.formItemBackground};
  border-radius: ${borderRadius.xl};
  display: flex;
  gap:10px;
  padding: 0 ${spacing.md};
  margin-bottom: ${spacing.sm};
  &::before {
    content: none;
  }
  &::placeholder {
    color: ${colors.placeholder};
    font-style: italic;
  } 
`;

const OptionsContainer = styled.div`
  background-color: ${colors.bgTertiary};

  & .rc-virtual-list-scrollbar-thumb {
    background-color: ${colors.scrollbarThumb} !important;
  }
`;

const EmptyContainer = styled.div`
  padding: ${spacing.md};
`;

// Custom arrow icon
const ArrowIcon = () => (
  <Image
    src="/images/icons/sidebar/right.svg"
    alt="arrow"
    width={20}
    height={20}
  />
);

const SearchIcon = () => (
  <Image
    src="/images/icons/sidebar/search-lg.svg"
    alt="search"
    width={20}
    height={20}
  />
);

// Main Component
export const SelectComponent = forwardRef<any, SelectProps>(({
  fullWidth = true,
  searchable = true,
  searchPlaceholder = "Search",
  emptyText = "No options found",
  children,
  options,
  placeholder,
  value,
  onChange,
  ...props
}, ref) => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state after component has mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Reset search value when dropdown closes
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchValue('');
    }
  }, [dropdownOpen]);

  // Filter options based on search value
  const filteredOptions = useMemo(() => {
    if (!searchValue || !options) return options;

    return options.filter(option => {
      const label = typeof option.label === 'string' ? option.label : '';
      return label.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [options, searchValue]);

  // Custom dropdown renderer
  const customDropdownRender = (menu: React.ReactNode) => {
    return (
      <DropdownContainer>
        {searchable && (
          <SearchContainer>
            <StyledSearchInput
              // Only add autoFocus when component has mounted on client
              {...(mounted && dropdownOpen ? { autoFocus: true } : {})}
              prefix={<SearchIcon />}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.stopPropagation()} // Prevent select keydown handlers
            />
          </SearchContainer>
        )}
        <OptionsContainer>
          {filteredOptions && filteredOptions.length > 0 ? (
            menu
          ) : (
            <EmptyContainer>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={emptyText}
                style={{ color: colors.textSecondary }}
              />
            </EmptyContainer>
          )}
        </OptionsContainer>
      </DropdownContainer>
    );
  };

  // Filter out custom props to prevent React warnings
  // Only include standard Ant Design Select props
  const selectProps = { 
    className: "custom-select",
    dropdownRender: customDropdownRender,
    options: filteredOptions || options,
    placeholder,
    value,
    onChange,
    ref,
    suffixIcon: <ArrowIcon />,
    onDropdownVisibleChange: (open: boolean) => {
      setDropdownOpen(open);
    },
    ...props
  };

  return (
    <>
      <GlobalSelectStyles />
      <StyledSelect
        $fullWidth={fullWidth}
        {...selectProps}
      >
        {children}
      </StyledSelect>
    </>
  );
});

// Change static properties to handle the forwarded ref properly
export const Select = SelectComponent as unknown as React.FC<SelectProps> & {
  Option: typeof AntSelect.Option;
  OptGroup: typeof AntSelect.OptGroup;
};

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default {
  Select
}; 