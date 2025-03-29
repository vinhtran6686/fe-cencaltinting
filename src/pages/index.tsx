import React from 'react'
import { Typography, Card, Row, Col, Button, Space, Alert, Divider, Tag, Switch, Radio } from 'antd'
import Link from 'next/link'
import StyledCard from '../components/StyledCard'

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title>Welcome to CENCALTINTING</Title>
        <Paragraph>
          This is the home page of the CENCALTINTING application.
        </Paragraph>

        <Divider>Theme Demo</Divider>
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Color Theme" bordered={true}>
                <Space wrap>
                  <Button type="primary">Primary Button</Button>
                  <Button type="default">Default Button</Button>
                  <Button type="dashed">Dashed Button</Button>
                  <Button type="text">Text Button</Button>
                  <Button type="link">Link Button</Button>
                </Space>
                
                <Divider />
                
                <Space direction="vertical">
                  <Alert message="Success Message" type="success" showIcon />
                  <Alert message="Info Message" type="info" showIcon />
                  <Alert message="Warning Message" type="warning" showIcon />
                  <Alert message="Error Message" type="error" showIcon />
                </Space>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Card title="Components" bordered={true}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Switch defaultChecked />
                    <span>Toggle</span>
                  </Space>
                  
                  <Space>
                    <Radio.Group defaultValue="a">
                      <Radio.Button value="a">Option A</Radio.Button>
                      <Radio.Button value="b">Option B</Radio.Button>
                      <Radio.Button value="c">Option C</Radio.Button>
                    </Radio.Group>
                  </Space>
                  
                  <Space>
                    <Tag color="success">Success</Tag>
                    <Tag color="processing">Processing</Tag>
                    <Tag color="error">Error</Tag>
                    <Tag color="warning">Warning</Tag>
                    <Tag color="default">Default</Tag>
                  </Space>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12}>
              <Card title="Dashboard" bordered={true}>
                <Paragraph>
                  View important metrics and analytics for your business.
                </Paragraph>
                <Link href="/dashboard">
                  <Button type="primary">Go to Dashboard</Button>
                </Link>
              </Card>
            </Col>
          </Row>
          
          <Divider>Custom Styled Components</Divider>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <StyledCard title="Regular Styled Card">
                <Paragraph>
                  This is a custom styled card component that uses the theme tokens.
                  Hover over this card to see the hover effect.
                </Paragraph>
              </StyledCard>
            </Col>
            
            <Col xs={24} sm={12}>
              <StyledCard title="Dark Header Card" isDark>
                <Paragraph>
                  This is a custom styled card with a dark header that uses the primary color.
                  The styling is controlled by the theme configuration.
                </Paragraph>
              </StyledCard>
            </Col>
          </Row>
        </Space>
      </Typography>
    </div>
  )
}

export default HomePage
