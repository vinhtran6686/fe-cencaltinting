import React from 'react';
import { Modal as AntModal } from 'antd';
import styled from '@emotion/styled';
import { ModalProps as AntModalProps } from 'antd/es/modal';
import { colors, spacing, shadows } from '../../../theme/tokens';

/**
 * Extended Modal Props that include our custom properties
 */
export interface ModalProps extends AntModalProps {
  /** Size variant of modal */
  size?: 'small' | 'medium' | 'large';
}

// Define width based on size
const getModalWidth = (size?: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return '400px';
    case 'medium':
      return '600px';
    case 'large':
      return '800px';
    default:
      return '520px';
  }
};

/**
 * Base styled modal component that extends Ant Design's Modal
 */
const StyledModal = styled(AntModal)<ModalProps>`
  .ant-modal-content {
    border-radius: ${spacing.md};
    box-shadow: ${shadows.lg};
    overflow: hidden;
  }
  
  .ant-modal-header {
    border-bottom: 1px solid ${colors.borderColor};
    margin-bottom: ${spacing.md};
  }
  
  .ant-modal-title {
    font-weight: 600;
  }
  
  .ant-modal-footer {
    border-top: 1px solid ${colors.borderColor};
    padding: ${spacing.md};
  }
`;

/**
 * Modal component with additional props
 */
export const Modal: React.FC<ModalProps> = ({ 
  size = 'medium',
  width,
  children,
  ...props 
}) => {
  // Calculate width based on size if no explicit width provided
  const computedWidth = width || getModalWidth(size);
  
  return (
    <StyledModal 
      width={computedWidth}
      {...props}
    >
      {children}
    </StyledModal>
  );
};

export default Modal; 