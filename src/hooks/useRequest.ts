import { useQuery } from '@tanstack/react-query';
import { ServiceRequest } from '../types/service';
import { ServiceStatus } from '../types/services-status';
import { getAllServicesRequest, getService } from '../services/request.service';

interface UseGetAllServicesParams {
  search?: string;
  status?: ServiceStatus;
  date?: string;
  page?: number;
}

export function useGetAllServices(params?: UseGetAllServicesParams) {
  const { search, status, date, page = 1 } = params || {};

  return useQuery<unknown>({
    queryKey: ['all-serices-request', search, date, status, page],
    queryFn: async () => {
      const response = await getAllServicesRequest({ search, status, date, page });
      if (Array.isArray(response)) {
        return { results: response, count: response.length, next: null, previous: null };
      }
      return response;
    },
  });
}

export function useServiceDetail(serviceUuid: string) {
  return useQuery<ServiceRequest>({
    queryKey: ['service-detail', serviceUuid],
    queryFn: () => getService(serviceUuid),
  });
}
