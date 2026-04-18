'use client';

import { CategoryByVolume as CategoryByVolumeType } from '@/src/types/report';
import { Skeleton } from '@/src/components/ui/skeleton';

interface ICategoryByVolume {
  categories: CategoryByVolumeType[];
  isLoading: boolean;
  error: Error | null;
}

export default function CategoryByVolume({ categories, isLoading, error }: ICategoryByVolume) {
  if (isLoading) {
    return (
      <div className="admin-card">
        <h2 className="admin-card-title">Volume por categoria</h2>
        <div className="report-skeleton-list">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="skeleton-row" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="admin-error">Erro ao carregar informações</p>;

  if (!categories.length) {
    return (
      <div className="admin-card">
        <h2 className="admin-card-title">Volume por categoria</h2>
        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
          Nenhum dado disponível
        </p>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Volume por categoria</h2>
      <div className="report-chart">
        {categories.map((category) => (
          <div key={category.category_name} className="report-chart-item">
            <div className="report-chart-label">
              <span className="report-chart-name">{category.category_name}</span>
              <span className="report-chart-services">{category.services} serviços</span>
            </div>
            <div className="report-chart-bar-container">
              <div
                className="report-chart-bar"
                style={{ width: `${category.total_by_percentage}%` }}
              />
            </div>
            <div className="report-chart-value">
              <span>R$ {category.volume_value}</span>
              <span className="report-chart-percent">{category.total_by_percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}