import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const TransactionsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Transactions Management</Title>
      <Card>
        <Paragraph>
          This feature is currently under development. Please check back later.
        </Paragraph>
      </Card>
    </div>
  )
}

export default TransactionsPage 