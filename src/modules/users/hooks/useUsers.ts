import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { User, UserUpdateInput, UserCreateInput } from '../../../models/User';

/**
 * Hook for fetching the current logged-in user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserService.getCurrentUser(),
  });
};

/**
 * Hook for fetching a paginated list of users
 */
export const useUsers = (page = 1, limit = 10, options ={}) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => UserService.getUsers(page, limit),
    placeholderData: (previousData) => previousData, 
    ...options
  });
};

/**
 * Hook for fetching details of a specific user
 */
export const useUserDetails = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserById(userId),
    enabled: !!userId, // Only run the query if userId is provided
  });
};

/**
 * Hook for creating a new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: UserCreateInput) => UserService.createUser(userData),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook for updating an existing user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdateInput }) => 
      UserService.updateUser(id, data),
    onSuccess: (updatedUser: User) => {
      // Update cache for this specific user
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
      
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      // Update current user in cache if it's the same user
      const currentUser = queryClient.getQueryData<User>(['currentUser']);
      if (currentUser && currentUser.id === updatedUser.id) {
        queryClient.setQueryData(['currentUser'], updatedUser);
      }
    },
  });
};

/**
 * Hook for deleting a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: number) => UserService.deleteUser(userId),
    onSuccess: (_, userId) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: ['user', userId] });
      
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook for searching users
 */
export const useSearchUsers = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['users', 'search', query, page, limit],
    queryFn: () => UserService.searchUsers(query, page, limit),
    enabled: !!query, // Only run the query if search query is provided
    placeholderData: (previousData) => previousData, // For React Query v4+
  });
}; 