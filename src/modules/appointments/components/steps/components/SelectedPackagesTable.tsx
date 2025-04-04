import React, { memo } from 'react';
import { Table, Space, Tag, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { ServicePackage } from '../../../../../modules/appointments/services/servicesService';
import { ServiceDetailsTable } from '../../shared';

const { Text } = Typography;

interface SelectedPackagesTableProps {
  packages: ServicePackage[];
  onPriceChange: (id: string, value: number | null) => void;
  onHoursChange: (id: string, value: number | null) => void;
  onMinutesChange: (id: string, value: number | null) => void;
  onDeleteItem: (record: ServicePackage) => void;
}

const SelectedPackagesTable = memo(({ 
  packages, 
  onPriceChange, 
  onHoursChange, 
  onMinutesChange, 
  onDeleteItem 
}: SelectedPackagesTableProps) => {
  const getHours = (estimatedTime: number) => Math.floor(estimatedTime / 60);
  const getMinutes = (estimatedTime: number) => estimatedTime % 60;

  const selectedColumns = [
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: '20%',
      render: (tags: string[]) => (
        <Space wrap>
          {tags && tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '15%',
      render: (price: number, record: ServicePackage) => (
        <InputNumber
          value={price}
          min={0}
          style={{ width: '100%' }}
          onChange={(value) => onPriceChange(record._id, value)}
          formatter={(value) => `$${value}`}
          parser={(value) => value ? parseFloat(value.replace('$', '')) : 0}
        />
      ),
    },
    {
      title: 'Est. Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: '15%',
      render: (time: number, record: ServicePackage) => (
        <Space>
          <InputNumber
            value={getHours(time)}
            min={0}
            max={24}
            style={{ width: '40px' }} 
            onChange={(value) => onHoursChange(record._id, value)}
          />
          <Text>hr</Text>
          <InputNumber
            value={getMinutes(time)}
            min={0}
            max={59}
            style={{ width: '40px' }} 
            onChange={(value) => onMinutesChange(record._id, value)}
          />
          <Text>mins</Text>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (_: any, record: ServicePackage) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => onDeleteItem(record)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={selectedColumns}
      dataSource={packages}
      pagination={false}
      size="middle"
      expandable={{
        expandedRowRender: record => (
          record.services && record.services.length > 0 ? (
            <ServiceDetailsTable services={record.services} />
          ) : null
        ),
        rowExpandable: record => record.services && record.services.length > 0,
      }}
      rowKey="_id"
    />
  );
});

SelectedPackagesTable.displayName = 'SelectedPackagesTable';

export default SelectedPackagesTable;
