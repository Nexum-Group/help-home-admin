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

interface UseGetAllUsersParams {
  search?: string;
  role?: 'client' | 'provider';
  page?: number;
}

interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export function useGetAllUsers(params?: UseGetAllUsersParams) {
  const { search, role, page = 1 } = params || {};

  return useQuery<unknown>({
    queryKey: ['all-users', search, role, page],
    queryFn: async () => {
      const response = await getAllUsers({ search, role, page });
      if (Array.isArray(response)) {
        return { results: response, count: response.length, next: null, previous: null };
      }
      return response as PaginatedResponse<AllUsers>;
    },
  });
}
export function useUserDetail(userUuid: string) {
  return useQuery<UserDetail>({
    queryKey: ['user-detail', userUuid],
    queryFn: () => getUser(userUuid),
  });
}
