'use client';

import Pagination from '@/src/components/ui/pagination';
import { UsersGridSkeleton, PaginationSkeleton } from '@/src/components/ui/skeleton';
import { AllUsers } from '@/src/types/user';
import { formatDate } from '@/src/utils/format-date';

interface ListUsersProps {
  data: AllUsers[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ListUsers({ data, isLoading, error, currentPage, totalPages, onPageChange }: ListUsersProps) {
  if (isLoading) {
    return (
      <div>
        <UsersGridSkeleton count={12} />
        <PaginationSkeleton />
      </div>
    );
  }

  if (error) return <p className="admin-error">Erro ao carregar usuários</p>;

  return (
    <div>
      <div className="users-grid">
        {data.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="user-card-info">
                <h3 className="user-card-name">{user.name}</h3>
                <p className="user-card-email">{user.email}</p>
              </div>
            </div>

            <div className="user-card-meta">
              <div className="user-card-meta-item">
                <span className="user-card-label">Tipo</span>
                <span className={`user-card-badge ${user.provider_profile ? 'provider' : 'client'}`}>
                  {user.provider_profile ? 'Prestador' : 'Cliente'}
                </span>
              </div>
              <div className="user-card-meta-item">
                <span className="user-card-label">Status</span>
                <span className={`user-card-badge ${user.is_active ? 'active' : 'inactive'}`}>
                  {user.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="user-card-meta-item">
                <span className="user-card-label">Cadastro</span>
                <span className="user-card-value">{formatDate(user.created_at)}</span>
              </div>
            </div>

            <a href={`/admin/users/${user.id}/`} className="user-card-link">
              Ver detalhes
            </a>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}