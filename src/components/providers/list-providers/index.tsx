'use client'

import { useUpdateProviderStatus } from "@/src/hooks/useProvider";
import { ProviderWithServiceRequestsCount } from "@/src/types/provider"
import { getStatusBadgeClass } from "@/src/utils/badge-status-class";
import { formatProviderStatus } from "@/src/utils/formart-status-providers"
import { formatCategories } from "@/src/utils/format-categories"
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IListProviders {
    data: ProviderWithServiceRequestsCount[];
    isLoading: boolean;
    error: Error | null;
}

export default function ListProviders({ data, isLoading, error }: IListProviders) {
    const [providerUuid, setProviderUuid] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useUpdateProviderStatus();

    const handleApprove = (uuid: string) => {
        setProviderUuid(uuid);
        
        mutate(
            { 
                providerUuid: uuid, 
                data: { approval_status: "approved" }
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ 
                        queryKey: ['all-providers']
                    });
                    alert("Provedor aprovado com sucesso!");
                    setProviderUuid(null);
                },
                onError: (error) => {
                    alert("Erro ao aprovar provedor");
                    console.log(error);
                    setProviderUuid(null);
                }
            }
        );
    };

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar provedores</p>;
    
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(provider => (
                        <tr key={provider.id}>
                            <td>{provider.id}</td>
                            <td>{provider.user?.name || 'N/A'}</td>
                            <td>{formatCategories(provider.categories)}</td>
                            <td>{provider.rating_average?.toFixed(1) || '0.0'} ⭐</td>
                            <td>{provider.service_requests_count || 0}</td>
                            <td>
                                <span className={`admin-badge ${getStatusBadgeClass(provider.approval_status)}`}>
                                    {formatProviderStatus(provider.approval_status)}
                                </span>
                            </td>
                            <td>
                                {provider.approval_status === "pending" ? (
                                    <button 
                                        className="admin-btn admin-btn-ghost"
                                        onClick={() => handleApprove(provider.id)}
                                        disabled={isPending && providerUuid === provider.id}
                                    >
                                        {isPending && providerUuid === provider.id ? 'Aprovando...' : 'Aprovar'}
                                    </button>
                                ) : (
                                    <a href={`/admin/providers/${provider.id}`} className="admin-btn admin-btn-ghost">
                                        Ver
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}