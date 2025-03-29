import React from 'react'
import { Typography, Row, Col, Card, Statistic } from 'antd'
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import AppLayout from '../../components/layout/AppLayout'

const { Title } = Typography

const DashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <Typography>
        <Title level={2}>Dashboard</Title>
        
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={256}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Products"
                value={182}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Revenue"
                value={15680}
                precision={2}
                prefix={<DollarOutlined />}
                suffix="USD"
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Growth"
                value={12.3}
                precision={1}
                prefix={<LineChartOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Typography>
    </AppLayout>
  )
}

export default DashboardPage 