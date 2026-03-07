'use client'

import { AllUsers } from "@/src/types/user";
import { exportToCSV } from "@/src/utils/export-to-csv";

interface ISearchUser {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    roleFilter: 'client' | 'provider' | '';
    setRoleFilter: (role: 'client' | 'provider' | '') => void;
    data: AllUsers[]
}

export default function SearchUser({ data, searchTerm, setSearchTerm, roleFilter, setRoleFilter }: ISearchUser) {
    return (
        <div className="admin-toolbar">
            <input 
                type="search" 
                className="admin-search" 
                placeholder="Buscar por nome ou e-mail..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <select 
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as 'client' | 'provider' | '')}
            >
                <option value="">Todos</option>
                <option value="client">Clientes</option>
                <option value="provider">Prestadores</option>
            </select>
            <button 
                className="admin-btn admin-btn-primary"
                onClick={() => exportToCSV(data, "usuarios")}
                disabled={data.length===0}
            >
                Exportar CSV
            </button>
        </div>
    )
}