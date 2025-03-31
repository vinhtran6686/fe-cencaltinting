import styled from '@emotion/styled';
import { Layout, Button } from 'antd';
import { colors, spacing, fontSizes } from '../../../theme/tokens';

const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
 
  .ant-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 0px;
    background-color: transparent;
    border-right: none !important;
  }

  .ant-menu-item {
    display: flex; 
    align-items: center;
    padding: 8px 16px !important;
    gap: 8px;
    height: 40px !important;
    line-height: 24px !important;
    margin: 4px 0 !important;  
    width: 100% !important;
    border-radius: 0 !important;
  }
 
  .ant-menu-item span {
    color: #C6C8D2 !important;  
    margin-left: 0 !important;
  }
 
  .ant-menu-item-selected {
    background-color: ${colors.menuActiveBg} !important;
    color: ${colors.menuActive} !important;
    border-right: 6px solid ${colors.menuActive} !important;
    font-weight: 500 !important;
 
    .custom-icon {
      filter: brightness(0) saturate(100%) invert(42%) sepia(87%) saturate(2259%) hue-rotate(200deg) brightness(99%) contrast(93%);
    }
 
    span {
      color: ${colors.menuActive} !important;
      font-weight: 500 !important;
    }
  }
 
  .ant-menu-item:hover:not(.ant-menu-item-selected) {
    background-color: rgba(255, 255, 255, 0.1) !important;
    span {
      color: #FFFFFF !important;
    }
  }
`;

export const LogoContainer = styled.div<{ collapsed: boolean }>`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md};
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MenuWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
   
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: ${spacing.xs};
  }
`;

// Custom icon component for menu items
export const CustomIcon = styled.div<{ iconName: string }>`
  width: 20px;
  height: 20px;
  background-image: url(${props => `/images/icons/sidebar/${props.iconName}.svg`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
`;

// Collapse toggle button
export const CollapseButton = styled.div<{ collapsed: boolean }>`
  display: flex;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-end'};
  padding: ${spacing.sm};
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

export const UserProfileContainer = styled.div<{ collapsed: boolean }>`
  padding: ${props => props.collapsed ? `${spacing.sm} ${spacing.xs}` : spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const UserInfo = styled.div`
  margin-left: ${spacing.md};
`;

export const UserName = styled.div`
  color: ${colors.bgPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserRole = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: ${fontSizes.xs};
`; 