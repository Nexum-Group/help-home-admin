import { useQuery } from '@tanstack/react-query';
import { ServiceRequest } from '../types/service';
import { ServiceStatus } from '../types/services-status';
import { getAllServicesRequest, getService } from '../services/request.service';

export function useGetAllServices(search?: string, status?: ServiceStatus, date?: string) {
  return useQuery<unknown>({
    queryKey: ['all-serices-request', search, date, status],
    queryFn: async () => {
      const response = await getAllServicesRequest({ search, status, date });
      return Array.isArray(response) ? response : response.results || [];
    },
  });
}

export function useServiceDetail(serviceUuid: string) {
  return useQuery<ServiceRequest>({
    queryKey: ['user-detail', serviceUuid],
    queryFn: () => getService(serviceUuid),
  });
}
