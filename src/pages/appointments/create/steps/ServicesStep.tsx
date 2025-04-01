import React, { useState } from 'react';
import { Form, Button, Typography, Space, Table, Input, Tag, Card, Row, Col, Empty, Drawer, Select, InputNumber, Divider } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface ServicesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

// Mock data for packages
const mockPackages = [
  {
    key: '1',
    name: 'Basic Service',
    service: 'Maintenance',
    price: 300,
    estimatedTime: 120,
    children: [
      {
        key: '1-1',
        name: 'Oil Change',
        service: 'Maintenance',
        price: 100,
        estimatedTime: 30,
      },
      {
        key: '1-2',
        name: 'Tire Rotation',
        service: 'Maintenance',
        price: 50,
        estimatedTime: 30,
      },
      {
        key: '1-3',
        name: 'Brake Inspection',
        service: 'Maintenance',
        price: 100,
        estimatedTime: 30,
      },
      {
        key: '1-4',
        name: 'Battery Check',
        service: 'Maintenance',
        price: 50,
        estimatedTime: 30,
      },
    ]
  },
  {
    key: '2',
    name: 'Premium Service',
    service: 'Maintenance',
    price: 500,
    estimatedTime: 180,
    children: [
      {
        key: '2-1',
        name: 'Oil Change',
        service: 'Maintenance',
        price: 100,
        estimatedTime: 30,
      },
      {
        key: '2-2',
        name: 'Tire Rotation',
        service: 'Maintenance',
        price: 50,
        estimatedTime: 30,
      },
      {
        key: '2-3',
        name: 'Brake Service',
        service: 'Maintenance',
        price: 200,
        estimatedTime: 60,
      },
      {
        key: '2-4',
        name: 'Fluid Replacement',
        service: 'Maintenance',
        price: 150,
        estimatedTime: 60,
      },
    ]
  },
  {
    key: '3',
    name: 'Windshield Replacement',
    service: 'Glass',
    price: 400,
    estimatedTime: 120,
  },
  {
    key: '4',
    name: 'Paint Correction',
    service: 'Detailing',
    price: 350,
    estimatedTime: 240,
  },
];

// Service tags for filtering
const serviceTags = ['All', 'Maintenance', 'Glass', 'Detailing', 'Repair'];

