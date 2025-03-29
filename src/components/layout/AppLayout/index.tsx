import React, { useState } from 'react'
import { Layout } from 'antd'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

const { Content } = Layout

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default AppLayout 