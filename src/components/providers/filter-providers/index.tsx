'use client';

import SelectCategory from './select-category';
import SelectStatus from './select-status';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useState, useEffect } from 'react';

interface IFilterProviders {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryId: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export default function FilterProviders({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: IFilterProviders) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      setSearchTerm(debouncedValue);
    }
  }, [debouncedValue, searchTerm, setSearchTerm]);

  return (
    <div className="admin-toolbar">
      <input
        type="search"
        className="admin-search"
        placeholder="Buscar prestador..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <SelectCategory categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      <SelectStatus statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
    </div>
  );
}