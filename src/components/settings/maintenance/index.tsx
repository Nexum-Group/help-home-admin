'use client';

import { useMaintenanceConfig } from '@/src/hooks/useConfig';
import { useState } from 'react';

interface IMaintenance {
  isActive: boolean;
}

export default function Maintenance({ isActive }: IMaintenance) {
  const [maintenanceOn, setMaintenance] = useState(isActive);
  const { mutate, isPending } = useMaintenanceConfig();

  const handleChange = () => {
    mutate(undefined, {
      onSuccess: () => {
        setMaintenance((prev) => !prev);
      },
      onError: () => {
        alert('Erro ao alterar modo manutenção');
      },
    });
  };

  return (
    <div className="settings-toggle">
      <div className="settings-toggle-header">
        <span className="settings-toggle-title">Modo manutenção</span>
        <span className={`settings-toggle-badge ${maintenanceOn ? 'on' : 'off'}`}>
          {maintenanceOn ? 'Ativo' : 'Inativo'}
        </span>
      </div>
      <p className="settings-toggle-desc">
        Quando ativado, o aplicativo exibe uma tela de manutenção para todos os usuários.
      </p>
      <label className="settings-toggle-switch">
        <input
          type="checkbox"
          checked={maintenanceOn}
          disabled={isPending}
          onChange={handleChange}
        />
        <span className="settings-toggle-slider"></span>
      </label>
    </div>
  );
}