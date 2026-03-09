import { apiFetch } from '../lib/api';
import { ProviderStatus } from '../types/provider-status';

interface GetUsersParams {
  search?: string;
  role?: 'client' | 'provider';
}
interface GetProvidersParams {
  search?: string;
  categoryId?: string;
  status?: ProviderStatus;
}

export function getAllUsers(params?: GetUsersParams) {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('role', params.role);
  return apiFetch(`/user/all-users/?${query.toString()}`, {
    method: 'GET',
  });
}

export function getAllProviders(params?: GetProvidersParams) {
  const query = new URLSearchParams();
  if (params?.categoryId) query.append('category_id', params.categoryId);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('approval_status', params.status);
  return apiFetch(`/user/all-providers/?${query.toString()}`, {
    method: 'GET',
  });
}

export function getUser(userUuid: string) {
  return apiFetch(`/user/detail/${userUuid}/`, {
    method: 'GET',
  });
}

export function getProvider(providerUuid: string) {
  return apiFetch(`/user/detail/provider/${providerUuid}/`, {
    method: 'GET',
  });
}

export default function updateProviderStatus(
  providerUuid: string,
  data: { approval_status: ProviderStatus }
) {
  return apiFetch(`/user/approve-provider/${providerUuid}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
