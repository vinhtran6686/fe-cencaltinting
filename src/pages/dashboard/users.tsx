import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import UsersManagementWithQuery from '../../components/UsersManagementWithQuery';

/**
 * Users management page
 */
const UsersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <UsersManagementWithQuery />
    </DashboardLayout>
  );
};

export default UsersPage;