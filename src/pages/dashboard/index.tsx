import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import UserProfileWithQuery from '../../components/UserProfileWithQuery'
import AppLayout from '@/components/layout/AppLayout'

const DashboardPage: React.FC = () => {

  return (
    <AppLayout>
      <DashboardLayout>
        <UserProfileWithQuery />
      </DashboardLayout>
    </AppLayout>
  )
}

export default DashboardPage 