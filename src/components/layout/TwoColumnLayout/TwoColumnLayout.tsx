import React from 'react';
import styled from '@emotion/styled';
import { spacing } from '../../../theme/tokens';
import { breakpoints } from '../../../theme/breakpoints';

export interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: string | number;
  rightWidth?: string | number;
  sticky?: 'left' | 'right' | 'none';
  gap?: number | string;
  className?: string;
}

interface StyledContainerProps {
  gap: string;
}

interface StyledColumnProps {
  width: string | number;
  isSticky: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${props => props.gap};

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;

const StyledColumn = styled.div<StyledColumnProps>`
  width: 100%;
  ${props => props.isSticky ? `
    position: sticky;
    top: 24px;
    height: fit-content;
  ` : ''}

  @media (min-width: ${breakpoints.md}) {
    width: ${props => typeof props.width === 'number' ? `${props.width}px` : props.width};
  }
`;

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftContent,
  rightContent,
  leftWidth = '60%',
  rightWidth = '40%',
  sticky = 'right',
  gap = spacing.md,
  className,
}) => {
  const formattedGap = typeof gap === 'number' ? `${gap}px` : gap;
  
  return (
    <StyledContainer gap={formattedGap} className={className}>
      <StyledColumn 
        width={leftWidth} 
        isSticky={sticky === 'left'}
      >
        {leftContent}
      </StyledColumn>
      <StyledColumn 
        width={rightWidth} 
        isSticky={sticky === 'right'}
      >
        {rightContent}
      </StyledColumn>
    </StyledContainer>
  );
};

export default TwoColumnLayout; 