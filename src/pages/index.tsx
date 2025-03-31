import React from 'react'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import { spacing } from '../theme/tokens'

const { Title, Paragraph } = Typography

const Container = styled.div`
  padding: ${spacing.lg};
`

const HomePage = () => {
  return (
    <Container>
      <Title level={2}>Welcome to CENCALTINTING Dashboard</Title>
      <Paragraph>
        This is the main dashboard page of the CENCALTINTING application. Future analytics and summary data will be displayed here.
      </Paragraph>
    </Container>
  )
}

export default HomePage
