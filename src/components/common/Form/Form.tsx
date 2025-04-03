import React, { useMemo, useState } from 'react';
import { Form as AntForm } from 'antd';
import styled from '@emotion/styled';
import { FormProps as AntFormProps, FormInstance, FormListProps, FormListOperation } from 'antd/es/form';
import { colors, spacing, borderRadius, shadows } from '../../../theme/tokens';

type AntRequiredMark = AntFormProps['requiredMark'];

export interface FormProps extends Omit<AntFormProps, 'size' | 'requiredMark'> {
  size?: 'small' | 'middle' | 'large';
  fullWidth?: boolean;
  enhancedValidation?: boolean;
  requiredMark?: boolean | 'optional';
  layout?: 'horizontal' | 'vertical' | 'inline';
  itemBackground?: string;
}

interface FormInterface extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormInstance>> {
  Item: typeof AntForm.Item;
  List: typeof AntForm.List;
  ErrorList: typeof AntForm.ErrorList;
  Provider: typeof AntForm.Provider;
  useForm: typeof AntForm.useForm;
  useFormInstance: typeof AntForm.useFormInstance;
  useWatch: typeof AntForm.useWatch;
}

interface StyledFormProps {
  fullWidth?: boolean;
  $itemBackground?: string;
}

const StyledForm = styled(AntForm) <StyledFormProps>`
  &.ant-form {
    .ant-form-item { 
      ${props => props.$itemBackground && `
        background-color: ${props.$itemBackground};
        padding: ${spacing.md};
        border-radius: ${borderRadius.lg};
      `}
      .ant-form-item-required {
        display: flex;
        gap: ${spacing.xs};
        & > div{
          order: 0;
        }
        &:before{
          order: 1;
          margin-top: -4px;
        }
        &:after{
          display: none;
        }
      }
    }

    .ant-form-item-label {
      padding-bottom: ${spacing.xs} !important;
      
      > label {
        color: ${colors.textPrimary};
        font-weight: 500;
        line-height: 1.5;
      }
    }
    
    .ant-form-item-explain-error {
      color: ${colors.error};
      font-size: 0.85em;
      margin-top: ${spacing.xs};
    }
    
    /* Add consistent input styling */
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-select-selector,
    .ant-picker,
    .ant-input-number,
    .ant-cascader-picker {
      background-color: ${colors.borderColor};
      border-color: ${colors.borderColor};
      
      &:hover, &:focus {
        border-color: ${colors.primary};
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.35);
        font-style: italic;
      }
    }
    
    ${props => props.fullWidth && `
      .ant-form-item-control-input {
        width: 100%;
        
        .ant-input, 
        .ant-select, 
        .ant-picker, 
        .ant-input-number,
        .ant-cascader-picker,
        .ant-input-affix-wrapper {
          width: 100%;
        }
      }
    `}
  }
`;

const StyledEnhancedForm = styled(StyledForm)`
  &.ant-form {
    .ant-form-item {
      &.ant-form-item-has-error {
        background-color: rgba(255, 77, 79, 0.05);
        border-radius: ${borderRadius.md};
        padding: ${spacing.sm};
        margin-left: -${spacing.sm};
        margin-right: -${spacing.sm};
        
        .ant-form-item-label > label {
          color: ${colors.error};
        }
      }
    }
  }
`;

export const FormComponent = React.forwardRef<FormInstance, FormProps>(({
  children,
  fullWidth = true,
  size = 'middle',
  enhancedValidation = false,
  requiredMark = true,
  layout = 'vertical',
  itemBackground,
  ...props
}, ref) => {
  const [form] = AntForm.useForm();
  const formInstance = ref ? undefined : form;

  const antRequiredMark = useMemo((): AntRequiredMark => {
    if (requiredMark === true) return true;
    if (requiredMark === false) return false;
    if (requiredMark === 'optional') return 'optional';
    return true;
  }, [requiredMark]);

  const StyledComponent = enhancedValidation ? StyledEnhancedForm : StyledForm;

  return (
    <StyledComponent
      form={formInstance}
      ref={ref}
      size={size}
      fullWidth={fullWidth}
      requiredMark={antRequiredMark}
      layout={layout}
      $itemBackground={itemBackground}
      {...props}
    >
      {children as any}
    </StyledComponent>
  );
});

export const Form = FormComponent as FormInterface;

Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;
Form.useForm = AntForm.useForm;
Form.useFormInstance = AntForm.useFormInstance;
Form.useWatch = AntForm.useWatch;

export default {
  Form
}; 