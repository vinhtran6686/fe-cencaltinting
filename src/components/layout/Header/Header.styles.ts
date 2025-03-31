import styled from '@emotion/styled';
import { Layout } from 'antd';
import { colors, spacing, fontSizes, shadows } from '../../../theme/tokens';

const { Header: AntHeader } = Layout;

export const StyledHeader = styled(AntHeader)`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.md};
  background-color: transparent;
  box-shadow: none;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${spacing.xs};
  transition: all 0.3s;
  color: ${colors.textPrimary};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: ${spacing.xs};
  }
`; 