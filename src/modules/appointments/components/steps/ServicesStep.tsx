import React, { useState, useMemo, useCallback } from 'react';
import { Form, Button, Card, Row, Col, Select, Empty } from 'antd';
import { useServicePackages, useServiceTags } from '../../../../modules/appointments/hooks/useServices';
import { ServicePackage, ServicePackagesData, ServiceTagsData } from '../../../../modules/appointments/services/servicesService';
import { TagsList, ServiceDetailsTable } from '../shared';
import {
  SelectedPackagesTable,
  PackageSelectionDrawer
} from './components';

interface ServicesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  // ===== DRAWER STATE =====
  // Tách riêng state cho drawer để tránh re-render component chính
  const [drawerState, setDrawerState] = useState({
    visible: false,
    searchText: '',
    activeTag: 'All',
  });
  
  // ===== SELECTED PACKAGES STATE =====
  // State cho packages đã chọn
  const [selectedPackages, setSelectedPackages] = useState<ServicePackage[]>(
    formData.services || []
  );
  const [selectedActiveTag, setSelectedActiveTag] = useState('All');
  
  // ===== TEMPORARY SELECTION STATE =====
  // State cho việc chọn tạm thời trong drawer
  const [tempSelectedKeys, setTempSelectedKeys] = useState<React.Key[]>(
    formData.services?.map((service: ServicePackage) => service._id) || []
  );
  const [tempSelectedPackages, setTempSelectedPackages] = useState<ServicePackage[]>(
    formData.services || []
  );

  // ===== DATA FETCHING =====
  // Sử dụng useMemo để ổn định tham số truy vấn
  const queryParams = useMemo(() => ({
    search: drawerState.searchText,
    tag: drawerState.activeTag !== 'All' ? drawerState.activeTag : undefined
  }), [drawerState.searchText, drawerState.activeTag]);
  
  const { data: packagesResponse, isLoading: isLoadingPackages } = useServicePackages(queryParams);
  const { data: tagsResponse, isLoading: isLoadingTags } = useServiceTags();
  
  // Chuẩn bị danh sách tags
  const allServiceTags = useMemo(() => {
    return ['All', ...(tagsResponse?.data || [])];
  }, [tagsResponse]);

  // ===== CALLBACK HANDLERS =====
  // 1. Drawer handlers
  const openDrawer = useCallback(() => {
    setDrawerState(prev => ({ ...prev, visible: true }));
    setTempSelectedKeys(selectedPackages.map(pkg => pkg._id));
    setTempSelectedPackages(selectedPackages);
  }, [selectedPackages]);
  
  const closeDrawer = useCallback(() => {
    setDrawerState(prev => ({ ...prev, visible: false }));
  }, []);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDrawerState(prev => ({ ...prev, searchText: e.target.value }));
  }, []);
  
  const handleDrawerTagClick = useCallback((tag: string) => {
    setDrawerState(prev => ({ ...prev, activeTag: tag }));
  }, []);
  
  const handleTempSelectChange = useCallback((newSelectedKeys: React.Key[], selectedRows: ServicePackage[]) => {
    setTempSelectedKeys(newSelectedKeys);
    setTempSelectedPackages(selectedRows);
  }, []);
  
  const confirmSelection = useCallback(() => {
    setSelectedPackages(tempSelectedPackages);
    closeDrawer();
  }, [tempSelectedPackages, closeDrawer]);
  
  // 2. Selected packages handlers
  const handleSelectedTagClick = useCallback((tag: string) => {
    setSelectedActiveTag(tag);
  }, []);
  
  const handlePriceChange = useCallback((id: string, value: number | null) => {
    if (value === null) return;
    
    setSelectedPackages(prev => 
      prev.map(pkg => 
        pkg._id === id 
          ? { ...pkg, totalPrice: value } 
          : pkg
      )
    );
  }, []);
  
  const handleHoursChange = useCallback((id: string, value: number | null) => {
    if (value === null) return;
    
    setSelectedPackages(prev => {
      return prev.map(pkg => {
        if (pkg._id !== id) return pkg;
        
        const currentMinutes = pkg.estimatedTime % 60;
        const newEstimatedTime = (value * 60) + currentMinutes;
        
        return { ...pkg, estimatedTime: newEstimatedTime };
      });
    });
  }, []);
  
  const handleMinutesChange = useCallback((id: string, value: number | null) => {
    if (value === null) return;
    
    setSelectedPackages(prev => {
      return prev.map(pkg => {
        if (pkg._id !== id) return pkg;
        
        const currentHours = Math.floor(pkg.estimatedTime / 60);
        const newEstimatedTime = (currentHours * 60) + value;
        
        return { ...pkg, estimatedTime: newEstimatedTime };
      });
    });
  }, []);
  
  const handleDeleteSelectedItem = useCallback((record: ServicePackage) => {
    setSelectedPackages(prev => prev.filter(pkg => pkg._id !== record._id));
  }, []);
  
  // 3. Navigation handlers
  const handleSubmit = useCallback(() => {
    updateFormData({
      services: selectedPackages,
    });
    onNext();
  }, [selectedPackages, updateFormData, onNext]);
  
  // ===== DERIVED STATE =====
  // Lọc các gói dịch vụ đã chọn dựa trên tag đang active
  const filteredSelectedPackages = useMemo(() => {
    if (selectedActiveTag === 'All') {
      return selectedPackages;
    }
    
    return selectedPackages.filter(pkg => 
      pkg.tags.includes(selectedActiveTag)
    );
  }, [selectedPackages, selectedActiveTag]);
  
  // ===== COMPONENT RENDER =====
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
              <TagsList 
                tags={allServiceTags} 
                activeTag={selectedActiveTag} 
                onTagClick={handleSelectedTagClick} 
              />
            </div>
            
            {selectedPackages.length > 0 ? (
              <SelectedPackagesTable 
                packages={filteredSelectedPackages}
                onPriceChange={handlePriceChange}
                onHoursChange={handleHoursChange}
                onMinutesChange={handleMinutesChange}
                onDeleteItem={handleDeleteSelectedItem}
              />
            ) : (
              <Empty description="No packages selected" />
            )}
          </Card>
        </Col>
      </Row>
      
      {/* Package Selection Drawer */}
      <PackageSelectionDrawer 
        visible={drawerState.visible}
        packages={packagesResponse?.data || []} 
        isLoading={isLoadingPackages}
        selectedKeys={tempSelectedKeys}
        onSelectChange={handleTempSelectChange}
        searchText={drawerState.searchText}
        onSearchChange={handleSearchChange}
        tags={allServiceTags}
        activeTag={drawerState.activeTag}
        onTagClick={handleDrawerTagClick}
        onClose={closeDrawer}
        onConfirm={confirmSelection}
      />
      
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
