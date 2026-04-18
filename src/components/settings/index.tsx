'use client';

import { useCurrentConfig } from '@/src/hooks/useConfig';
import AutoApproveProviders from './auto-approve-providers';
import Maintenance from './maintenance';
import SettingsForm from './settings-form';
import { DetailPageSkeleton } from '@/src/components/ui/skeleton';

export default function Settings() {
  const { data, isLoading, error } = useCurrentConfig();

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="admin-error">Erro ao carregar configurações</div>;

  return (
    <div className="admin-content">
      <div className="settings-grid">
        <div className="settings-card">
          <h2 className="settings-card-title">Configurações Gerais</h2>
          <SettingsForm data={data!} />
        </div>

        <div className="settings-card">
          <h2 className="settings-card-title"> aprovações</h2>
          <AutoApproveProviders isActive={data?.auto_approve_providers ?? false} />
        </div>

        <div className="settings-card">
          <h2 className="settings-card-title">Manutenção</h2>
          <Maintenance isActive={data?.maintenance ?? false} />
        </div>
      </div>
    </div>
  );
}