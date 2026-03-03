'use client'

import { ProviderWithServiceRequestsCount } from "@/src/types/provider"
import { formatProviderStatus } from "@/src/utils/formart-status-providers"
import { formatCategories } from "@/src/utils/format-categories"

interface IListProviders {
    data: ProviderWithServiceRequestsCount[];
    isLoading: boolean;
    error: Error | null;
}


export default function ListProviders({ data, isLoading, error }: IListProviders) {

    function getStatusBadgeClass(status: string) {
        switch (status) {
            case "pending":
                return "admin-badge-warning"
            case "approved":
                return "admin-badge-success"
            case "rejected":
                return "admin-badge-danger"
            default:
                return ""
        }
    }
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar provedores</p>
    
    return (
        <div className="admin-card">
            <table className="admin-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Avaliação</th>
                    <th>Serviços</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {data.map(provider => (
                        <tr key={provider.id}>
                            <td>{provider.id}</td>
                            <td>{provider.user.name}</td>
                            <td>{formatCategories(provider.categories)}</td>
                            <td>{provider.rating_average.toFixed(1)} ⭐</td>
                            <td>{provider.service_requests_count}</td>
                            <td><span className={`admin-badge ${getStatusBadgeClass(provider.approval_status)}`}>
                                {formatProviderStatus(provider.approval_status)}
                            </span></td>
                            {provider.approval_status === "pending" ? (
                                <td><button className="admin-btn admin-btn-ghost">aprovar</button></td>
                            ) : (
                                <td><a href="#" className="admin-btn admin-btn-ghost">Ver</a></td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}