'use client';

interface ISelectStatus {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export default function SelectStatus({ statusFilter, setStatusFilter }: ISelectStatus) {
  return (
    <select
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid var(--admin-border)',
        borderRadius: '8px',
      }}
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">Todos status</option>
      <option value="approved">Aprovado</option>
      <option value="pending">Pendente</option>
      <option value="rejected">Bloqueado</option>
    </select>
  );
}
