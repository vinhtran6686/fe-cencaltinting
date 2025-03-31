import styled from '@emotion/styled';
import { Layout } from 'antd';
import { colors, spacing } from '../../../theme/tokens';

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const MainLayout = styled(Layout)<{ sidebarWidth: number }>`
  margin-left: ${props => props.sidebarWidth}px;
  transition: margin-left 0.2s;
  background: linear-gradient(to bottom, #183053 0px, #183053 200px, #0F0F0F 200px, #0F0F0F 100%);
`;

export const StyledContent = styled(Content)`
  margin: ${spacing.md};
  padding: ${spacing.lg};
  background: transparent;
  border-radius: ${spacing.xs};
  overflow: auto;
  min-height: calc(100vh - 64px - ${spacing.md} * 2);
`; 