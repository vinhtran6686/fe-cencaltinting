import React, { useState } from 'react'
import { 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Input, 
  Row, 
  Col,
  Popconfirm,
  message,
  Avatar
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons'
import AppLayout from '../../components/layout/AppLayout'

const { Title } = Typography
const { Search } = Input

// Mock data for users
const initialUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-05-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-05-19T14:45:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'manager',
    status: 'inactive',
    lastLogin: '2023-05-15T09:15:00Z',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-05-18T16:20:00Z',
  },
]

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState(initialUsers)
  const [searchText, setSearchText] = useState('')

  const handleSearch = (value: string) => {
    setSearchText(value)
    if (!value) {
      setUsers(initialUsers)
      return
    }
    
    const filtered = initialUsers.filter(user => 
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.role.toLowerCase().includes(value.toLowerCase())
    )
    setUsers(filtered)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
    message.success('User deleted successfully')
  }

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit form or redirect to an edit page
    console.log('Edit user', id)
    message.info('Edit functionality will be implemented soon')
  }

  const handleAdd = () => {
    // In a real app, this would open an add form or redirect to an add page
    console.log('Add new user')
    message.info('Add functionality will be implemented soon')
  }

  // Get role color for tags
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red'
      case 'manager':
        return 'blue'
      case 'user':
        return 'green'
      default:
        return 'default'
    }
  }

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  // Table columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {name}
        </Space>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Manager', value: 'manager' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value: any, record: any) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin: string) => formatDate(lastLogin),
      sorter: (a: any, b: any) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <AppLayout>
      <div style={{ marginBottom: '20px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Users</Title>
          </Col>
          <Col>
            <Space>
              <Search 
                placeholder="Search users" 
                onSearch={handleSearch} 
                onChange={e => handleSearch(e.target.value)}
                style={{ width: 250 }} 
                enterButton={<SearchOutlined />}
                allowClear
              />
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Add User
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ 
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` 
        }}
      />
    </AppLayout>
  )
}

export default UsersPage 