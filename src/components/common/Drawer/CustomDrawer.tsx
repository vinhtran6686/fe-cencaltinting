import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import { colors } from '@/theme/tokens';

export interface CustomDrawerProps extends Omit<React.ComponentProps<typeof AntDrawer>, 'onClose'> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  cancelText?: string;
  saveText?: string;
  width?: number | string;
  disableSave?: boolean;
}

const StyledDrawer = styled(AntDrawer)`
  background-color: ${colors.bgTertiary} !important;
  color: ${colors.textPrimary} !important;
  & .ant-drawer-header { 
      border-bottom: none !important; 
      padding-bottom: 16px;
      & .ant-drawer-title {
        font-weight: 700 !important;
        font-size: 20px !important;
      }
  }
  & .ant-drawer-body {
    padding: 0 24px;
    .ant-typography {
      color: ${colors.menuText} !important;
    }
  } 

  & .ant-drawer-footer { 
      border-top: none;
      padding: 16px 24px 40px;
      display: flex;
      justify-content: space-between;
      gap: 12px; 
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

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  title,
  children,
  open = false,
  onClose,
  onSave,
  cancelText = 'Cancel',
  saveText = 'Save',
  width = 400,
  disableSave = false,
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
      <Button
        onClick={onClose}
        color="default"
        variant="outlined"
        size='large'
        style={{
          height: 48,
        }}
      >
        {cancelText}
      </Button>
      <Button
        onClick={handleSave}
        variant="text"
        size='large'
        style={{
          height: 48,
        }}
        disabled={disableSave || saveText.includes('Saving...')}
        loading={saveText.includes('Saving...')}
      >
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