import React from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { FormListProps as AntFormListProps, FormListFieldData, FormListOperation } from 'antd/es/form';
import { colors, spacing, borderRadius } from '../../../theme/tokens';

type FormListChildrenFn = (
  fields: FormListFieldData[],
  operation: FormListOperation,
  meta: { errors: React.ReactNode[] }
) => React.ReactNode;

export interface FormListProps extends Omit<AntFormListProps, 'children'> {
  children: FormListChildrenFn;
  addButtonText?: string;
  addButton?: React.ReactNode;
  removeButton?: React.ReactNode;
  itemStyle?: 'default' | 'card' | 'divider';
  maxItems?: number;
  minItems?: number;
  onItemsChange?: (count: number) => void;
}

const StyledFormListWrapper = styled.div`
  .form-list-item {
    position: relative;
    margin-bottom: ${spacing.md};
    
    &.card-style {
      background-color: rgba(47, 50, 62, 0.5);
      border-radius: ${borderRadius.md};
      padding: ${spacing.md};
      border: 1px solid ${colors.borderColor};
    }
    
    &.divider-style {
      padding-bottom: ${spacing.md};
      border-bottom: 1px solid ${colors.borderColor};
    }
    
    .remove-button {
      position: absolute;
      top: ${spacing.xs};
      right: ${spacing.xs};
      z-index: 1;
    }
  }
  
  .form-list-add {
    margin-top: ${spacing.sm};
  }
  
  .items-limit-message {
    color: ${colors.textSecondary};
    font-size: 0.9em;
    margin-top: ${spacing.xs};
  }
`;

export const FormList: React.FC<FormListProps> = ({
  children,
  name,
  addButtonText = 'Add Item',
  addButton,
  removeButton,
  itemStyle = 'default',
  maxItems,
  minItems = 0,
  onItemsChange,
  ...props
}) => {
  return (
    <StyledFormListWrapper>
      <Form.List name={name} {...props}>
        {(fields, operation, { errors }) => {
          React.useEffect(() => {
            onItemsChange?.(fields.length);
          }, [fields.length]);
          
          return (
            <React.Fragment>
              {fields.map((field, index) => {
                const isRemovable = fields.length > minItems;
                
                const getClassName = () => {
                  let className = 'form-list-item';
                  if (itemStyle === 'card') className += ' card-style';
                  if (itemStyle === 'divider') className += ' divider-style';
                  return className;
                };
                
                return (
                  <div key={field.key} className={getClassName()}>
                    {isRemovable && (
                      <div className="remove-button">
                        {removeButton || (
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => operation.remove(field.name)}
                            size="small"
                          />
                        )}
                      </div>
                    )}
                    
                    {typeof children === 'function' && children(fields, operation, { errors })}
                  </div>
                );
              })}
              
              {(!maxItems || fields.length < maxItems) && (
                <div className="form-list-add">
                  {addButton || (
                    <Button 
                      type="dashed" 
                      onClick={() => operation.add()} 
                      icon={<PlusOutlined />}
                    >
                      {addButtonText}
                    </Button>
                  )}
                </div>
              )}
              
              {maxItems && fields.length >= maxItems && (
                <div className="items-limit-message">
                  Maximum number of items reached ({maxItems})
                </div>
              )}
              
              <Form.ErrorList errors={errors} />
            </React.Fragment>
          );
        }}
      </Form.List>
    </StyledFormListWrapper>
  );
};

export default FormList; 