import React from 'react'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { 
  DashboardOutlined, 
  UserOutlined, 
  ShoppingOutlined 
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Sider } = Layout

interface SidebarProps {
  collapsed?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const router = useRouter()
  
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link href="/users">Users</Link>,
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: <Link href="/products">Products</Link>,
    },
  ]
  
  // Determine the selected key based on the current path
  const selectedKey = router.pathname.split('/')[1] || 'dashboard'
  
  return (
    <Sider 
      theme="light" 
      collapsible 
      collapsed={collapsed}
      style={{ height: '100vh' }}
    >
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ margin: 0, color: collapsed ? 'transparent' : 'inherit' }}>
          {collapsed ? 'CT' : 'CENCALTINTING'}
        </h2>
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar 