// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { getAllProviders } from "../services/user.service"
import { ProviderWithServiceRequestsCount } from "../types/provider"
import { ProviderStatus } from "../types/provider-status"


export function useGetAllProviders(search?: string, categoryId?: string, status?: ProviderStatus) {
  return useQuery<ProviderWithServiceRequestsCount[]>({
    queryKey: ["all-providers", search, categoryId, status],
    queryFn: () => getAllProviders({ search, categoryId, status }),
  })
}