const ServicesStep: React.FC<ServicesStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  // State for drawer
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [tempSelectedRowKeys, setTempSelectedRowKeys] = useState<React.Key[]>(
    formData.services?.map((service: any) => service.key) || []
  );
  const [tempSelectedPackages, setTempSelectedPackages] = useState<any[]>(
    formData.services || []
  );
  
  // State for main display
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    formData.services?.map((service: any) => service.key) || []
  );
  const [selectedPackages, setSelectedPackages] = useState<any[]>(
    formData.services || []
  );
  
  // Filter and search states
  const [searchText, setSearchText] = useState('');
  const [drawerActiveTag, setDrawerActiveTag] = useState('All');
  const [selectedActiveTag, setSelectedActiveTag] = useState('All');
  
  // Open the drawer
  const openDrawer = () => {
    // Initialize temp selections with current selections
    setTempSelectedRowKeys(selectedRowKeys);
    setTempSelectedPackages(selectedPackages);
    setDrawerVisible(true);
  };
  
  // Close the drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  
  // Confirm selection from drawer
  const confirmSelection = () => {
    setSelectedRowKeys(tempSelectedRowKeys);
    
    // Process selections to ensure parent packages are included
    const finalSelectedPackages = processSelectedPackages();
    setSelectedPackages(finalSelectedPackages);
    
    closeDrawer();
  };
  
  // Process selected packages to include parent packages when child services are selected
  const processSelectedPackages = () => {
    const result: any[] = [];
    const addedKeys = new Set<string>();
    const parentChildMap = new Map<string, any[]>();
    
    // First pass: identify all selected items and their relationships
    tempSelectedPackages.forEach(item => {
      if (addedKeys.has(item.key)) return;
      
      // If this is a child service
      if (item.key.includes('-')) {
        const parentKey = item.key.split('-')[0];
        
        if (!parentChildMap.has(parentKey)) {
          parentChildMap.set(parentKey, []);
        }
        
        // Add this child to its parent's list
        parentChildMap.get(parentKey)?.push(item);
        
        // Mark as processed
        addedKeys.add(item.key);
      } else {
        // This is a parent package - will be processed in the next pass
      }
    });
    
    // Second pass: add parent packages with their children
    mockPackages.forEach(pkg => {
      // Check if this package or any of its children are selected
      const packageKey = pkg.key;
      const directlySelected = tempSelectedRowKeys.includes(packageKey);
      const hasSelectedChildren = parentChildMap.has(packageKey);
      
      if (directlySelected || hasSelectedChildren) {
        // Find original package to get full structure
        const originalPackage = mockPackages.find(p => p.key === packageKey);
        if (!originalPackage) return;
        
        // Create a copy of the package
        const packageCopy = { ...originalPackage };
        
        // If there are selected children, only include those
        if (hasSelectedChildren) {
          packageCopy.children = parentChildMap.get(packageKey) || [];
        }
        
        // Add to result
        result.push(packageCopy);
        addedKeys.add(packageKey);
      }
    });
    
    // Third pass: add any standalone services that aren't part of a package
    tempSelectedPackages.forEach(item => {
      if (!addedKeys.has(item.key)) {
        result.push(item);
        addedKeys.add(item.key);
      }
    });
    
    return result;
  };
  
  // Handle temp row selection in drawer
  const handleTempSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
    setTempSelectedRowKeys(newSelectedRowKeys);
    
    // Update temp selected packages
    const updatedPackages = selectedRows.map(row => ({
      ...row,
      estimatedTime: row.estimatedTime,
    }));
    
    setTempSelectedPackages(updatedPackages);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  
  // Handle drawer tag filter
  const handleDrawerTagClick = (tag: string) => {
    setDrawerActiveTag(tag);
  };
  
  // Handle selected tag filter
  const handleSelectedTagClick = (tag: string) => {
    setSelectedActiveTag(tag);
  };
  
  // Filter packages based on search text and tag
  const getFilteredPackages = () => {
    const filtered = mockPackages.filter(pkg => {
      const matchesSearch = 
        searchText === '' || 
        pkg.name.toLowerCase().includes(searchText.toLowerCase()) || 
        pkg.service.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesTag = 
        drawerActiveTag === 'All' || 
        pkg.service === drawerActiveTag;
      
      return matchesSearch && matchesTag;
    });
    
    // Deep clone to avoid mutating the original data
    return JSON.parse(JSON.stringify(filtered));
  };
  
  // Filter selected packages based on selected active tag
  const getFilteredSelectedPackages = () => {
    if (selectedActiveTag === 'All') {
      return selectedPackages;
    }
    
    return selectedPackages.filter(pkg => pkg.service === selectedActiveTag);
  };
  
  // Handle price change
  const handlePriceChange = (key: string, value: number | null) => {
    if (value === null) return;
    
    setSelectedPackages(prev => 
      prev.map(pkg => 
        pkg.key === key 
          ? { ...pkg, price: value } 
          : pkg
      )
    );
  };
  
  // Handle hours change
  const handleHoursChange = (key: string, value: number | null) => {
    if (value === null) return;
    
    const pkg = selectedPackages.find(p => p.key === key);
    if (!pkg) return;
    
    const currentMinutes = pkg.estimatedTime % 60;
    const newEstimatedTime = (value * 60) + currentMinutes;
    
    setSelectedPackages(prev => 
      prev.map(p => 
        p.key === key 
          ? { ...p, estimatedTime: newEstimatedTime } 
          : p
      )
    );
  };
  
  // Handle minutes change
  const handleMinutesChange = (key: string, value: number | null) => {
    if (value === null) return;
    
    const pkg = selectedPackages.find(p => p.key === key);
    if (!pkg) return;
    
    const currentHours = Math.floor(pkg.estimatedTime / 60);
    const newEstimatedTime = (currentHours * 60) + value;
    
    setSelectedPackages(prev => 
      prev.map(p => 
        p.key === key 
          ? { ...p, estimatedTime: newEstimatedTime } 
          : p
      )
    );
  };
  
  // Handle remove package
  const handleRemovePackage = (key: string) => {
    // Remove the item and any of its children
    let keysToRemove = [key];
    
    // If this is a parent package, also remove all children
    if (!key.includes('-')) {
      const childrenKeysToRemove = selectedRowKeys.filter(k => 
        typeof k === 'string' && k.toString().startsWith(`${key}-`)
      );
      keysToRemove = [...keysToRemove, ...childrenKeysToRemove.map(k => k.toString())];
    }
    
    const newSelectedKeys = selectedRowKeys.filter(k => !keysToRemove.includes(k.toString()));
    setSelectedRowKeys(newSelectedKeys);
    setSelectedPackages(prev => prev.filter(pkg => !keysToRemove.includes(pkg.key)));
  };
  
  // Create a function to handle deletion from the selected packages table
  const handleDeleteSelectedItem = (record: any) => {
    // For a parent package, we remove it and all its children
    // For a child service, we only remove that specific service
    const keysToRemove: string[] = [];
    
    if (record.key.includes('-')) {
      // Child service - just remove this one item
      keysToRemove.push(record.key);
    } else {
      // Parent package - remove it and all its children
      keysToRemove.push(record.key);
      // Add all child keys
      if (record.children) {
        record.children.forEach((child: any) => {
          keysToRemove.push(child.key);
        });
      }
    }
    
    // Update selectedRowKeys
    const newSelectedRowKeys = selectedRowKeys.filter(
      k => !keysToRemove.includes(k.toString())
    );
    setSelectedRowKeys(newSelectedRowKeys);
    
    // Update selectedPackages - more complex as we need to preserve the tree structure
    const newSelectedPackages = [...selectedPackages];
    
    // Filter out deleted items
    const filteredPackages = newSelectedPackages.filter(pkg => !keysToRemove.includes(pkg.key));
    
    // For any remaining parent packages, filter out deleted children
    const finalPackages = filteredPackages.map(pkg => {
      if (pkg.children) {
        return {
          ...pkg,
          children: pkg.children.filter((child: any) => !keysToRemove.includes(child.key))
        };
      }
      return pkg;
    });
    
    setSelectedPackages(finalPackages);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    updateFormData({
      services: selectedPackages,
    });
    onNext();
  };
  
  // Get hours from estimated time
  const getHours = (estimatedTime: number) => Math.floor(estimatedTime / 60);
  
  // Get minutes from estimated time
  const getMinutes = (estimatedTime: number) => estimatedTime % 60;
  
  // Drawer table columns
  const drawerColumns = [
    {
      title: 'Package/Service Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Type',
      dataIndex: 'service',
      key: 'service',
      width: '20%',
      render: (text: string) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Estimated Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: '25%',
      render: (time: number) => `${time} min`,
    },
  ];
  
  // Selected packages columns with delete button
  const selectedColumns = [
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      // No custom render to match drawer appearance
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      width: '15%',
      render: (text: string) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price: number, record: any) => (
        <InputNumber
          value={price}
          min={0}
          style={{ width: '100%' }}
          onChange={(value) => handlePriceChange(record.key, value)}
          formatter={(value) => `$${value}`}
          parser={(value) => value ? parseFloat(value.replace('$', '')) : 0}
        />
      ),
    },
    {
      title: 'Estimated Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: '20%',
      render: (time: number, record: any) => (
        <Space>
          <InputNumber
            value={getHours(time)}
            min={0}
            max={24}
            style={{ width: '40px' }} 
            onChange={(value) => handleHoursChange(record.key, value)}
          />
          <Text>hr</Text>
          <InputNumber
            value={getMinutes(time)}
            min={0}
            max={59}
            style={{ width: '40px' }} 
            onChange={(value) => handleMinutesChange(record.key, value)}
          />
          <Text>mins</Text>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (_: any, record: any) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleDeleteSelectedItem(record)}
        />
      ),
    },
  ];
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Packages">
            <Form.Item label="Add package">
              <Select
                placeholder="Select"
                style={{ width: '100%' }}
                onClick={openDrawer}
                value={null}
              >
                {/* No options available */}
              </Select>
            </Form.Item>
          </Card>
        </Col>
        
        {/* Selected packages */}
        <Col span={24}>
          <Card title="Selected Packages">
            <div style={{ marginBottom: '16px' }}>
              <Space wrap style={{ marginBottom: '16px' }}>
                {serviceTags.map(tag => (
                  <Tag 
                    key={tag}
                    color={selectedActiveTag === tag ? 'blue' : 'default'}
                    style={{ cursor: 'pointer', padding: '4px 8px' }}
                    onClick={() => handleSelectedTagClick(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </Space>
            </div>
            
            {selectedPackages.length > 0 ? (
              <Table
                columns={selectedColumns}
                dataSource={getFilteredSelectedPackages()}
                pagination={false}
                size="middle"
                childrenColumnName="children"
                indentSize={24}
                expandable={{
                  defaultExpandAllRows: true,
                  expandIcon: () => null, // Hide expand icon
                }}
                rowKey="key"
                onRow={(record) => ({
                  style: {
                    cursor: 'default'
                  }
                })}
              />
            ) : (
              <Empty description="No packages selected" />
            )}
          </Card>
        </Col>
      </Row>
      
      {/* Package Selection Drawer */}
      <Drawer 
        title="Select Packages"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={800}
        extra={
          <Button
            type="primary"
            onClick={confirmSelection}
          >
            Selected ({tempSelectedRowKeys.length})
          </Button>
        }
      >
        {/* Search bar + tag filter */}
        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Search packages"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            style={{ width: '100%', marginBottom: '16px' }}
          />
          
          <Space wrap>
            {serviceTags.map(tag => (
              <Tag 
                key={tag}
                color={drawerActiveTag === tag ? 'blue' : 'default'}
                style={{ cursor: 'pointer', padding: '4px 8px' }}
                onClick={() => handleDrawerTagClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
        
        {/* Table select packages */}
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: tempSelectedRowKeys,
            onChange: handleTempSelectChange,
            checkStrictly: false, // Allow select children/parent separately
          }}
          columns={drawerColumns}
          dataSource={getFilteredPackages()}
          childrenColumnName="children"
          indentSize={24}
          defaultExpandAllRows={true}
          pagination={false}
          size="middle"
          style={{ marginBottom: '16px' }}
        />
        
        <div style={{ position: 'absolute', bottom: 0, width: 'calc(100% - 48px)', borderTop: '1px solid #f0f0f0', padding: '16px 0' }}>
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" onClick={confirmSelection}>
              Selected ({tempSelectedRowKeys.length})
            </Button>
          </Space>
        </div>
      </Drawer>
      
      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button 
          type="primary" 
          onClick={handleSubmit}
          disabled={selectedPackages.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ServicesStep; 