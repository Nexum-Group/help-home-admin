// src/hooks/useDashboard.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import updateProviderStatus, { getAllProviders, getProvider } from '../services/user.service';
import { ProviderDetail, ProviderWithServiceRequestsCount } from '../types/provider';
import { ProviderStatus } from '../types/provider-status';

export function useGetAllProviders(search?: string, categoryId?: string, status?: ProviderStatus) {
  return useQuery<unknown>({
    queryKey: ['all-providers', search, categoryId, status],
    queryFn: async () => {
      const response = await getAllProviders({ search, categoryId, status });
      return Array.isArray(response) ? response : response.results || [];
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
