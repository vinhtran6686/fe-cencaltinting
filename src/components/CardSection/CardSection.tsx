import React, { useState } from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { CardProps } from 'antd/es/card';
import { colors, spacing } from '../../theme/tokens';

export interface CardSectionProps extends Omit<CardProps, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

interface StyledDescriptionProps {
  hasTitle: boolean;
}

const StyledCard = styled(Card)`
  &.ant-card {
    border-radius: ${spacing.xs};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    margin-bottom: ${spacing.md};
    
    .ant-card-head {
      border-bottom: ${props => props.children ? `1px solid ${colors.borderLight}` : 'none'};
      padding: ${spacing.sm} ${spacing.md};
      min-height: auto;
    }
    
    .ant-card-head-title {
      padding: ${spacing.xs} 0;
      font-weight: 600;
    }
    
    .ant-card-head-wrapper {
      align-items: flex-start;
    }
    
    .ant-card-extra {
      padding: ${spacing.xs} 0;
    }
    
    .ant-card-body {
      padding: ${spacing.md};
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const Description = styled.div<StyledDescriptionProps>`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-top: ${props => props.hasTitle ? spacing.xs : '0'};
`;

const CollapsibleIcon = styled.span`
  cursor: pointer;
  margin-left: ${spacing.xs};
  color: ${colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  children,
  extra,
  collapsible = false,
  defaultCollapsed = false,
  className,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  const handleToggleCollapse = () => {
    setCollapsed(prev => !prev);
  };
  
  const renderTitle = () => {
    if (!title && !description) return null;
    
    return (
      <TitleContainer>
        <div>
          {title && <div>{title}</div>}
          {description && (
            <Description hasTitle={!!title}>
              {description}
            </Description>
          )}
        </div>
        {collapsible && (
          <CollapsibleIcon onClick={handleToggleCollapse}>
            {collapsed ? <DownOutlined /> : <UpOutlined />}
          </CollapsibleIcon>
        )}
      </TitleContainer>
    );
  };
  
  return (
    <StyledCard
      title={renderTitle()}
      extra={extra}
      className={className}
      {...props}
    >
      {!collapsed && children}
    </StyledCard>
  );
};

export default CardSection; 