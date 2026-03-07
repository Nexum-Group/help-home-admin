'use client'

import { CategoryByVolume as CategoryByVolumeType } from "@/src/types/report"

interface ICategoryByVolume {
    categories: CategoryByVolumeType[];
    isLoading: boolean;
    error: Error | null
}

export default function CategoryByVolume({categories, isLoading, error}:ICategoryByVolume) {
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar informações</p>
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Volume por categoria</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Serviços</th>
                  <th>Volume</th>
                  <th>% do total</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                    <tr key={category.category_name}>
                        <td>{category.category_name}</td>
                        <td>{category.services}</td>
                        <td>R$ {category.volume_value}</td>
                        <td>{category.total_by_percentage}%</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
} 