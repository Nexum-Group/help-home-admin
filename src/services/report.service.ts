import { apiFetch } from "../lib/api";

interface IGetReportParams {
    date?: string
}

export function getReport(params?:IGetReportParams) {
    const query = new URLSearchParams();
    if (params?.date) query.append('date', params.date)
    return apiFetch(`/user/reports/?${query.toString()}`, {
        method: 'GET',
    })
}