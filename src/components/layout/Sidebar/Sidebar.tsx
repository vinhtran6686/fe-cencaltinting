import React from 'react'
import { Menu, Avatar, Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../../store'
import { dummyUser } from '../../../store/slices/authSlice'
import { toggleSidebar } from '../../../store/slices/appSlice'
import {
  StyledSider,
  LogoContainer,
  MenuWrapper,
  UserProfileContainer,
  UserInfo,
  UserName,
  UserRole,
  CustomIcon,
  CollapseButton
} from './Sidebar.styles'

interface SidebarProps {
  collapsed?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const router = useRouter()
  const user = useAppSelector(state => state.auth.user) || dummyUser
  const dispatch = useAppDispatch()
  
  // Determine the selected key based on the current path
  const selectedKey = router.pathname.split('/')[1] || 'dashboard'
  
  const handleToggleCollapse = () => {
    dispatch(toggleSidebar())
  }
  
  const menuItems = [
    {
      key: 'proposal',
      icon: <CustomIcon iconName="proposals" className="custom-icon" />,
      label: <span>Proposals</span>,
    },
    {
      key: 'services',
      icon: <CustomIcon iconName="services" className="custom-icon" />,
      label: <span>Services</span>,
    },
    {
      key: 'vehicleRules',
      icon: <CustomIcon iconName="vehicles" className="custom-icon" />,
      label: <span>Vehicle Rules</span>,
    },    
    {
      key: 'appointments',
      icon: <CustomIcon iconName="appointments" className="custom-icon" />,
      label: <span>Appointments</span>,
    },
    {
      key: 'inventory',
      icon: <CustomIcon iconName="inventory" className="custom-icon" />,
      label: <span>Inventory</span>,
    },
    {
      key: 'contact',
      icon: <CustomIcon iconName="contacts" className="custom-icon" />,
      label: <span>Contacts</span>,
    },
    {
      key: 'transactions',
      icon: <CustomIcon iconName="transactions" className="custom-icon" />,
      label: <span>Transactions</span>,
    },
    {
      key: 'invoice',
      icon: <CustomIcon iconName="invoices" className="custom-icon" />,
      label: <span>Invoices</span>,
    }
  ]
  
  return (
    <StyledSider 
      theme="dark" 
      collapsible 
      collapsed={collapsed}
      trigger={null}
      width={240}
      collapsedWidth={80}
      style={{ zIndex: 1000 }}
    >
      <Link href="/">
        <LogoContainer collapsed={collapsed}>
          {collapsed ? (
            <img 
              src="/images/logo-small.png" 
              alt="CT" 
              style={{ maxWidth: '40px', maxHeight: '40px' }} 
            />
          ) : (
            <img 
              src="/images/logo.png" 
              alt="CenCal Tinting Logo" 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
            />
          )}
        </LogoContainer>
      </Link>
      
      <MenuWrapper>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => router.push(`/${key}`)}
        />
      </MenuWrapper>

      <CollapseButton 
        onClick={handleToggleCollapse}
        collapsed={collapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </CollapseButton>
      
      <UserProfileContainer collapsed={collapsed}>
        <Avatar src={user.avatar} icon={<UserOutlined />} size={collapsed ? 'default' : 'large'} />
        
        {!collapsed && (
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role}</UserRole>
          </UserInfo>
        )}
      </UserProfileContainer>
    </StyledSider>
  )
}

export default Sidebar 
