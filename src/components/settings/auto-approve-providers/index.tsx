'use client';
import { useAutoApproveConfig } from '@/src/hooks/useConfig';
import { useState } from 'react';

interface IAutoApproveProvidersProps {
  isActive: boolean;
}

export default function AutoApproveProviders({ isActive }: IAutoApproveProvidersProps) {
  const [autoOn, setAutoOn] = useState(isActive ?? false);
  const { mutate, isPending } = useAutoApproveConfig();

  const handleChange = () => {
    mutate(undefined, {
      onSuccess: () => {
        setAutoOn((prev) => !prev);
      },
      onError: () => {
        alert('Erro ao alterar configuração');
      },
    });
  };

  return (
    <div className="settings-toggle">
      <div className="settings-toggle-header">
        <span className="settings-toggle-title">Aprovação automática</span>
        <span className={`settings-toggle-badge ${autoOn ? 'on' : 'off'}`}>
          {autoOn ? 'Ativo' : 'Inativo'}
        </span>
      </div>
      <p className="settings-toggle-desc">
        Quando ativado, novos prestadores são aprovados automaticamente sem necessidade de revisão manual.
      </p>
      <label className="settings-toggle-switch">
        <input
          type="checkbox"
          checked={autoOn}
          disabled={isPending}
          onChange={handleChange}
        />
        <span className="settings-toggle-slider"></span>
      </label>
    </div>
  );
}