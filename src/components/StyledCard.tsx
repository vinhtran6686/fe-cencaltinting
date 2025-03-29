import React from 'react';
import { Card, Typography, theme } from 'antd';
import styled from '@emotion/styled';

const { Title } = Typography;
const { useToken } = theme;

interface ThemeProps {
  borderRadius: number;
  colorPrimary: string;
  colorTextBase: string;
}

// Styled Card component using theme tokens
const StyledCardWrapper = styled(Card)<{ $isDark?: boolean; theme: ThemeProps }>`
  border-radius: ${(props) => props.theme.borderRadius * 2}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-head {
    background-color: ${(props) => props.$isDark ? props.theme.colorPrimary : 'transparent'};
    color: ${(props) => props.$isDark ? '#fff' : props.theme.colorTextBase};
    border-top-left-radius: ${(props) => props.theme.borderRadius * 2}px;
    border-top-right-radius: ${(props) => props.theme.borderRadius * 2}px;
  }
`;

interface StyledCardProps {
  title: string;
  isDark?: boolean;
  children: React.ReactNode;
}

const StyledCard: React.FC<StyledCardProps> = ({ 
  title, 
  isDark = false, 
  children 
}) => {
  const { token } = useToken();
  
  return (
    <StyledCardWrapper
      title={title}
      theme={token as ThemeProps}
      $isDark={isDark}
    >
      {children}
    </StyledCardWrapper>
  );
};

export default StyledCard; 