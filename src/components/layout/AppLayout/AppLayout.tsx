import React from 'react'
import { Layout } from 'antd'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAppDispatch, useAppSelector } from '../../../store'
import { StyledLayout, MainLayout, StyledContent } from './AppLayout.styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { sidebarCollapsed } = useAppSelector(state => state.app)

  const sidebarWidth = sidebarCollapsed ? 60 : 240;

  return (
    <StyledLayout>
      <Sidebar collapsed={sidebarCollapsed} />
      <MainLayout sidebarWidth={sidebarWidth}>
        <Header />
        <StyledContent>
          {children}
        </StyledContent>
      </MainLayout>
    </StyledLayout>
  )
}

export default AppLayout 