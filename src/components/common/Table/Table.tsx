import React from 'react';
import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd/es/table';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { colors, spacing, borderRadius, shadows } from '@/theme/tokens';

export interface TableProps<RecordType> extends AntTableProps<RecordType> {}

// Global styles for table
const GlobalTableStyles = () => (
  <Global
    styles={css`
      .custom-table {
        .ant-table {
          background-color: transparent;
          color: ${colors.textPrimary};
          border: 1px solid ${colors.borderColor};
          border-radius: ${borderRadius.lg};
          
          // Table header
          .ant-table-thead {
            > tr > th {
              background-color: ${colors.grayscale700} !important;
              color: #6E6F76;
              border-bottom: 1px solid ${colors.borderColor};
              font-weight: 700;
              font-size: 14px;
              line-height: 22px;
              padding: 18px ${spacing.md};
              height: 59px;
              
              &::before {
                display: none; // Remove the default border
              }
              
              // Sorted header
              &.ant-table-column-sort {
                background-color: ${colors.grayscale700};
              }
              
              // Hover styles
              &:hover {
                background-color: ${colors.grayscale700} !important;
              }
            }
          }
          
          // Table body
          .ant-table-tbody {
            > tr {
              > td {
                background-color: ${colors.grayscale1000};
                border-bottom: 1px solid ${colors.borderColor};
                color: ${colors.white};
                padding: 18px ${spacing.md};
                height: 59px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                
                // Make "Name" column text bold
                &:first-of-type {
                  font-weight: 700;
                }
              }
              
              // Hover styles
              &:hover > td {
                background-color: #00285F !important;
              }
              
              // Selected styles
              &.ant-table-row-selected > td {
                background-color: ${colors.primary}20;
              }
            }
          }
          
          // Empty state
          .ant-empty {
            color: ${colors.grayscale500};
            
            .ant-empty-description {
              color: ${colors.grayscale500};
            }
          }
          
          .ant-table-cell {
            max-width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        
        // Pagination
        .ant-pagination {
          margin-top: ${spacing.md};
          
          .ant-pagination-item {
            background-color: ${colors.grayscale900};
            border-color: ${colors.borderColor};
            
            a {
              color: ${colors.textPrimary};
            }
            
            &:hover, &.ant-pagination-item-active {
              border-color: ${colors.primary};
              
              a {
                color: ${colors.primary};
              }
            }
          }
          
          .ant-pagination-prev, .ant-pagination-next {
            .ant-pagination-item-link {
              background-color: ${colors.grayscale900};
              border-color: ${colors.borderColor};
              color: ${colors.textPrimary};
              
              &:hover {
                border-color: ${colors.primary};
                color: ${colors.primary};
              }
            }
          }
          
          .ant-pagination-disabled {
            .ant-pagination-item-link {
              color: ${colors.grayscale500};
              border-color: ${colors.borderColor};
              background-color: ${colors.grayscale900};
            }
          }
        }
        
        // Loading
        .ant-spin {
          color: ${colors.primary};
        }
        
        // Scrollbar customization
        .ant-table-body {
          &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          &::-webkit-scrollbar-track {
            background: ${colors.grayscale900};
          }
          
          &::-webkit-scrollbar-thumb {
            background: ${colors.scrollbarThumb};
            border-radius: ${borderRadius.sm};
          }
          
          &::-webkit-scrollbar-thumb:hover {
            background: ${colors.grayscale600};
          }
        }
      }
      
      // Table container styles
      .table-container {
        .ant-table-container {
          border-radius: ${borderRadius.lg};
          overflow: hidden;
        }
        
        // Fix table header radius
        .ant-table-thead > tr:first-child > th:first-child {
          border-top-left-radius: ${borderRadius.lg};
        }
        
        .ant-table-thead > tr:first-child > th:last-child {
          border-top-right-radius: ${borderRadius.lg};
        }
        
        // Fix last row borders
        .ant-table-tbody > tr:last-child > td:first-child {
          border-bottom-left-radius: ${borderRadius.lg};
        }
        
        .ant-table-tbody > tr:last-child > td:last-child {
          border-bottom-right-radius: ${borderRadius.lg};
        }
        
        // Make the table take maximum available height
        .ant-table-body {
          max-height: 100%;
          height: 100%;
        }
      }
    `}
  />
);

export function Table<RecordType extends object = any>(
  props: TableProps<RecordType>
) {
  return (
    <>
      <GlobalTableStyles />
      <AntTable 
        {...props}
        className={`custom-table table-container ${props.className || ''}`}
      />
    </>
  );
}

export default Table; 