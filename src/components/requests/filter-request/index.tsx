'use client'

import { ServiceStatus } from "@/src/types/services-status";


interface IFilterRequest {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dateFilter: string;
    setDateFilter: (date: string) => void;
    statusFilter: ServiceStatus | undefined;
    setStatusFilter: (status: ServiceStatus) => void;
}

export default function FilterRequest({ searchTerm, setSearchTerm, dateFilter, setDateFilter, statusFilter, setStatusFilter}:IFilterRequest) {
    return (
        <div className="admin-toolbar">
            <input 
                type="search" 
                className="admin-search" 
                placeholder="Buscar por ID,cliente, prestador..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
                style={{ padding: "0.5rem 1rem", border: "1px solid var(--admin-border)", borderRadius: "8px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ServiceStatus)}
            >
                <option value="">Todos status</option>
                <option value="pending">Pendente</option>
                <option value="accepted">Aprovada</option>
                <option value="in_progress">Em andamento</option>
                <option value="completed">Concluída</option>
                <option value="rejected">Recusada</option>
            </select>
            <input 
                type="date" style={{ padding: "0.5rem 1rem", border: "1px solid var(--admin-border)", borderRadius: "8px" }} 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
            />
        </div>
    )
}