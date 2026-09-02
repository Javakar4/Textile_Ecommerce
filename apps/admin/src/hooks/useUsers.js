import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';

export function useUsersQuery(filters) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
  });
}

export function useUserDetailsQuery(userId) {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: () => userService.getUserDetails(userId),
    enabled: !!userId,
  });
}

export function useUpdateUserStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }) => userService.updateUserStatus(userId, status),
    onSuccess: (data, variables) => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Invalidate specific user details
      queryClient.invalidateQueries({ queryKey: ['user-details', variables.userId] });
    },
  });
}

export function useUpdateUserRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => userService.updateUserRole(userId, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user-details', variables.userId] });
    },
  });
}
