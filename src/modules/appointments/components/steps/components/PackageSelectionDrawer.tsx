import React, { memo } from 'react';
import { Drawer, Button, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ServicePackage } from '@/modules/appointments/services/servicesService';
import TagsList from './TagsList';
import PackageSelectionTable from './PackageSelectionTable';

interface PackageSelectionDrawerProps {
  visible: boolean;
  packages: ServicePackage[] | undefined;
  isLoading: boolean;
  selectedKeys: React.Key[];
  onSelectChange: (keys: React.Key[], rows: ServicePackage[]) => void;
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const PackageSelectionDrawer = memo(({ 
  visible, 
  packages, 
  isLoading,
  selectedKeys,
  onSelectChange,
  searchText,
  onSearchChange,
  tags,
  activeTag,
  onTagClick,
  onClose,
  onConfirm
}: PackageSelectionDrawerProps) => {
  return (
    <Drawer 
      title="Select Packages"
      placement="right"
      onClose={onClose}
      open={visible}
      width={800}
      extra={
        <Button
          type="primary"
          onClick={onConfirm}
        >
          Selected ({selectedKeys.length})
        </Button>
      }
    >
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search packages"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={onSearchChange}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        
        <TagsList 
          tags={tags} 
          activeTag={activeTag} 
          onTagClick={onTagClick} 
        />
      </div>
      
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <PackageSelectionTable 
          packages={packages || []} 
          selectedKeys={selectedKeys} 
          onSelectChange={onSelectChange} 
        />
      )}
      
      <div style={{ position: 'absolute', bottom: 0, width: 'calc(100% - 48px)', borderTop: '1px solid #f0f0f0', padding: '16px 0' }}>
        <Button onClick={onClose} style={{ marginRight: '8px' }}>Cancel</Button>
        <Button type="primary" onClick={onConfirm}>
          Selected ({selectedKeys.length})
        </Button>
      </div>
    </Drawer>
  );
});

export default PackageSelectionDrawer;
