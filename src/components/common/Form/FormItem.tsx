import React from 'react';
import { Form } from 'antd';
import styled from '@emotion/styled';
import { FormItemProps as AntFormItemProps } from 'antd/es/form';
import { colors, spacing, borderRadius } from '../../../theme/tokens';

export interface FormItemProps extends AntFormItemProps {
  helpTooltip?: string;
  requiredMarkStyle?: 'default' | 'text';
  labelExtra?: React.ReactNode;
  showCount?: boolean;
  maxCount?: number;
}

interface StyledFormItemProps {
  showCount?: boolean;
  currentCount?: number;
  maxCount?: number;
}

const StyledFormItem = styled(Form.Item)<StyledFormItemProps>`
  &.ant-form-item {
    position: relative;
    
    .ant-form-item-label {
      display: flex;
      align-items: center;
      
      .label-extra {
        margin-left: ${spacing.xs};
      }
    }
    
    .required-text {
      color: ${colors.error};
      margin-left: ${spacing.xs};
      font-size: 0.85em;
    }
    
    ${props => props.showCount && `
      .character-counter {
        position: absolute;
        right: 0;
        bottom: -18px;
        font-size: 0.8em;
        color: ${props.currentCount && props.maxCount && props.currentCount > props.maxCount
          ? colors.error
          : 'rgba(255, 255, 255, 0.45)'};
      }
    `}
    
    &.ant-form-item-has-error {
      .ant-input,
      .ant-input-affix-wrapper,
      .ant-select-selector,
      .ant-picker,
      .ant-input-number,
      .ant-cascader-picker {
        border-color: ${colors.error};
        
        &:focus, &:hover {
          border-color: ${colors.error};
          box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
        }
      }
    }
    
    &.ant-form-item-has-success {
      .ant-input,
      .ant-input-affix-wrapper,
      .ant-select-selector,
      .ant-picker,
      .ant-input-number,
      .ant-cascader-picker {
        border-color: ${colors.success};
        
        &:focus, &:hover {
          border-color: ${colors.success};
          box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
        }
      }
    }
  }
`;

export const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  required,
  helpTooltip,
  requiredMarkStyle = 'default',
  labelExtra,
  showCount,
  maxCount,
  ...props
}) => {
  const [count, setCount] = React.useState(0);
  
  const customLabel = React.useMemo(() => {
    if (!label) return undefined;
    
    const requiredText = required && requiredMarkStyle === 'text' ? (
      <span className="required-text">(Required)</span>
    ) : null;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{label}</span>
        {requiredText}
        {labelExtra && <span className="label-extra">{labelExtra}</span>}
      </div>
    );
  }, [label, required, requiredMarkStyle, labelExtra]);
  
  const helpContent = React.useMemo(() => {
    if (!helpTooltip) return props.help;
    return (
      <span className="help-tooltip">
        {props.help}
      </span>
    );
  }, [helpTooltip, props.help]);
  
  return (
    <StyledFormItem
      label={customLabel || label}
      required={requiredMarkStyle === 'default' ? required : false}
      help={helpContent}
      showCount={showCount}
      currentCount={count}
      maxCount={maxCount}
      {...props}
    >
      {children as React.ReactNode}
      {showCount && (
        <div className="character-counter">
          {count}/{maxCount || 'unlimited'}
        </div>
      )}
    </StyledFormItem>
  );
};

export default FormItem; 