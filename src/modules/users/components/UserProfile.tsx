import React, { useEffect, useState } from 'react';
import { User, UserUpdateInput } from '../../../models/User';
import { UserService } from '../services/userService';
import { getErrorMessage } from '../../../services/errorService';

/**
 * Component to display and edit user profile
 */
const UserProfile: React.FC = () => {
  // State for user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserUpdateInput>({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  /**
   * Fetch current user profile data
   */
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await UserService.getCurrentUser();
      setUser(userData);
      
      // Initialize form data with user data
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      });
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  
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
    
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = await UserService.updateUser(user.id, formData);
      
      setUser(updatedUser);
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading state
  if (loading && !user) {
    return <div className="loading">Loading profile...</div>;
  }
  
  // Show error state
  if (error && !user) {
    return <div className="error">{error}</div>;
  }
  
  // Show empty state
  if (!user) {
    return <div className="empty-state">No user data available</div>;
  }
  
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      
      {error && <div className="error-message">{error}</div>}
      
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
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
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

export default UserProfile; 