'use client'

import { CategoryItem } from "@/src/types/categories"

interface IListCategories {
    data: CategoryItem[];
    loading: boolean;
    error:Error | null
}

export default function ListCategories({ data, loading, error}:IListCategories) {
    if (loading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar categorias</p>
    return (
        <div className="admin-card">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Slug</th>
                        <th>Prestadores</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>{category.providers_count}</td>
                            <td><span className={`admin-badge admin-badge-${category.is_active ?'success' : 'danger'}`}>{category.is_active ? "Ativo" : "Inativo"}</span></td>
                            <td><a href="#" className="admin-btn admin-btn-ghost">Editar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}