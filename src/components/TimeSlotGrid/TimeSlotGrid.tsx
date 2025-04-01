import React from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '../../theme/tokens';
import { ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  unavailableReason?: string;
}

export interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSlotSelect?: (time: string) => void;
  columns?: number;
  className?: string;
}

interface GridContainerProps {
  columns: number;
}

const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

interface SlotItemProps {
  isAvailable: boolean;
  isSelected: boolean;
}

const SlotItem = styled.div<SlotItemProps>`
  padding: ${spacing.sm};
  border-radius: ${spacing.xs};
  text-align: center;
  font-weight: 500;
  cursor: ${props => props.isAvailable ? 'pointer' : 'not-allowed'};
  transition: all 0.2s;
  border: 1px solid ${props => 
    props.isSelected 
      ? colors.primary 
      : props.isAvailable 
        ? colors.borderLight 
        : colors.borderLight};
  background-color: ${props => 
    props.isSelected 
      ? `${colors.primary}10` 
      : props.isAvailable 
        ? 'white' 
        : `${colors.backgroundLight}`};
  color: ${props => 
    props.isAvailable 
      ? props.isSelected ? colors.primary : colors.textPrimary 
      : colors.textSecondary};
  opacity: ${props => props.isAvailable ? 1 : 0.7};
  
  &:hover {
    ${props => props.isAvailable && !props.isSelected && `
      border-color: ${colors.primary};
      background-color: ${colors.backgroundHover};
    `}
  }
  
  .time-icon {
    margin-right: ${spacing.xs};
    font-size: 12px;
    color: ${props => props.isAvailable ? colors.primary : colors.textSecondary};
  }
  
  .unavailable-icon {
    margin-right: ${spacing.xs};
    font-size: 12px;
    color: ${colors.error};
  }
`;

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  slots,
  selectedSlot,
  onSlotSelect,
  columns = 4,
  className,
}) => {
  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.isAvailable) {
      onSlotSelect?.(slot.time);
    }
  };
  
  return (
    <GridContainer columns={columns} className={className}>
      {slots.map((slot, index) => {
        const isSelected = selectedSlot === slot.time;
        
        const slotContent = (
          <SlotItem
            key={index}
            isAvailable={slot.isAvailable}
            isSelected={isSelected}
            onClick={() => handleSlotClick(slot)}
          >
            {slot.isAvailable ? (
              <ClockCircleOutlined className="time-icon" />
            ) : (
              <CloseCircleOutlined className="unavailable-icon" />
            )}
            {slot.time}
          </SlotItem>
        );
        
        if (!slot.isAvailable && slot.unavailableReason) {
          return (
            <Tooltip title={slot.unavailableReason} key={index}>
              {slotContent}
            </Tooltip>
          );
        }
        
        return slotContent;
      })}
    </GridContainer>
  );
};

export default TimeSlotGrid; 