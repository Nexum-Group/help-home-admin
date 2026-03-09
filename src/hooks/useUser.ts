import { useQuery } from '@tanstack/react-query';
import { AllUsers, User, UserDetail } from '../types/user';
import { getCurrentUser } from '../services/auth.service';
import { getAllUsers, getUser } from '../services/user.service';

export function useUser() {
  return useQuery<User>({
    queryKey: ['whoami'],
    queryFn: getCurrentUser,
  });
}

export function useGetAllUsers(search?: string, role?: 'client' | 'provider') {
  return useQuery<AllUsers[]>({
    queryKey: ['all-users', search, role],
    queryFn: () => getAllUsers({ search, role }),
  });
}
export function useUserDetail(userUuid: string) {
  return useQuery<UserDetail>({
    queryKey: ['user-detail', userUuid],
    queryFn: () => getUser(userUuid),
  });
}
