'use client';

import { useGetAllUsers } from '@/src/hooks/useUser';
import ListUsers from './list-users';
import SearchUser from './search-user';
import { ToolbarSkeleton } from '@/src/components/ui/skeleton';
import { AllUsers } from '@/src/types/user';
import { useState } from 'react';

const ITEMS_PER_PAGE = 12;

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'client' | 'provider' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllUsers({
    search: searchTerm,
    role: roleFilter || undefined,
    page: currentPage,
  });

  const response = data as { results?: AllUsers[]; count?: number } | undefined;
  const users = response?.results || [];
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function handleSearch(term: string) {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  function handleRoleFilter(role: 'client' | 'provider' | '') {
    setRoleFilter(role);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="admin-content">
      {isLoading ? (
        <ToolbarSkeleton />
      ) : (
        <SearchUser
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          roleFilter={roleFilter}
          setRoleFilter={handleRoleFilter}
          data={users}
        />
      )}
      <div className="admin-results-info">
        <span>{totalCount} usuário{totalCount !== 1 ? 's' : ''} encontrado{totalCount !== 1 ? 's' : ''}</span>
      </div>
      <ListUsers
        data={users}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}