import React from 'react';
import { Typography } from 'antd';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, fontSizes, spacing } from '../../../theme/tokens';

const { Title, Text, Paragraph } = Typography;

const commonTypographyStyles = css`
  margin: 0;
  padding: 0;
`;

export const StyledTitle = styled(Title)`
  ${commonTypographyStyles}
  
  &.ant-typography {
    color: ${colors.textPrimary};
  }
`;

export const StyledText = styled(Text)`
  ${commonTypographyStyles}
  
  &.ant-typography {
    font-size: ${fontSizes.md};
  }
`;

export const StyledParagraph = styled(Paragraph)`
  ${commonTypographyStyles}
  
  &.ant-typography {
    margin-bottom: ${spacing.md};
  }
`;

interface HeaderTitleProps {
  withoutBackButton?: boolean;
}

export const HeaderTitle = styled(StyledTitle, {
  shouldForwardProp: (prop) => prop !== 'withoutBackButton'
})<HeaderTitleProps>`
  &.ant-typography {
    font-size: ${fontSizes.md};
    font-weight: 600;
    margin-left: ${(props) => props.withoutBackButton ? '0' : 12};
    flex-grow: 1;
    line-height: 1.2;
    margin-bottom: 0;
  }
`;

export default {
  Title: StyledTitle,
  Text: StyledText,
  Paragraph: StyledParagraph,
  HeaderTitle
}; 