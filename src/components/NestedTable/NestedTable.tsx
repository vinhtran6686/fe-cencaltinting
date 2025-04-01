import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Button } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { TableProps } from 'antd/es/table';
import { colors, spacing } from '../../theme/tokens';

export type NestedTableProps<RecordType = any> = Omit<TableProps<RecordType>, 'expandable' | 'rowSelection'> & {
  expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => React.ReactNode;
  onChildSelect?: (parentRecord: RecordType, childIds: React.Key[]) => void;
  selectAllChildren?: boolean;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
  selectedRowKeys?: React.Key[];
  selectable?: boolean;
};

interface NestedRowSelectionState {
  [parentKey: string]: {
    parent: boolean;
    children: React.Key[];
    allChildren: React.Key[];
  };
}

const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    .ant-table {
      border-radius: ${spacing.xs};
      
      .ant-table-thead > tr > th {
        background-color: ${colors.backgroundLight};
        font-weight: 600;
        color: ${colors.textPrimary};
      }
      
      .ant-table-nested {
        margin: 0 !important;
      }
      
      .ant-table-row-expand-icon {
        transition: transform 0.2s;
      }
      
      .ant-table-row-expanded .ant-table-row-expand-icon {
        transform: rotate(90deg);
      }
      
      .ant-table-expanded-row > .ant-table-cell {
        background-color: ${colors.backgroundLight};
        padding: 0 !important;
      }
      
      .sub-table-container {
        padding: ${spacing.sm} ${spacing.xl};
      }
    }
  }
`;

const SelectAllButton = styled(Button)`
  margin-bottom: ${spacing.sm};
`;

const ExpandIcon = styled.span`
  cursor: pointer;
  transition: transform 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &.expanded {
    transform: rotate(90deg);
  }
