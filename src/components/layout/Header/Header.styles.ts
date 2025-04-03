import styled from '@emotion/styled';
import { Layout } from 'antd';
import { colors, spacing, fontSizes, shadows } from '../../../theme/tokens';
import { Button } from '@/components/common/Button';
const { Header: AntHeader } = Layout;

export const StyledHeader = styled(AntHeader)`
  display: flex;
  align-items: center;
  gap: ${parseInt(spacing.xs) * 3}px;
  padding: 0 ${spacing.md};
  background-color: ${colors.headerBackground};
  box-shadow: none;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const BackButton = styled(Button)` 
`; 