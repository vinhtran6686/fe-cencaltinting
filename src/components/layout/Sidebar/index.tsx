import React from 'react'
import { Layout, Menu, Avatar, Space, Typography, Divider } from 'antd'
import Link from 'next/link'
import { 
  CalendarOutlined,
  FileTextOutlined,
  ToolOutlined,
  CarOutlined,
  CalendarFilled,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FilePdfOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../store'
import { dummyUser } from '../../../store/slices/authSlice'

const { Sider } = Layout
const { Text } = Typography

interface SidebarProps {
  collapsed?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const router = useRouter()
  // In the future, we'll get this from auth state
  const user = useAppSelector(state => state.auth.user) || dummyUser 
  
  const menuItems = [
    {
      key: 'appointments',
      icon: <CalendarOutlined />,
      label: <Link href="/appointments">Appointments</Link>,
    },
    {
      key: 'proposal',
      icon: <FileTextOutlined />,
      label: <Link href="/proposal">Proposals</Link>,
    },
    {
      key: 'services',
      icon: <ToolOutlined />,
      label: <Link href="/services">Services</Link>,
    },
    {
      key: 'vehicleRules',
      icon: <CarOutlined />,
      label: <Link href="/vehicleRules">Vehicle Rules</Link>,
    },
    {
      key: 'inventory',
      icon: <ShoppingCartOutlined />,
      label: <Link href="/inventory">Inventory</Link>,
    },
    {
      key: 'contact',
      icon: <TeamOutlined />,
      label: <Link href="/contact">Contacts</Link>,
    },
    {
      key: 'transactions',
      icon: <DollarOutlined />,
      label: <Link href="/transactions">Transactions</Link>,
    },
    {
      key: 'invoice',
      icon: <FilePdfOutlined />,
      label: <Link href="/invoice">Invoices</Link>,
    }
  ]
  
  // Determine the selected key based on the current path
  const selectedKey = router.pathname.split('/')[1] || 'appointments'
  
  return (
    <Sider 
      theme="dark" 
      collapsible 
      collapsed={collapsed}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ 
        height: '80px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px'
      }}>
        <img 
          src="/images/logo.png" 
          alt="CenCal Tinting Logo" 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            display: collapsed ? 'none' : 'block'
          }} 
        />
        {collapsed && (
          <img 
            src="/images/logo-small.png" 
            alt="CT" 
            style={{ 
              maxWidth: '40px', 
              maxHeight: '40px' 
            }} 
          />
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ flex: 1, borderRight: 0 }}
      />
      
      {/* User profile section at bottom */}
      <div style={{ 
        padding: collapsed ? '12px 8px' : '16px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <Avatar src={user.avatar} icon={<UserOutlined />} size={collapsed ? 'default' : 'large'} />
        
        {!collapsed && (
          <div style={{ marginLeft: 12 }}>
            <Text strong>{user.name}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>{user.role}</Text>
            </div>
          </div>
        )}
      </div>
    </Sider>
  )
}

export default Sidebar 