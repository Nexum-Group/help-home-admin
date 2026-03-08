'use client'

import { AllUsers } from "@/src/types/user"
import { formatDate } from "@/src/utils/format-date"

interface IListUsers {
    data: AllUsers[];
    isLoading: boolean;
    error: Error | null
}

export default function ListUsers({ data, isLoading, error }: IListUsers) {
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar usuários</p>
    return (
        <div className="admin-card">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Tipo</th>
                        <th>Cadastro</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {data?.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.provider_profile ? "Prestador" : "Cliente"}</td>
                            <td>{formatDate(user.created_at)}</td>
                            <td><span className={`admin-badge ${user.is_active ? 'admin-badge-success' : 'admin-badge-warning'}`}>{user.is_active ? 'Ativo' : 'Inativo'}</span></td>
                            <td><a href={`/admin/users/${user.id}/`} className="admin-btn admin-btn-ghost">Ver</a></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}