import { apiFetch } from "../lib/api";


interface GetUsersParams {
    search?:string;
    role?: 'client' | 'provider';
}

export function getAllUsers(params?: GetUsersParams) {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.role) query.append('role', params.role);
    return apiFetch(`/user/all-users/?${query.toString()}`, {
        method: 'GET',
    })
}
