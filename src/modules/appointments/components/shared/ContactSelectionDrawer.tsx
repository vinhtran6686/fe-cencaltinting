import React, { useState, useCallback, useEffect } from 'react';
import { Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@/components/common/Button';
import { CustomDrawer } from '@/components/common/Drawer';
import { Input } from '@/components/common/Input';
import { ContactResponse } from '@/modules/appointments/services/contactsService';
import { Table } from '@/components/common/Table';
import { Checkbox } from '@/components/common/Checkbox';
import styled from '@emotion/styled';
import { colors, spacing, borderRadius } from '@/theme/tokens';
import Image from 'next/image';

interface ContactSelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (contactId: string) => void;
  onAddContactClick: () => void;
  contacts: ContactResponse[] | undefined;
  isLoading: boolean;
}

// Styled components
const SearchContainer = styled.div`
  flex: 1;
`;

const StyledSearchInput = styled(Input)`
  background-color: ${colors.formItemBackground};
  height: 48px;
  border-color: ${colors.formItemBackground};
  border-radius: ${borderRadius.lg};
  display: flex;
  gap: 10px;
  padding: 0 ${spacing.md};
  &::before {
    content: none;
  }
  &::placeholder {
    color: ${colors.placeholder};
    font-style: italic;
  } 
`;

const ActionContainer = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
`;

const TableContainer = styled.div`
  width: 100%;
  height: max-content;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
   
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  } 
  &::-webkit-scrollbar-track {
    background: ${colors.grayscale900};
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.grayscale400};
    border-radius: ${borderRadius.sm};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.grayscale600};
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchIcon = () => (
  <Image
    src="/images/icons/sidebar/search-lg.svg"
    alt="search"
    width={20}
    height={20}
    onError={(e) => {
      // Fallback to Ant Design icon if image fails to load
      e.currentTarget.onerror = null;
      e.currentTarget.style.display = 'none';
      const fallbackIcon = document.createElement('span');
      fallbackIcon.innerHTML = '<span class="anticon anticon-search"><svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span>';
      e.currentTarget.parentNode?.appendChild(fallbackIcon);
    }}
  />
);

const ContactSelectionDrawer: React.FC<ContactSelectionDrawerProps> = ({
  open,
  onClose,
  onSelect,
  onAddContactClick,
  contacts = [],
  isLoading,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState('1133px');

  // Handle window resize for responsive drawer width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1133) {
        setDrawerWidth('100vw');
      } else {
        setDrawerWidth('1133px');
      }
    };
    
    // Set initial width
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter contacts by search text
  const filteredContacts = contacts
    ? contacts.filter((contact: ContactResponse) => {
      if (!searchText) return true;
      const lowerCaseSearch = searchText.toLowerCase();
      return (
        contact.name?.toLowerCase().includes(lowerCaseSearch) ||
        contact.email?.toLowerCase().includes(lowerCaseSearch) ||
        contact.phone?.toLowerCase().includes(lowerCaseSearch)
      );
    })
    : [];

  // Define table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: ContactResponse) => (
        <Checkbox
          checked={selectedContactId === record._id}
          onChange={() => setSelectedContactId(record._id)}
          disabled={selectedContactId !== null && selectedContactId !== record._id}
        />
      ),
    },
  ];

  // Handle contact selection
  const handleContactSelect = useCallback(() => {
    if (selectedContactId) {
      onSelect(selectedContactId);
      setSelectedContactId(null);
    }
  }, [selectedContactId, onSelect]);

  // Reset state when drawer closes
  const handleClose = useCallback(() => {
    setSelectedContactId(null);
    setSearchText('');
    onClose();
  }, [onClose]);

  // Handle add contact button click
  const handleAddContactClick = useCallback(() => {
    setIsAddingContact(true);
    onAddContactClick();
    // Reset when drawer closes
    setTimeout(() => setIsAddingContact(false), 500);
  }, [onAddContactClick]);

  return (
    <CustomDrawer
      title="Contact"
      open={open}
      onClose={handleClose}
      onSave={handleContactSelect}
      width={drawerWidth}
      cancelText="Cancel"
      saveText="Select"
      disableSave={!selectedContactId}
    >
      <DrawerContent>
        <ActionContainer>
          <SearchContainer>
            <StyledSearchInput
              placeholder="Search by name, phone number or email"
              prefix={<SearchIcon />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchContainer>
          <Button
            icon={isAddingContact ? <Spin size="small" /> : <PlusOutlined />}
            onClick={handleAddContactClick}
            color="default"
            variant="outlined"
            style={{ width: 48, height: 48 }}
            size="large"
            disabled={isAddingContact}
          />
        </ActionContainer>
        <TableContainer>
          <Table
            columns={columns}
            dataSource={filteredContacts}
            rowKey="_id"
            loading={isLoading}
            pagination={false}
          // scroll={{ y: 'calc(100vh - 350px)' }}
          />
        </TableContainer>
      </DrawerContent>
    </CustomDrawer>
  );
};

export default ContactSelectionDrawer; 