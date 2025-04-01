import React from 'react';
import { Table, Empty } from 'antd';
import styled from '@emotion/styled';
import { TableProps } from 'antd/es/table';
import { colors, spacing } from '../../theme/tokens';

export interface CustomTableProps<RecordType extends object = any> extends Omit<TableProps<RecordType>, 'columns'> {
  columns: any[];
  actionColumn?: boolean;
  actionButtons?: React.ReactNode[];
  emptyState?: React.ReactNode;
  emptyText?: string;
  className?: string;
}

function styledTable<RecordType extends object = any>() {
  return styled(Table<RecordType>)`
    &.ant-table-wrapper {
      .ant-table {
        border-radius: ${spacing.xs};
        
        .ant-table-thead > tr > th {
          background-color: ${colors.backgroundLight};
          font-weight: 600;
          color: ${colors.textPrimary};
        }
        
        .ant-table-tbody > tr > td {
          transition: background-color 0.2s;
        }
        
        .ant-table-tbody > tr:hover > td {
          background-color: ${colors.backgroundHover};
        }
        
        .ant-table-pagination {
          margin: ${spacing.md} 0;
        }
        
        .ant-empty-image {
          height: 60px;
        }
        
        .ant-empty-description {
          color: ${colors.textSecondary};
        }
      }
    }
  `;
}

const ActionsCell = styled.div`
  display: flex;
  gap: ${spacing.xs};
  justify-content: flex-end;
  
  button {
    margin: 0;
  }
`;

export const CustomTable = <RecordType extends object = any>({
  columns,
  actionColumn = false,
  actionButtons,
  emptyState,
  emptyText = 'No data found',
  className,
  ...props
}: CustomTableProps<RecordType>) => {
  const renderEmpty = () => {
    if (emptyState) {
      return emptyState;
    }
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />;
  };

  const tableColumns = React.useMemo(() => {
    if (!actionColumn || !actionButtons || actionButtons.length === 0) {
      return columns;
    }
    
    return [
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        align: 'right' as const,
        render: (_: any, record: RecordType) => (
          <ActionsCell>
            {actionButtons.map((button, index) => (
              <React.Fragment key={index}>
                {button}
              </React.Fragment>
            ))}
          </ActionsCell>
        ),
      },
    ];
  }, [columns, actionColumn, actionButtons]);

  const TableComponent = styledTable<RecordType>();

  return (
    <TableComponent
      columns={tableColumns}
      locale={{ emptyText: renderEmpty }}
      className={className}
      {...props}
    />
  );
};

export default CustomTable; 