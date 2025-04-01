import styled from '@emotion/styled';
import { Layout } from 'antd';
import { colors, spacing } from '../../../theme/tokens';

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const MainLayout = styled(Layout, {
  shouldForwardProp: (prop) => prop !== 'sidebarWidth'
})<{ sidebarWidth: number }>`
  margin-left: ${props => props.sidebarWidth}px;
  transition: margin-left 0.2s;
  background: rgb(24,48,83);
  background: linear-gradient(180deg, rgba(24,48,83,1) 0%, rgba(15,15,15,1) 30%);
`;

export const StyledContent = styled(Content)`
  margin: ${spacing.md};
  padding: ${spacing.lg};
  background: transparent;
  border-radius: ${spacing.xs};
  overflow: auto;
  min-height: calc(100vh - 64px - ${spacing.md} * 2);
`; 