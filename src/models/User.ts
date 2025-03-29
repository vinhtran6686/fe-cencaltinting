/**
 * User model interfaces for the application
 */

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Input for creating a new user
 */
export interface UserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Input for updating an existing user
 */
export interface UserUpdateInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

/**
 * User with authentication tokens
 */
export interface AuthenticatedUser extends User {
  token: string;
  refreshToken: string;
}

/**
 * Response from paginated user list API
 */
export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
} 