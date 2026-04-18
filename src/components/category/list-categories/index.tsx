'use client';

import { CategoryItem } from '@/src/types/categories';
import { useState } from 'react';
import CreateCategoryModal from '../create-category-modal';
import { UsersGridSkeleton } from '@/src/components/ui/skeleton';

interface IListCategories {
  data: CategoryItem[];
  loading: boolean;
  error: Error | null;
}

export default function ListCategories({ data, loading, error }: IListCategories) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [modalMode, setModalMode] = useState<'new' | 'update'>('new');

  const handleEdit = (category: CategoryItem) => {
    setSelectedCategory(category);
    setModalMode('update');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  if (loading) return <UsersGridSkeleton count={8} gridClass="categories-grid" />;
  if (error) return <p className="admin-error">Erro ao carregar categorias: {error.message}</p>;

  return (
    <>
      <div className="categories-grid">
        {data.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-card-header">
              <div
                className="category-icon"
                style={{ backgroundColor: category.icon ? '#e0e7ff' : '#f1f5f9' }}
              >
                {category.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="category-card-info">
                <h3 className="category-card-name">{category.name}</h3>
                <p className="category-card-slug">{category.slug}</p>
              </div>
            </div>

            <div className="category-card-meta">
              <div className="category-card-meta-item">
                <span className="category-card-label">Prestadores</span>
                <span className="category-card-value">{category.providers_count || 0}</span>
              </div>
              <span className={`category-card-status ${category.is_active ? 'active' : 'inactive'}`}>
                {category.is_active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <button className="category-card-btn" onClick={() => handleEdit(category)}>
              Editar
            </button>
          </div>
        ))}
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
  );
}