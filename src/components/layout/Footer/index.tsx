import React from 'react'
import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

interface FooterProps {
  // Add any custom props here
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      CENCALTINTING ©{new Date().getFullYear()} - All Rights Reserved
    </AntFooter>
  )
}

export default Footer 