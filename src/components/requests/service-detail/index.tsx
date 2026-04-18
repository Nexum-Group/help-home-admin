'use client';

import { useServiceDetail } from '@/src/hooks/useRequest';
import { DetailPageSkeleton } from '@/src/components/ui/skeleton';
import { formatDate } from '@/src/utils/format-date';
import { formatStatus } from '@/src/utils/format-status';
import Link from 'next/link';

interface IServiceDetail {
  uuid: string;
}

export default function ServiceDetail({ uuid }: IServiceDetail) {
  const { data: service, isLoading, error } = useServiceDetail(uuid);

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="admin-error">Erro ao carregar solicitação</div>;
  if (!service) return null;

  return (
    <div className="admin-content">
      <div className="detail-header">
        <Link href="/admin/requests" className="detail-back-link">
          ← Voltar
        </Link>
      </div>

      <div className="detail-grid">
        <div className="detail-card detail-card-primary">
          <div className="detail-avatar" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' }}>
            {service.service_name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <h1 className="detail-name">{service.service_name}</h1>
          <p className="detail-id">#{service.id}</p>
          <div className="detail-badges">
            <span className={`detail-badge ${service.status}`}>
              {formatStatus(service.status)}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Informações do Serviço</h2>
          <div className="detail-info-list">
            <div className="detail-info-item">
              <span className="detail-info-label">Data Agendada</span>
              <span className="detail-info-value">{formatDate(service.scheduled_date)}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Valor</span>
              <span className="detail-info-value detail-price">R$ {service.service_price}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Endereço</span>
              <span className="detail-info-value">{service.address?.street}, {service.address?.number}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Bairro</span>
              <span className="detail-info-value">{service.address?.neighborhood?.name}</span>
            </div>
          </div>
          {service.notes && (
            <div className="detail-description">
              <span className="detail-info-label">Observações</span>
              <p>{service.notes}</p>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Cliente</h2>
          <div className="detail-info-list">
            <div className="detail-info-item">
              <span className="detail-info-label">Nome</span>
              <span className="detail-info-value">{service.client?.name}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Telefone</span>
              <span className="detail-info-value">{service.client?.phone}</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Prestador</h2>
          {service.provider ? (
            <div className="detail-info-list">
              <div className="detail-info-item">
                <span className="detail-info-label">Nome</span>
                <span className="detail-info-value">{service.provider.user?.name}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Telefone</span>
                <span className="detail-info-value">{service.provider.user?.phone}</span>
              </div>
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>Prestador ainda não designado</p>
          )}
        </div>

        <div className="detail-card">
          <h2 className="detail-card-title">Pagamento</h2>
          <div className="detail-info-list">
            <div className="detail-info-item">
              <span className="detail-info-label">Método</span>
              <span className="detail-info-value">{service.payment_method || 'Não definido'}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Status</span>
              <span className={`detail-badge ${service.payment_status || 'pending'}`}>
                {service.payment_status || 'Pendente'}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Valor Recebido</span>
              <span className="detail-info-value detail-price">
                R$ {service.payment_received || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}