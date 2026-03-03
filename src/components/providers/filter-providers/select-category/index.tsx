'use client'

import { useCategoriesOption } from "@/src/hooks/useCategory"

interface ISelectCategory {
    categoryFilter: string;
    setCategoryFilter: (categoryId: string) => void;
}

export default function SelectCategory({ categoryFilter, setCategoryFilter }: ISelectCategory) {
    const { data, isLoading, error  } = useCategoriesOption();

    if (isLoading) return <p>Carregando categorias...</p>
    if (error) return <p>Erro ao carregar categorias</p>

    return (
        <select 
            style={{ padding: "0.5rem 1rem", border: "1px solid var(--admin-border)", borderRadius: "8px" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            <option value="">Todas categorias</option>
            {data?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>

    )
}