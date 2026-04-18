'use client';

import { useUpdateConfig } from '@/src/hooks/useConfig';
import { Config } from '@/src/types/config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ISettingsProps {
  data?: Config;
}

export default function SettingsForm({ data }: ISettingsProps) {
  const [platformFee, setPlatformFee] = useState(String(data?.platform_fee || 10));
  const [cancelDeadline, setCancelDeadline] = useState(String(data?.cancellation_deadline_hours || 24));
  const [email, setEmail] = useState(data?.email_suport || '');

  const router = useRouter();
  const { mutate, isPending } = useUpdateConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !platformFee || !cancelDeadline) {
      alert('Preencha todos os campos');
      return;
    }

    mutate(
      {
        email_suport: email,
        platform_fee: Number(platformFee),
        cancellation_deadline_hours: Number(cancelDeadline),
      },
      {
        onSuccess: () => {
          router.refresh();
        },
        onError: () => {
          alert('Erro ao salvar configurações');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="settings-form-group">
        <label className="settings-form-label">Taxa da plataforma (%)</label>
        <input
          type="number"
          className="settings-form-input"
          value={platformFee}
          onChange={(e) => setPlatformFee(e.target.value)}
          min="0"
          max="30"
        />
        <span className="settings-form-hint">Porcentagem cobrada sobre cada serviço</span>
      </div>

      <div className="settings-form-group">
        <label className="settings-form-label">Prazo para cancelamento (horas)</label>
        <input
          type="number"
          className="settings-form-input"
          value={cancelDeadline}
          onChange={(e) => setCancelDeadline(e.target.value)}
          min="0"
        />
        <span className="settings-form-hint">Horas antes do serviço para cancelamento</span>
      </div>

      <div className="settings-form-group">
        <label className="settings-form-label">E-mail de suporte</label>
        <input
          type="email"
          className="settings-form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="suporte@help-home.com.br"
        />
        <span className="settings-form-hint">receberá notificações do sistema</span>
      </div>

      <button type="submit" className="admin-btn admin-btn-primary" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Salvar configurações'}
      </button>
    </form>
  );
}