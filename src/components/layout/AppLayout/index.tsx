import React from 'react'
import { Layout } from 'antd'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useAppDispatch, useAppSelector } from '../../../store'
import { toggleSidebar } from '../../../store/slices/appSlice'

const { Content } = Layout

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { sidebarCollapsed } = useAppSelector(state => state.app)

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={sidebarCollapsed} />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', overflow: 'auto' }}>
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default AppLayout 