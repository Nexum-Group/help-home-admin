import { apiFetch } from '../lib/api';
import { ProviderStatus } from '../types/provider-status';

interface GetUsersParams {
  search?: string;
  role?: 'client' | 'provider';
  page?: number;
}
interface GetProvidersParams {
  search?: string;
  categoryId?: string;
  status?: ProviderStatus;
  page?: number;
}

export function getAllUsers(params?: GetUsersParams) {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('role', params.role);
  if (params?.page) query.append('page', params.page.toString());
  return apiFetch(`/users/all/?${query.toString()}`, {
    method: 'GET',
  });
}

export function getAllProviders(params?: GetProvidersParams) {
  const query = new URLSearchParams();
  if (params?.categoryId) query.append('category_id', params.categoryId);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('approval_status', params.status);
  if (params?.page) query.append('page', params.page.toString());
  return apiFetch(`/providers/?${query.toString()}`, {
    method: 'GET',
  });
}

export function getUser(userUuid: string) {
  return apiFetch(`/users/all/${userUuid}/`, {
    method: 'GET',
  });
}

export function getProvider(providerUuid: string) {
  return apiFetch(`/providers/${providerUuid}/`, {
    method: 'GET',
  });
}

export default function updateProviderStatus(
  providerUuid: string,
  data: { approval_status: ProviderStatus }
) {
  return apiFetch(`/providers/${providerUuid}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
