import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from '../Button';

export interface CustomDrawerProps extends Omit<React.ComponentProps<typeof AntDrawer>, 'onClose'> {
  /**
   * Title of the drawer
   */
  title?: React.ReactNode;
  /**
   * Drawer content
   */
  children?: React.ReactNode;
  /**
   * Whether the drawer is visible
   */
  open?: boolean;
  /**
   * Called when drawer is closed
   */
  onClose?: () => void;
  /**
   * Called when Save button is clicked
   */
  onSave?: () => void;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Save button text
   */
  saveText?: string;
  /**
   * Width of the drawer
   */
  width?: number | string;
}

const StyledDrawer = styled(AntDrawer)`
  &.ant-drawer {
    .ant-drawer-mask {
      backdrop-filter: blur(2px);
    }
    
    .ant-drawer-content-wrapper {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
    
    .ant-drawer-content {
      background-color: rgba(15, 15, 15, 0.95);
      color: #fff;
    }
    
    .ant-drawer-header {
      background-color: rgba(15, 15, 15, 0.95);
      padding: 16px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      .ant-drawer-title {
        color: #fff;
      }
    }
    
    .ant-drawer-body {
      padding: 24px;
    }
    
    .ant-drawer-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      background-color: rgba(15, 15, 15, 0.95);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  z-index: 10;
  
  &:hover {
    color: rgba(255, 255, 255, 0.85);
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

/**
 * CustomDrawer component extends Ant Design's Drawer with project-specific styling and functionality
 */
export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  title,
  children,
  open = false,
  onClose,
  onSave,
  cancelText = 'Cancel',
  saveText = 'Save',
  width = 400,
  ...props
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    if (onClose) {
      onClose();
    }
  };

  const footer = (
    <>
      <Button onClick={onClose} variant="secondary">
        {cancelText}
      </Button>
      <Button onClick={handleSave} variant="primary">
        {saveText}
      </Button>
    </>
  );

  return (
    <StyledDrawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
      closeIcon={null}
      maskClosable={true}
      footer={footer}
      {...props}
    >
      <CloseButton onClick={onClose}>
        <CloseOutlined />
      </CloseButton>
      {children}
    </StyledDrawer>
  );
}; 