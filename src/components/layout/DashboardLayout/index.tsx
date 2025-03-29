import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Layout component for dashboard area with navigation tabs
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Determine active tab based on current path
  const isProfileActive = currentPath === '/dashboard/profile' || currentPath === '/dashboard';
  const isUsersActive = currentPath === '/dashboard/users';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Management System</h1>
        <nav className="app-nav">
          <Link href="/dashboard/profile" className={`nav-item ${isProfileActive ? 'active' : ''}`}>
            My Profile
          </Link>
          <Link href="/dashboard/users" className={`nav-item ${isUsersActive ? 'active' : ''}`}>
            Manage Users
          </Link>
        </nav>
      </header>

      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;