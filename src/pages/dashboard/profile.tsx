import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import UserProfileWithQuery from '../../components/UserProfileWithQuery';

/**
 * User profile page
 */
const ProfilePage: React.FC = () => {
  return (
    <DashboardLayout>
      <UserProfileWithQuery />
    </DashboardLayout>
  );
};

export default ProfilePage;