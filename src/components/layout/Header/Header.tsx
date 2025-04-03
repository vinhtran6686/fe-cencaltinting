import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { BackButton, StyledHeader } from './Header.styles'
import { HeaderTitle } from '@/components/common'


interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const pageTitle = title || getPageTitle(router.pathname)

  const showBackButton = router.pathname !== '/' && !router.pathname.match(/^\/dashboard\/?$/)

  return (
    <StyledHeader>
      {showBackButton && (
        <BackButton
          color="default"
          variant="filled"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
        />
      )}
      <HeaderTitle level={4} withoutBackButton={!showBackButton}>
        {pageTitle}
      </HeaderTitle>
    </StyledHeader>
  )
}

const getPageTitle = (path: string): string => {
  const segments = path.split('/')
  const mainRoute = segments[1] || 'dashboard'

  if (segments.length > 2) {
    const action = segments[2]

    if (action === 'create') {
      return `Create ${getSingular(mainRoute)}`
    } else if (action === 'edit') {
      return `Edit ${getSingular(mainRoute)}`
    } else if (action === 'view' || !isNaN(Number(action))) {
      return `${getSingular(mainRoute)} Details`
    }
  }

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    proposal: 'Proposals',
    services: 'Services',
    vehicleRules: 'Vehicle Rules',
    inventory: 'Inventory',
    contact: 'Contacts',
    transactions: 'Transactions',
    invoice: 'Invoices',
  }

  return titles[mainRoute] || 'Dashboard'
}

const getSingular = (route: string): string => {
  const singulars: Record<string, string> = {
    appointments: 'Appointment',
    proposal: 'Proposal',
    services: 'Service',
    vehicleRules: 'Vehicle Rule',
    inventory: 'Inventory Item',
    contact: 'Contact',
    transactions: 'Transaction',
    invoice: 'Invoice',
  }

  return singulars[route] || route
}

export default Header

