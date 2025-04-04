import React, { memo } from 'react';
import { Table, Space, Tag } from 'antd';
import { ServicePackage } from '../../../../../modules/appointments/services/servicesService';
import { ServiceDetailsTable } from '../../shared';

interface PackageSelectionTableProps {
  packages: ServicePackage[];
  selectedKeys: React.Key[];
  onSelectChange: (keys: React.Key[], rows: ServicePackage[]) => void;
}

const PackageSelectionTable = memo(({ 
  packages, 
  selectedKeys, 
  onSelectChange 
}: PackageSelectionTableProps) => {
  const drawerColumns = [
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
      width: '30%',
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
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Est. Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: '20%',
      render: (time: number) => `${Math.floor(time / 60)}h ${time % 60}m`,
    },
  ];

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedKeys,
        onChange: onSelectChange,
      }}
      columns={drawerColumns}
      dataSource={packages}
      expandable={{
        expandedRowRender: record => (
          record.services && record.services.length > 0 ? (
            <ServiceDetailsTable services={record.services} />
          ) : null
        ),
        rowExpandable: record => record.services && record.services.length > 0,
      }}
      pagination={false}
      size="middle"
      rowKey="_id"
    />
  );
});

PackageSelectionTable.displayName = 'PackageSelectionTable';

export default PackageSelectionTable;
