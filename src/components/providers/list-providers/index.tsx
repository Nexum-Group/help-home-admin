'use client';

import { useUpdateProviderStatus } from '@/src/hooks/useProvider';
import { ProviderWithServiceRequestsCount } from '@/src/types/provider';
import { formatProviderStatus } from '@/src/utils/formart-status-providers';
import { formatCategories } from '@/src/utils/format-categories';
import { formatDate } from '@/src/utils/format-date';
import Pagination from '@/src/components/ui/pagination';
import { UsersGridSkeleton, PaginationSkeleton } from '@/src/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface ListProvidersProps {
  data: ProviderWithServiceRequestsCount[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ListProviders({
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: ListProvidersProps) {
  const [providerUuid, setProviderUuid] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateProviderStatus();

  const handleApprove = (uuid: string) => {
    setProviderUuid(uuid);

    mutate(
      {
        providerUuid: uuid,
        data: { approval_status: 'approved' },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['all-providers'],
          });
          alert('Prestador aprovado com sucesso!');
          setProviderUuid(null);
        },
        onError: () => {
          alert('Erro ao aprovar prestador');
          setProviderUuid(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div>
        <UsersGridSkeleton count={12} gridClass="providers-grid" />
        <PaginationSkeleton />
      </div>
    );
  }

  if (error) return <p className="admin-error">Erro ao carregar prestadores</p>;

  return (
    <div>
      <div className="providers-grid">
        {data.map((provider) => (
          <div key={provider.id} className="provider-card">
            <div className="provider-card-header">
              <div className="provider-avatar">
                {provider.user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="provider-card-info">
                <h3 className="provider-card-name">{provider.user?.name || 'N/A'}</h3>
                <p className="provider-card-email">{provider.user?.email}</p>
              </div>
            </div>

            <div className="provider-card-meta">
              <div className="provider-card-meta-item">
                <span className="provider-card-label">Categorias</span>
                <span className="provider-card-value">
                  {formatCategories(provider.categories) || 'N/A'}
                </span>
              </div>
              <div className="provider-card-meta-item">
                <span className="provider-card-label">Avaliação</span>
                <span className="provider-card-value">
                  {provider.rating_average?.toFixed(1) || '0.0'} ⭐
                </span>
              </div>
              <div className="provider-card-meta-item">
                <span className="provider-card-label">Serviços</span>
                <span className="provider-card-value">{provider.service_requests_count || 0}</span>
              </div>
              <div className="provider-card-meta-item">
                <span className="provider-card-label">Cadastro</span>
                <span className="provider-card-value">{formatDate(provider.created_at)}</span>
              </div>
            </div>

            <div className="provider-card-footer">
              <span
                className={`provider-card-status ${provider.approval_status}`}
              >
                {formatProviderStatus(provider.approval_status)}
              </span>
              {provider.approval_status === 'pending' ? (
                <button
                  className="provider-card-btn-approve"
                  onClick={() => handleApprove(provider.id)}
                  disabled={isPending && providerUuid === provider.id}
                >
                  {isPending && providerUuid === provider.id
                    ? 'Aprovando...'
                    : 'Aprovar'}
                </button>
              ) : (
                <a href={`/admin/providers/${provider.id}/`} className="provider-card-link">
                  Ver detalhes
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}