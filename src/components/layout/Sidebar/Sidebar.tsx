import React from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { UserOutlined } from '@ant-design/icons'
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
  CustomIcon,
  StyledButton,
  ButtonIcon,
  ButtonContainer,
  UserInfoContainer,
  StyledAvatar
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
      collapsedWidth={60}
      style={{ zIndex: 1000 }}
    >
      <Link href="/">
        <LogoContainer collapsed={collapsed}>
          {collapsed ? (
            <Image
              src="/images/logo-small.png"
              alt="CenCal Tinting Logo"
              width={40}
              height={40}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          ) : (
            <Image
              src="/images/logo.png"
              alt="CenCal Tinting Logo"
              width={160}
              height={40}
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


      <UserProfileContainer collapsed={collapsed}>
        <ButtonContainer collapsed={collapsed}>
          <StyledButton
            onClick={handleToggleCollapse}
            type="text"
          >
            <ButtonIcon collapsed={collapsed} />
          </StyledButton>
        </ButtonContainer>
        <UserInfoContainer>
          <StyledAvatar src={user.avatar} icon={<UserOutlined />} size={28} />
          {!collapsed && (
            <UserInfo>
              <UserName>{user.name}</UserName>
            </UserInfo>
          )}
        </UserInfoContainer>
      </UserProfileContainer>
    </StyledSider>
  )
}

export default Sidebar 