`;

/**
 * NestedTable component - Enhanced table for hierarchical data with selection capabilities
 */
export const NestedTable = <RecordType extends object = any>({
  expandedRowRender,
  onChildSelect,
  selectAllChildren = true,
  onSelectionChange,
  selectedRowKeys: propSelectedRowKeys,
  selectable = true,
  rowKey = 'key',
  className,
  ...props
}: NestedTableProps<RecordType> & { rowKey?: string | ((record: RecordType) => React.Key), className?: string }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(propSelectedRowKeys || []);
  const [nestedSelection, setNestedSelection] = useState<NestedRowSelectionState>({});
  
  // Update selected keys if prop changes
  useEffect(() => {
    if (propSelectedRowKeys) {
      setSelectedRowKeys(propSelectedRowKeys);
    }
  }, [propSelectedRowKeys]);
  
  // Get row key helper
  const getRecordKey = (record: RecordType): React.Key => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey as string];
  };
  
  // Initialize nested selection state
  const initializeNestedSelection = (data: readonly RecordType[]) => {
    const newNestedSelection: NestedRowSelectionState = {};
    
    const processRecords = (records: readonly RecordType[], parentKey?: string) => {
      records.forEach(record => {
        const recordKey = getRecordKey(record);
        const children = ((record as any).children || []) as readonly RecordType[];
        
        if (children.length > 0) {
          const childKeys = children.map(child => getRecordKey(child));
          
          newNestedSelection[recordKey.toString()] = {
            parent: false,
            children: [],
            allChildren: childKeys,
          };
          
          processRecords(children, recordKey.toString());
        }
      });
    };
    
    processRecords(data);
    setNestedSelection(newNestedSelection);
  };
  
  // Initialize on data change
  useEffect(() => {
    if (props.dataSource) {
      initializeNestedSelection(props.dataSource);
    }
  }, [props.dataSource]);
  
  // Handle row expansion
  const handleExpand = (expanded: boolean, record: any) => {
    const key = getRecordKey(record as RecordType);
    
    if (expanded) {
      setExpandedRowKeys(prev => [...prev, key]);
    } else {
      setExpandedRowKeys(prev => prev.filter(k => k !== key));
    }
  };
  
  // Handle row selection
  const handleSelect = (record: any, selected: boolean) => {
    const typedRecord = record as RecordType;
    const recordKey = getRecordKey(typedRecord);
    
    let newSelectedKeys = [...selectedRowKeys];
    const hasChildren = (typedRecord as any).children && (typedRecord as any).children.length > 0;
    
    if (hasChildren) {
      const childKeys = ((typedRecord as any).children?.map((child: RecordType) => getRecordKey(child))) || [];
      
      if (selected) {
        // Select parent and all children
        newSelectedKeys = [...newSelectedKeys, recordKey, ...childKeys];
        
        if (nestedSelection[recordKey.toString()]) {
          setNestedSelection(prev => ({
            ...prev,
            [recordKey.toString()]: {
              ...prev[recordKey.toString()],
              parent: true,
              children: childKeys,
            },
          }));
        }
      } else {
        // Deselect parent and all children
        newSelectedKeys = newSelectedKeys.filter(
          key => key !== recordKey && !childKeys.includes(key)
        );
        
        if (nestedSelection[recordKey.toString()]) {
          setNestedSelection(prev => ({
            ...prev,
            [recordKey.toString()]: {
              ...prev[recordKey.toString()],
              parent: false,
              children: [],
            },
          }));
        }
      }
      
      // Notify about child selection
      onChildSelect?.(typedRecord, selected ? childKeys : []);
    } else {
      // Simple row selection
      if (selected) {
        newSelectedKeys.push(recordKey);
      } else {
        newSelectedKeys = newSelectedKeys.filter(key => key !== recordKey);
      }
      
      // Check if this is a child of a parent we're tracking
      Object.keys(nestedSelection).forEach(parentKey => {
        const parentRecord = props.dataSource?.find(
          r => getRecordKey(r).toString() === parentKey
        );
        
        if (parentRecord) {
          const allChildKeys = ((parentRecord as any).children?.map((child: RecordType) => getRecordKey(child))) || [];
          
          if (allChildKeys.includes(recordKey)) {
            const childKeys = selected
              ? [...nestedSelection[parentKey].children, recordKey]
              : nestedSelection[parentKey].children.filter(k => k !== recordKey);
            
            const parentSelected = childKeys.length === allChildKeys.length;
            
            setNestedSelection(prev => ({
              ...prev,
              [parentKey]: {
                ...prev[parentKey],
                parent: parentSelected,
                children: childKeys,
              },
            }));
            
            // Update parent selection state
            if (parentSelected && !newSelectedKeys.includes(parentKey)) {
              newSelectedKeys.push(parentKey);
            } else if (!parentSelected && newSelectedKeys.includes(parentKey)) {
              newSelectedKeys = newSelectedKeys.filter(key => key !== parentKey);
            }
            
            // Notify about child selection
            onChildSelect?.(
              parentRecord,
              childKeys
            );
          }
        }
      });
    }
    
    // Remove duplicates
    newSelectedKeys = [...new Set(newSelectedKeys)];
    
    setSelectedRowKeys(newSelectedKeys);
    
    // Find all selected rows for the callback
    const selectedRows = props.dataSource?.filter(record => 
      newSelectedKeys.includes(getRecordKey(record))
    ) || [];
    
    onSelectionChange?.(newSelectedKeys, selectedRows);
  };
  
  // Handle select all children
  const handleSelectAllChildren = (parentRecord: RecordType, selected: boolean) => {
    const parentKey = getRecordKey(parentRecord);
    const childKeys = ((parentRecord as any).children?.map((child: RecordType) => getRecordKey(child))) || [];
    
    let newSelectedKeys = [...selectedRowKeys];
    
    if (selected) {
      // Select parent and all children
      newSelectedKeys = [...newSelectedKeys, parentKey, ...childKeys];
      
      setNestedSelection(prev => ({
        ...prev,
        [parentKey.toString()]: {
          ...prev[parentKey.toString()],
          parent: true,
          children: childKeys,
        },
      }));
    } else {
      // Deselect parent and all children
      newSelectedKeys = newSelectedKeys.filter(
        key => key !== parentKey && !childKeys.includes(key)
      );
      
      setNestedSelection(prev => ({
        ...prev,
        [parentKey.toString()]: {
          ...prev[parentKey.toString()],
          parent: false,
          children: [],
        },
      }));
    }
    
    // Remove duplicates
    newSelectedKeys = [...new Set(newSelectedKeys)];
    
    setSelectedRowKeys(newSelectedKeys);
    
    // Find all selected rows for the callback
    const selectedRows = props.dataSource?.filter(record => 
      newSelectedKeys.includes(getRecordKey(record))
    ) || [];
    
    onSelectionChange?.(newSelectedKeys, selectedRows);
    onChildSelect?.(parentRecord, selected ? childKeys : []);
  };
  
  // Render nested table
  const customExpandedRowRender = (record: any, index: number, indent: number, expanded: boolean) => {
    const typedRecord = record as RecordType;
    if (!(typedRecord as any).children || (typedRecord as any).children.length === 0) {
      return expandedRowRender?.(typedRecord, index, indent, expanded);
    }
    
    const childRecords = (typedRecord as any).children;
    const recordKey = getRecordKey(typedRecord);
    const childSelection = nestedSelection[recordKey.toString()];
    const allChildrenSelected = childSelection?.parent;
    
    return (
      <div className="sub-table-container">
        {selectAllChildren && childRecords.length > 0 && (
          <SelectAllButton 
            type="link" 
            size="small"
            onClick={() => handleSelectAllChildren(typedRecord, !allChildrenSelected)}
          >
            {allChildrenSelected ? 'Deselect all' : 'Select all'}
          </SelectAllButton>
        )}
        
        <Table
          columns={props.columns}
          dataSource={childRecords}
          pagination={false}
          rowKey={rowKey}
          showHeader={false}
          rowSelection={selectable ? {
            selectedRowKeys,
            onSelect: handleSelect,
            getCheckboxProps: () => ({
              disabled: false,
            }),
          } : undefined}
          className="nested-table"
        />
      </div>
    );
  };
  
  // Custom expand icon
  const customExpandIcon = (expandProps: any) => {
    const { expanded, onExpand, record } = expandProps;
    
    return (
      <ExpandIcon
        className={expanded ? 'expanded' : ''}
        onClick={e => {
          onExpand(record, e);
          e.stopPropagation();
        }}
      >
        {expanded ? <DownOutlined /> : <RightOutlined />}
      </ExpandIcon>
    );
  };

  // Create an options object with all necessary props
  const tableProps = {
    ...props,
    expandable: {
      onExpand: handleExpand,
      expandedRowKeys,
      expandedRowRender: customExpandedRowRender,
      expandIcon: customExpandIcon,
    },
    rowSelection: selectable ? {
      selectedRowKeys,
      onSelect: handleSelect,
      getCheckboxProps: () => ({
        disabled: false,
      }),
    } : undefined,
    className
  };

  // Use type assertion to work around TypeScript limitations
  return <StyledTable {...tableProps as any} />;
};

export default NestedTable; 