import React from 'react';
import QueryProvider from './providers/QueryProvider';
import UserProfileWithQuery from './components/UserProfileWithQuery';
import UsersManagementWithQuery from './components/UsersManagementWithQuery';

/**
 * Main application component with React Query integration
 */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'users'>('profile');

  return (
    <QueryProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>User Management System</h1>
          <nav className="app-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Manage Users
            </button>
          </nav>
        </header>

        <main className="app-content">
          {activeTab === 'profile' ? (
            <UserProfileWithQuery />
          ) : (
            <UsersManagementWithQuery />
          )}
        </main>
      </div>
    </QueryProvider>
  );
};

export default App; 