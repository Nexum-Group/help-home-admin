'use client';

import Link from 'next/link';
import { useUserDetail } from '@/src/hooks/useUser';
import { formatDate } from '@/src/utils/format-date';
import { formatProviderStatus } from '@/src/utils/formart-status-providers';
import { formatCategories } from '@/src/utils/format-categories';
import { DetailPageSkeleton } from '@/src/components/ui/skeleton';

interface UserDetailProps {
  uuid: string;
}

export default function UserDetail({ uuid }: UserDetailProps) {
  const { data: user, isLoading, error } = useUserDetail(uuid);

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="admin-error">Erro ao carregar usuário</div>;
  if (!user) return null;

  const isProvider = !!user.profile_provider;

  return (
    <div className="admin-content">
      <div className="detail-header">
        <Link href="/admin/users" className="detail-back-link">
          ← Voltar
        </Link>
      </div>

      <div className="detail-grid">
        <div className="detail-card detail-card-primary">
          <div className="detail-avatar">
            {user.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h1 className="detail-name">{user.name}</h1>
          <p className="detail-email">{user.email}</p>
          <div className="detail-badges">
            <span className={`detail-badge ${user.is_active ? 'active' : 'inactive'}`}>
              {user.is_active ? 'Ativo' : 'Inativo'}
            </span>
            {isProvider && (
              <span className="detail-badge provider">Prestador</span>
            )}
            {!isProvider && (
              <span className="detail-badge client">Cliente</span>
            )}
          </div>
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Informações</h2>
          <div className="detail-info-list">
            <div className="detail-info-item">
              <span className="detail-info-label">Telefone</span>
              <span className="detail-info-value">{user.phone || 'Não informado'}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Cadastro</span>
              <span className="detail-info-value">{formatDate(user.created_at)}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Última atualização</span>
              <span className="detail-info-value">{formatDate(user.updated_at)}</span>
            </div>
          </div>
        </div>

        {isProvider && user.profile_provider && (
          <div className="detail-card">
            <h2 className="detail-card-title">Perfil de Prestador</h2>
            <div className="detail-info-list">
              <div className="detail-info-item">
                <span className="detail-info-label">Status</span>
                <span className={`detail-badge ${user.profile_provider.approval_status}`}>
                  {formatProviderStatus(user.profile_provider.approval_status)}
                </span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Rating</span>
                <span className="detail-info-value">
                  {user.profile_provider.rating_average?.toFixed(1) || '0.0'} ⭐
                </span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Visualizações</span>
                <span className="detail-info-value">{user.profile_provider.total_views || 0}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Categorias</span>
                <span className="detail-info-value">
                  {formatCategories(user.profile_provider.categories)}
                </span>
              </div>
            </div>
            {user.profile_provider.description && (
              <div className="detail-description">
                <span className="detail-info-label">Descrição</span>
                <p>{user.profile_provider.description}</p>
              </div>
            )}
          </div>
        )}

        {user.addresses && user.addresses.length > 0 && (
          <div className="detail-card">
            <h2 className="detail-card-title">Endereços ({user.addresses.length})</h2>
            <div className="detail-address-list">
              {user.addresses.map((address: { id: string; street: string; number: string; complement?: string; neighborhood: { name: string; city: { name: string; state: string } } }, idx: number) => (
                <div key={idx} className="detail-address-item">
                  <span className="detail-address-street">{address.street}, {address.number}</span>
                  {address.complement && <span className="detail-address-complement">{address.complement}</span>}
                  <span className="detail-address-neighborhood">
                    {address.neighborhood.name} - {address.neighborhood.city.name}/{address.neighborhood.city.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {user.services && user.services.length > 0 && (
          <div className="detail-card">
            <h2 className="detail-card-title">Serviços Solicitados ({user.services.length})</h2>
            <div className="detail-services-list">
              {user.services.slice(0, 5).map((service: { id: string; status: string; category: { name: string }; created_at: string }, idx: number) => (
                <div key={idx} className="detail-service-item">
                  <span className="detail-service-name">{service.category?.name || 'Serviço'}</span>
                  <span className={`detail-badge ${service.status}`}>{service.status}</span>
                  <span className="detail-service-date">{formatDate(service.created_at)}</span>
                </div>
              ))}
              {user.services.length > 5 && (
                <Link href={`/admin/requests?user=${user.id}`} className="detail-see-more">
                  Ver todos os serviços →
                </Link>
              )}
            </div>
          </div>
        )}

        {user.reviews && user.reviews.length > 0 && (
          <div className="detail-card">
            <h2 className="detail-card-title">Avaliações ({user.reviews.length})</h2>
            <div className="detail-reviews-list">
              {user.reviews.slice(0, 5).map((review, idx) => (
                <div key={idx} className="detail-review-item">
                  <div className="detail-review-header">
                    <span className="detail-review-author">{(review as { client?: { name: string } }).client?.name || 'Cliente'}</span>
                    <span className="detail-review-rating">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="detail-review-comment">{review.comment}</p>
                  <span className="detail-review-date">{formatDate(review.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}