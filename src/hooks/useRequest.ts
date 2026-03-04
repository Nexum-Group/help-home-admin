import { useQuery } from "@tanstack/react-query";
import { ServiceRequest } from "../types/service";
import { ServiceStatus } from "../types/services-status";
import { getAllServicesRequest } from "../services/request.service";

export function useGetAllServices(search?: string, status?: ServiceStatus , date?: string,) {
  return useQuery<ServiceRequest[]>({
    queryKey: ["all-serices-request", search, date, status],
    queryFn: () => getAllServicesRequest({ search, status, date }),
  })
}