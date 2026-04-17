'use client';

import { useCategories } from '@/src/hooks/useCategory';

interface ISelectCategory {
  categoryFilter: string;
  setCategoryFilter: (categoryId: string) => void;
}

interface CategoryItem {
  id: string;
  name: string;
}

export default function SelectCategory({ categoryFilter, setCategoryFilter }: ISelectCategory) {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro ao carregar categorias</p>;

  const categories: CategoryItem[] = Array.isArray(data)
    ? data
    : (data as { results?: CategoryItem[] })?.results || [];

  return (
    <select
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid var(--admin-border)',
        borderRadius: '8px',
      }}
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      <option value="">Todas categorias</option>
      {categories.map((category: CategoryItem) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
