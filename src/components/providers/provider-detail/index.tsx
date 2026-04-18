'use client';

import { useProviderDetail } from '@/src/hooks/useProvider';
import { DetailPageSkeleton } from '@/src/components/ui/skeleton';
import { formatDate } from '@/src/utils/format-date';
import { formatProviderStatus } from '@/src/utils/formart-status-providers';
import { formatCategories } from '@/src/utils/format-categories';
import Link from 'next/link';

interface IProviderDetail {
  uuid: string;
}

export default function ProviderDetail({ uuid }: IProviderDetail) {
  const { data: provider, isLoading, error } = useProviderDetail(uuid);

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="admin-error">Erro ao carregar prestador</div>;
  if (!provider) return null;

  const mockReviews = [
    {
      id: '1',
      rating: 5,
      comment: 'Excelente trabalho! Muito profissional e pontual.',
      created_at: '2026-04-10',
      client: { name: 'Maria Santos' },
    },
    {
      id: '2',
      rating: 4,
      comment: 'Bom serviço, recomendo.',
      created_at: '2026-04-05',
      client: { name: 'João Silva' },
    },
  ];

  const mockServices = [
    {
      id: '1',
      service_name: 'Limpeza residencial',
      status: 'completed',
      service_price: 150,
      scheduled_date: '2026-04-15',
    },
    {
      id: '2',
      service_name: 'Limpeza comercial',
      status: 'pending',
      service_price: 300,
      scheduled_date: '2026-04-20',
    },
  ];

  const mockAreas = provider.service_areas || [];

  const reviews = (provider.reviews?.length ? provider.reviews : mockReviews) as { id: string; rating: number; comment: string; created_at: string; client?: { name: string } }[];
  const services = (provider.services?.length ? provider.services : mockServices) as { id: string; service_name: string; status: string; service_price: number; scheduled_date: string }[];

  return (
    <div className="admin-content">
      <div className="detail-header">
        <Link href="/admin/providers" className="detail-back-link">
          ← Voltar
        </Link>
      </div>

      <div className="detail-grid">
        <div className="detail-card detail-card-primary">
          <div className="detail-avatar" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}>
            {provider.user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h1 className="detail-name">{provider.user?.name}</h1>
          <p className="detail-email">{provider.user?.email}</p>
          <div className="detail-badges">
            <span className={`detail-badge ${provider.approval_status}`}>
              {formatProviderStatus(provider.approval_status)}
            </span>
            {provider.user?.is_active ? (
              <span className="detail-badge active">Ativo</span>
            ) : (
              <span className="detail-badge inactive">Inativo</span>
            )}
          </div>
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Informações</h2>
          <div className="detail-info-list">
            <div className="detail-info-item">
              <span className="detail-info-label">Telefone</span>
              <span className="detail-info-value">{provider.user?.phone || 'Não informado'}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Cadastro</span>
              <span className="detail-info-value">{formatDate(provider.created_at)}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Rating</span>
              <span className="detail-info-value">{provider.rating_average?.toFixed(1) || '0.0'} ⭐</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Visualizações</span>
              <span className="detail-info-value">{provider.total_views || 0}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Categorias</span>
              <span className="detail-info-value">{formatCategories(provider.categories)}</span>
            </div>
          </div>
          {provider.description && (
            <div className="detail-description">
              <span className="detail-info-label">Descrição</span>
              <p>{provider.description}</p>
            </div>
          )}
        </div>

        {(mockAreas.length > 0 || provider.service_areas?.length) && (
          <div className="detail-card">
            <h2 className="detail-card-title">Áreas de Atendimento ({mockAreas.length || provider.service_areas?.length || 0})</h2>
            <div className="detail-address-list">
              {(mockAreas.length ? mockAreas : provider.service_areas || []).map((area, idx) => (
                <div key={idx} className="detail-address-item">
                  <span className="detail-address-street">{area.neighborhood?.name}</span>
                  <span className="detail-address-neighborhood">
                    {area.neighborhood?.city?.name}/{area.neighborhood?.city?.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="detail-card">
          <h2 className="detail-card-title">Avaliações ({reviews.length})</h2>
          <div className="detail-reviews-list">
            {reviews.map((review, idx) => (
              <div key={idx} className="detail-review-item">
                <div className="detail-review-header">
                  <span className="detail-review-author">{review.client?.name || 'Cliente'}</span>
                  <span className="detail-review-rating">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="detail-review-comment">{review.comment}</p>
                <span className="detail-review-date">{formatDate(review.created_at)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Serviços Prestados ({services.length})</h2>
          <div className="detail-services-list">
            {services.map((service, idx) => (
              <div key={idx} className="detail-service-item">
                <span className="detail-service-name">{service.service_name}</span>
                <span className={`detail-badge ${service.status}`}>{service.status}</span>
                <span className="detail-service-price">R$ {service.service_price}</span>
                <span className="detail-service-date">{formatDate(service.scheduled_date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}