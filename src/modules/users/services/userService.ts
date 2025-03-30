import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { User, UserCreateInput, UserUpdateInput, UserListResponse } from '../../../models/User';

/**
 * Service for handling user-related API requests
 */
export class UserService {
  /**
   * Get the current logged-in user's information
   * @returns Promise with user data
   */
  static async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.USERS.ME);
    return response.data;
  }

  /**
   * Get a paginated list of users
   * @param page Page number (starts at 1)
   * @param limit Number of items per page
   * @returns Promise with paginated user list
   */
  static async getUsers(page = 1, limit = 10): Promise<UserListResponse> {
    const response = await apiService.get<UserListResponse>(
      API_ENDPOINTS.USERS.LIST,
      { page, limit },
      {
        showSuccessNotification: true,
      }
    );
    return response.data;
  }

  /**
   * Get details for a specific user by ID
   * @param id User ID
   * @returns Promise with user data
   */
  static async getUserById(id: number): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.USERS.DETAIL(id));
    return response.data;
  }

  /**
   * Create a new user
   * @param userData User data to create
   * @returns Promise with created user
   */
  static async createUser(userData: UserCreateInput): Promise<User> {
    const response = await apiService.post<User>(
      API_ENDPOINTS.USERS.LIST,
      userData
    );
    return response.data;
  }

  /**
   * Update an existing user
   * @param id User ID
   * @param userData User data to update
   * @returns Promise with updated user
   */
  static async updateUser(id: number, userData: UserUpdateInput): Promise<User> {
    const response = await apiService.put<User>(
      API_ENDPOINTS.USERS.UPDATE(id),
      userData
    );
    return response.data;
  }

  /**
   * Delete a user by ID
   * @param id User ID to delete
   * @returns Promise that resolves when deletion is complete
   */
  static async deleteUser(id: number): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USERS.DELETE(id));
  }

  /**
   * Search users by query
   * @param query Search query string
   * @param page Page number
   * @param limit Items per page
   * @returns Promise with search results
   */
  static async searchUsers(query: string, page = 1, limit = 10): Promise<UserListResponse> {
    const response = await apiService.get<UserListResponse>(
      API_ENDPOINTS.USERS.LIST,
      { search: query, page, limit }
    );
    return response.data;
  }
} 