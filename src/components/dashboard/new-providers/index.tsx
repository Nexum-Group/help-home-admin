'use client';

import { Provider } from '@/src/types/provider';
import { formatStatus } from '@/src/utils/format-status';

interface INewProviders {
  newProviders: Provider[];
}

export default function NewProviders({ newProviders }: INewProviders) {
  if (newProviders.length === 0) {
    return <p className="dashboard-empty">Nenhum novo prestador</p>;
  }

  return (
    <div className="dashboard-list">
      {newProviders.map((provider) => (
        <a key={provider.id} href={`/admin/providers/${provider.id}/`} className="dashboard-list-item">
          <div className="dashboard-list-item-main">
            <div className="dashboard-list-item-avatar">
              {provider.user?.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div className="dashboard-list-item-info">
              <span className="dashboard-list-item-title">{provider.user?.name}</span>
              <span className="dashboard-list-item-subtitle">Prestador</span>
            </div>
          </div>
          <div className="dashboard-list-item-meta">
            <span className={`dashboard-list-item-status ${provider.approval_status}`}>
              {formatStatus(provider.approval_status)}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}