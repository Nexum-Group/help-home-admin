'use client'

import { CategoryItem } from "@/src/types/categories"
import { useState } from "react"
import CreateCategoryModal from "../create-category-modal";

interface IListCategories {
    data: CategoryItem[];
    loading: boolean;
    error: Error | null
}

export default function ListCategories({ data, loading, error }: IListCategories) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
    const [modalMode, setModalMode] = useState<"new" | "update">("new")

    const handleEdit = (category: CategoryItem) => {
        setSelectedCategory(category)
        setModalMode("update")
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedCategory(null)
    }

    if (loading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar categorias: {error.message}</p>
    
    return (
        <>
            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Slug</th>
                            <th>Prestadores</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                                <td>{category.providers_count || 0}</td>
                                <td>
                                    <span className={`admin-badge admin-badge-${category.is_active ? 'success' : 'danger'}`}>
                                        {category.is_active ? "Ativo" : "Inativo"}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="admin-btn admin-btn-ghost"
                                        onClick={() => handleEdit(category)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && (    
                <CreateCategoryModal 
                    open={modalOpen}
                    onClose={handleCloseModal}
                    mode={modalMode}
                    categoryUuid={selectedCategory?.id}
                />
            )}
        </>
    )
}