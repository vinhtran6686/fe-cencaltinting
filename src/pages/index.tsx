import React, { useEffect } from 'react'
import { Typography, Card, Row, Col, Button, Space, Alert, Divider, Tag, Switch, Radio, Spin } from 'antd'
import Link from 'next/link'
import StyledCard from '../components/StyledCard'
import { useRouter } from 'next/router'

const { Title, Paragraph } = Typography

const featureRoutes = [
  { name: 'Proposal', path: '/proposal', description: 'Manage customer proposals' },
  { name: 'Services', path: '/services', description: 'Configure and manage offered services' },
  { name: 'Vehicle Rules', path: '/vehicleRules', description: 'Setup rules for different vehicle types' },
  { name: 'Appointments', path: '/appointments', description: 'Manage customer appointments and scheduling' },
  { name: 'Inventory', path: '/inventory', description: 'Track inventory and supplies' },
  { name: 'Contact', path: '/contact', description: 'Customer contact management' },
  { name: 'Transactions', path: '/transactions', description: 'Track financial transactions' },
  { name: 'Invoice', path: '/invoice', description: 'Generate and manage invoices' },
];

const HomePage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to appointments page
    router.push('/appointments')
  }, [router])

  // Display a loading spinner while redirecting
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }}>
      <Spin size="large" tip="Redirecting to Appointments..." />
    </div>
  )
}

export default HomePage
