import React from 'react';
import { Card as AntCard } from 'antd';
import styled from '@emotion/styled';
import { CardProps as AntCardProps } from 'antd/es/card';
import { colors, spacing, borderRadius } from '../../../theme/tokens';

export type CardCustomVariant = 'default' | 'primary' | 'secondary' | 'inline';

export interface CardProps extends Omit<AntCardProps, 'variant'> {
  fullwidth?: boolean;
  variant?: CardCustomVariant;
}

interface StyledCardProps {
  $fullwidth?: boolean;
  $variant: CardCustomVariant;
}

const StyledCard = styled(AntCard, {
  shouldForwardProp: (prop) => prop !== '$variant' && prop !== '$fullwidth'
})<StyledCardProps>`
  &.ant-card {
    background-color: #18181B;
    border-radius: 12px;
    border-color: ${colors.borderColor};
    transition: all 0.3s ease;
    
    .ant-card-head {
      background-color: #18181B;
      border-bottom-color: ${colors.borderColor};
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      padding: 16px;
      
      .ant-card-head-title {
        color: ${colors.textPrimary};
        font-weight: 500;
      }
      
      .ant-card-extra {
        color: ${colors.textPrimary};
      }
    }
    
    .ant-card-body {
      padding: 16px;
    }
    
    ${props => props.$fullwidth && `
      width: 100%;
    `}
    
    /* Variant styles */
    ${props => props.$variant === 'inline' && `
      background-color: transparent;
      border: 1px solid ${colors.borderColor};
      .ant-card-head {
        background-color: transparent;
        border-bottom: 1px solid ${colors.borderColor};
        .ant-card-head-title {
          font-style: italic;
        }
      } 
    `}
  }
`;

export const CardComponent: React.FC<CardProps> = ({
  children,
  fullwidth = false,
  variant = 'default',
  ...props
}) => {
  return (
    <StyledCard
      $fullwidth={fullwidth}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export const Card = CardComponent as React.FC<CardProps> & {
  Grid: typeof AntCard.Grid;
  Meta: typeof AntCard.Meta;
};

Card.Grid = AntCard.Grid;
Card.Meta = AntCard.Meta;

export default {
  Card
}; 