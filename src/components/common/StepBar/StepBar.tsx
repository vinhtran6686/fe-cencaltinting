import React from 'react';
import { Steps } from 'antd';
import styled from '@emotion/styled';
import { StepsProps as AntStepsProps } from 'antd/es/steps';
import { colors, spacing } from '../../../theme/tokens';
import { breakpoints } from '../../../theme/breakpoints';

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepBarProps extends Omit<AntStepsProps, 'items'> {
  steps: StepItem[];
  orientation?: 'horizontal' | 'vertical';
  fixedToSide?: boolean;
  className?: string;
}

interface StyledStepsProps {
  fixedToSide?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const StyledStepsContainer = styled.div<StyledStepsProps>`
  ${props => props.fixedToSide && props.orientation === 'vertical' ? `
    position: sticky;
    top: 24px;
    height: fit-content;
  ` : ''}
  
  @media (max-width: ${breakpoints.md}) {
    ${props => props.orientation === 'vertical' ? `
      margin-bottom: ${spacing.md};
    ` : ''}
  }
`;

const StyledSteps = styled(Steps)<StyledStepsProps>`
  &.ant-steps {
    .ant-steps-item-title {
      font-weight: 500;
    }

    .ant-steps-item-description {
      max-width: none;
    }
    
    .ant-steps-item-active .ant-steps-item-icon {
      background-color: ${colors.primary};
      border-color: ${colors.primary};
    }
    
    .ant-steps-item-finish .ant-steps-item-icon {
      background-color: white;
      border-color: ${colors.primary};
      
      .ant-steps-icon {
        color: ${colors.primary};
      }
    }
    
    .ant-steps-item-finish .ant-steps-item-tail::after {
      background-color: ${colors.primary};
    }
    
    ${props => props.orientation === 'vertical' ? `
      padding: ${spacing.md};
      border: 1px solid ${colors.borderLight};
      border-radius: ${spacing.xs};
      background-color: white;
      
      .ant-steps-item {
        margin-bottom: ${spacing.sm};
      }
    ` : ''}
  }
`;

export const StepBar: React.FC<StepBarProps> = ({
  steps,
  orientation = 'horizontal',
  fixedToSide = false,
  current = 0,
  className,
  ...props
}) => {
  const items = steps.map((step, index) => ({
    key: index.toString(),
    title: step.title,
    description: step.description,
    icon: step.icon,
  }));

  return (
    <StyledStepsContainer 
      fixedToSide={fixedToSide} 
      orientation={orientation}
      className={className}
    >
      <StyledSteps
        direction={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
        current={current}
        items={items}
        {...props}
      />
    </StyledStepsContainer>
  );
};

export default StepBar; 