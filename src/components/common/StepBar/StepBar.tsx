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

const StyledSteps = styled(Steps) <StyledStepsProps>`
  &.ant-steps {
    .ant-steps-item-title {
      font-size: 14px !important;
      line-height: 22px !important;
      color: ${colors.grayscale500} !important;
    }

    .ant-steps-item-description {
      font-weight: 700 !important;
      font-size: 16px !important;
      line-height: 24px !important;
      color: ${colors.white} !important;
      padding-bottom: 36px !important;
    }
    .ant-steps-item{ 
      &-icon{
        position: relative; 
        background: none;
        border-width: 2px;
        border-color: ${colors.white200};
        span{
          display: none;
        }
      }
      &-active{ 
        border-width: 4px;
        .ant-steps-item-icon{
          position: relative; 
          border-width: 2px;
          border-color: ${colors.primary};
          &:before{
            content: '';
            width: 16px !important;
            height: 16px !important;
            border-radius: 50%;
            background: ${colors.primary};
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          } 
        }
      }
      &-finish{
        .ant-steps-item-icon{
          border-color: ${colors.primary};
          background: ${colors.primary};
          span{
            display: inline-block;
            color: ${colors.white};
          }
        }
      }
    } 
    .ant-steps-item-tail{
      height: calc(100% - 32px) !important;
      top: 32px !important;
      padding: 0 !important;
      background: ${colors.white200} !important;
    }
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