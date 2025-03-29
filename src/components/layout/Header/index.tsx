import React from 'react'
import { Layout, Menu } from 'antd'
import Link from 'next/link'

const { Header: AntHeader } = Layout

interface HeaderProps {
  // Add any custom props here
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo" style={{ marginRight: '20px' }}>
        <Link href="/">
          <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            CENCALTINTING
          </span>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            label: <Link href="/">Home</Link>,
          },
          {
            key: '2',
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: '3',
            label: <Link href="/products">Products</Link>,
          },
        ]}
      />
    </AntHeader>
  )
}

export default Header 