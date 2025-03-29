import React from 'react'
import { Typography, Card, Row, Col, Button } from 'antd'
import Link from 'next/link'

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title>Welcome to CENCALTINTING</Title>
        <Paragraph>
          This is the home page of the CENCALTINTING application.
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: '32px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Dashboard" bordered={false}>
              <Paragraph>
                View important metrics and analytics for your business.
              </Paragraph>
              <Link href="/dashboard">
                <Button type="primary">Go to Dashboard</Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Typography>
    </div>
  )
}

export default HomePage
