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
  message
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons'
import AppLayout from '../../components/layout/AppLayout'

const { Title } = Typography
const { Search } = Input

// Mock data for products
const initialProducts = [
  {
    id: '1',
    name: 'Product A',
    category: 'Category 1',
    price: 49.99,
    stock: 100,
    status: 'active',
  },
  {
    id: '2',
    name: 'Product B',
    category: 'Category 2',
    price: 29.99,
    stock: 50,
    status: 'active',
  },
  {
    id: '3',
    name: 'Product C',
    category: 'Category 1',
    price: 39.99,
    stock: 75,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Product D',
    category: 'Category 3',
    price: 59.99,
    stock: 25,
    status: 'active',
  },
]

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState(initialProducts)
  const [searchText, setSearchText] = useState('')

  const handleSearch = (value: string) => {
    setSearchText(value)
    if (!value) {
      setProducts(initialProducts)
      return
    }
    
    const filtered = initialProducts.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    )
    setProducts(filtered)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id))
    message.success('Product deleted successfully')
  }

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit form or redirect to an edit page
    console.log('Edit product', id)
    message.info('Edit functionality will be implemented soon')
  }

  const handleAdd = () => {
    // In a real app, this would open an add form or redirect to an add page
    console.log('Add new product')
    message.info('Add functionality will be implemented soon')
  }

  // Table columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Category 1', value: 'Category 1' },
        { text: 'Category 2', value: 'Category 2' },
        { text: 'Category 3', value: 'Category 3' },
      ],
      onFilter: (value: any, record: any) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: any, b: any) => a.stock - b.stock,
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
            title="Are you sure you want to delete this product?"
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
            <Title level={2}>Products</Title>
          </Col>
          <Col>
            <Space>
              <Search 
                placeholder="Search products" 
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
                Add Product
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <Table
        dataSource={products}
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

export default ProductsPage 