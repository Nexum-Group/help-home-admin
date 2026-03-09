'use client';

import { useCurrentConfig } from '@/src/hooks/useConfig';
import AutoApproveProviders from './auto-approve-providers';
import Maintenance from './maintenance';
import SettingsForm from './settings-form';

export default function Settings() {
  const { data, isLoading, error } = useCurrentConfig();
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar formulário</p>;

  return (
    <div className="admin-content">
      <SettingsForm data={data!} />
      <AutoApproveProviders isActive={data?.auto_approve_providers ?? false} />
      <Maintenance isActive={data?.maintenance ?? false} />
    </div>
  );
}
