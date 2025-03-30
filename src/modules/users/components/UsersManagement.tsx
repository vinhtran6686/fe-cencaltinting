import React, { useState, useEffect } from 'react';
import { User } from '../../../models/User';
import { UserService } from '../services/userService';
import { getErrorMessage } from '../../../services/errorService';

/**
 * Component for managing users (list, search, delete)
 */
const UsersManagement: React.FC = () => {
  // State for users data
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Initially fetch users
  useEffect(() => {
    fetchUsers();
  }, [page]);
  
  /**
   * Fetch users with pagination
   */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await UserService.getUsers(page, limit);
      
      setUsers(response.data);
      setTotal(response.total);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Handle user search
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // If search is empty, reset to first page and load all users
      setPage(1);
      return fetchUsers();
    }
    
    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);
      
      const response = await UserService.searchUsers(searchQuery, 1, limit);
      
      setUsers(response.data);
      setTotal(response.total);
      setPage(1);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };
  
  /**
   * Clear search and show all users
   */
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setPage(1);
    fetchUsers();
  };
  
  /**
   * Delete a user
   */
  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      await UserService.deleteUser(userId);
      
      // Remove user from state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      // Refresh user list if we deleted the last item on the page
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchUsers();
      }
      
      alert('User deleted successfully');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  
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
        <button type="submit" className="btn-search" disabled={loading}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
        {isSearching && (
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
      {error && <div className="error-message">{error}</div>}
      
      {/* Users Table */}
      {loading && users.length === 0 ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">No users found</div>
      ) : (
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
              {users.map(user => (
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
                      disabled={loading}
                    >
                      Delete
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
              disabled={page === 1 || loading}
              className="btn-prev"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {Math.ceil(total / limit)}
            </span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / limit) || loading}
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

export default UsersManagement; 