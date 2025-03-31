import styled from '@emotion/styled';
import { Layout, Button, Avatar } from 'antd';
import { colors, spacing, fontSizes } from '../../../theme/tokens';

const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  border-right: 1px solid ${colors.borderColor};
 
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
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.collapsed ? `${spacing.sm} ${spacing.md}` : `${parseInt(spacing.xs) * 3}px ${spacing.md}`};
  cursor: pointer;
  border-bottom: 1px solid ${colors.borderColor};
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
export const StyledButton = styled(Button)` 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  
  &.ant-btn {
    color: rgba(255, 255, 255, 0.65);
    background-color: transparent;
    border: none;
    
    &:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const ButtonIcon = styled.div<{ collapsed?: boolean }>`
  width: 20px;
  height: 20px;
  background-image: url('/images/icons/sidebar/collapse.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  filter: brightness(0) saturate(100%) invert(78%) sepia(8%) saturate(188%) hue-rotate(191deg) brightness(93%) contrast(87%);
  transform: ${props => props.collapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
  
  &:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
  }
`;

export const ButtonContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-end'};
  position: absolute;
  top: 0;
  right: ${props => props.collapsed ? parseInt(spacing.xs) * 3 : spacing.sm};
  transform: translateY(-50%);
`;

export const UserProfileContainer = styled.div<{ collapsed: boolean }>`
  height: 64px; 
  padding: 0 ${spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center; 
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  width: 100%;
`;


export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: 100%;
  gap: ${spacing.sm};
  border-radius: ${spacing.md};
  background-color: ${colors.borderColor};
`;

export const StyledAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

export const UserInfo = styled.div` 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserName = styled.div`
  color: ${colors.textPrimary};
  font-weight: 500;
  font-size: ${fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: ${parseInt(spacing.xs) * 3}px;
`;
 