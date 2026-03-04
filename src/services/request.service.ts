import { apiFetch } from "../lib/api";
import { ServiceStatus } from "../types/services-status";


interface GetAllServicesRequest {
    search?:string;
    status?: ServiceStatus;
    date?: string;
}

export function getAllServicesRequest(params?: GetAllServicesRequest) {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    if (params?.date) query.append('scheduled_date', params.date)
    return apiFetch(`/request/all-requests/?${query.toString()}`, {
        method: 'GET',
    })
}
