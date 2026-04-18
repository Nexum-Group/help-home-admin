// src/hooks/useDashboard.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import updateProviderStatus, { getAllProviders, getProvider } from '../services/user.service';
import { ProviderDetail, ProviderWithServiceRequestsCount } from '../types/provider';
import { ProviderStatus } from '../types/provider-status';

interface UseGetAllProvidersParams {
  search?: string;
  categoryId?: string;
  status?: ProviderStatus;
  page?: number;
}

export function useGetAllProviders(params?: UseGetAllProvidersParams) {
  const { search, categoryId, status, page = 1 } = params || {};

  return useQuery<unknown>({
    queryKey: ['all-providers', search, categoryId, status, page],
    queryFn: async () => {
      const response = await getAllProviders({ search, categoryId, status, page });
      if (Array.isArray(response)) {
        return { results: response, count: response.length, next: null, previous: null };
      }
      return response;
    },
  });
}

export function useUpdateProviderStatus() {
  return useMutation({
    mutationFn: ({
      providerUuid,
      data,
    }: {
      providerUuid: string;
      data: { approval_status: ProviderStatus };
    }) => updateProviderStatus(providerUuid, data),
  });
}

export function useProviderDetail(providerUuid: string) {
  return useQuery<ProviderDetail>({
    queryKey: ['user-detail', providerUuid],
    queryFn: () => getProvider(providerUuid),
  });
}
