import React, { useState } from 'react';
import { useCurrentUser, useUpdateUser } from '../hooks/useUsers';
import { UserUpdateInput } from '../../../models/User';

/**
 * Component to display and edit user profile using React Query
 */
const UserProfileWithQuery: React.FC = () => {
  // Get current user with React Query
  const { 
    data: user, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useCurrentUser();
  
  // Form state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserUpdateInput>({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Update user mutation
  const updateUser = useUpdateUser();
  
  // Initialize form when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);
  
  /**
   * Handle input changes in the edit form
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  /**
   * Submit form to update user profile
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    updateUser.mutate(
      { id: user.id, data: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
          // Show success message
          alert('Profile updated successfully!');
        },
        onError: (err: any) => {
          alert(`Error updating profile: ${err.message}`);
        }
      }
    );
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }
  
  // Show error state
  if (isError) {
    return (
      <div className="error">
        <p>Error loading profile: {(error as Error).message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  // Show empty state
  if (!user) {
    return <div className="empty-state">No user data available</div>;
  }
  
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      
      {updateUser.error && (
        <div className="error-message">
          Error: {(updateUser.error as Error).message}
        </div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
              disabled={updateUser.isPending}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="profile-field">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="profile-field">
            <strong>First Name:</strong> {user.firstName}
          </div>
          <div className="profile-field">
            <strong>Last Name:</strong> {user.lastName}
          </div>
          <div className="profile-field">
            <strong>Role:</strong> {user.role}
          </div>
          <div className="profile-field">
            <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </div>
          
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-edit"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileWithQuery; 