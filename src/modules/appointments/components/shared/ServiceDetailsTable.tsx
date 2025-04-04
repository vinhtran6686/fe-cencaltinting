import React, { memo } from 'react';
import { Table } from 'antd';
import { ServiceItem } from '@/modules/appointments/services/servicesService';

interface ServiceDetailsTableProps {
  services: ServiceItem[];
}

const ServiceDetailsTable = memo(({ services }: ServiceDetailsTableProps) => {
  const serviceDetailColumns = [
    {
      title: 'Service',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (time: number) => `${time} min`,
    },
  ];

  return (
    <Table
      columns={serviceDetailColumns}
      dataSource={services}
      pagination={false}
      size="small"
      rowKey="_id"
    />
  );
});

ServiceDetailsTable.displayName = 'ServiceDetailsTable';

export default ServiceDetailsTable;
