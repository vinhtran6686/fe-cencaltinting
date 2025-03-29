import React, { useState } from 'react';
import { useUsers, useSearchUsers, useDeleteUser } from '../hooks/useUsers';

/**
 * Component for managing users (list, search, delete) using React Query
 */
const UsersManagementWithQuery: React.FC = () => {
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
  
  // Get users with React Query
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
    refetch: refetchUsers
  } = useUsers(page, limit);
  
  // Search users with React Query
  const {
    data: searchData,
    isLoading: isSearching,
    isError: isSearchError,
    error: searchError
  } = useSearchUsers(searchQuery, page, limit);
  
  // Delete user mutation
  const deleteUser = useDeleteUser();
  
  // Determine which data to display
  const data = searchEnabled && searchQuery ? searchData : usersData;
  
  // Determine loading state
  const isLoading = searchEnabled ? isSearching : isLoadingUsers;
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setSearchEnabled(true);
      setPage(1);
    } else {
      setSearchEnabled(false);
    }
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchEnabled(false);
    setPage(1);
  };
  
  // Handle user deletion
  const handleDeleteUser = (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    deleteUser.mutate(userId, {
      onSuccess: () => {
        alert('User deleted successfully!');
      },
      onError: (err) => {
        alert(`Error deleting user: ${(err as Error).message}`);
      }
    });
  };
  
  // Error handling
  const errorMessage = isUsersError || isSearchError 
    ? (usersError as Error)?.message || (searchError as Error)?.message
    : deleteUser.error
      ? (deleteUser.error as Error).message
      : null;
  
  return (
    <div className="users-management">
      <h1>Users Management</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name or email"
          className="search-input"
        />
        <button 
          type="submit" 
          className="btn-search" 
          disabled={isLoading || deleteUser.isPending}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
        
        {searchEnabled && (
          <button 
            type="button" 
            onClick={handleClearSearch} 
            className="btn-clear-search"
          >
            Clear Search
          </button>
        )}
      </form>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
          <button onClick={() => refetchUsers()}>Retry</button>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && !data && (
        <div className="loading">Loading users...</div>
      )}
      
      {/* Empty State */}
      {!isLoading && (!data || data.data.length === 0) && (
        <div className="empty-state">No users found</div>
      )}
      
      {/* Users Table */}
      {data && data.data.length > 0 && (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="actions">
                    <button 
                      onClick={() => window.location.href = `/users/${user.id}`}
                      className="btn-view"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => window.location.href = `/users/${user.id}/edit`}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn-delete"
                      disabled={deleteUser.isPending}
                    >
                      {deleteUser.isPending ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading || deleteUser.isPending}
              className="btn-prev"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {Math.ceil(data.total / limit) || 1}
            </span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={
                page >= Math.ceil(data.total / limit) || 
                isLoading || 
                deleteUser.isPending
              }
              className="btn-next"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersManagementWithQuery; 