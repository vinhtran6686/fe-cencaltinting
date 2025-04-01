import React from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '../../theme/tokens';

export type StatusType = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface StatusPillProps {
  label: string;
  value: string;
  type?: StatusType;
  icon?: React.ReactNode;
  className?: string;
}

interface PillContainerProps {
  type: StatusType;
}

const getTypeColor = (type: StatusType) => {
  switch (type) {
    case 'success': return colors.success;
    case 'warning': return colors.warning;
    case 'error': return colors.error;
    case 'info': return colors.info;
    default: return colors.primary;
  }
};

const PillContainer = styled.div<PillContainerProps>`
  display: inline-flex;
  align-items: center;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 20px;
  background-color: ${props => `${getTypeColor(props.type)}10`};
  border: 1px solid ${props => `${getTypeColor(props.type)}20`};
  color: ${props => getTypeColor(props.type)};
  font-size: 14px;
  font-weight: 500;
  max-width: 100%;
`;

const IconWrapper = styled.span`
  margin-right: ${spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  margin-right: ${spacing.xs};
  font-weight: 600;
`;

const Value = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  value,
  type = 'default',
  icon,
  className,
}) => {
  return (
    <PillContainer type={type} className={className}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Label>{label}:</Label>
      <Value>{value}</Value>
    </PillContainer>
  );
};

export default StatusPill; 