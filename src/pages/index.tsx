import React from 'react'
import { Typography, Card, Row, Col, Button, Space, Alert, Divider, Tag, Switch, Radio } from 'antd'
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
  const router = useRouter();
  
  // Redirect to appointments (default page)
  // React.useEffect(() => {
  //   router.push('/appointments');
  // }, [router]);
  
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title>Welcome to CENCALTINTING</Title>
        <Paragraph>
          This application helps you manage your business operations efficiently.
        </Paragraph>

        <Divider>Available Features</Divider>
        
        <Row gutter={[16, 16]}>
          {featureRoutes.map((feature) => (
            <Col xs={24} sm={12} md={8} key={feature.path}>
              <Card 
                title={feature.name}
                style={{ height: '100%' }}
                actions={[
                  <Link href={feature.path} key="enter">
                    <Button type="primary">Enter</Button>
                  </Link>
                ]}
              >
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Typography>
    </div>
  )
}

export default HomePage
