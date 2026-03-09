'use client';

import { NewsRegistereds as NewsRegisteredsType } from '@/src/types/report';

interface INewsRegistered {
  data: NewsRegisteredsType[];
  isLoading: boolean;
  error: Error | null;
}

export default function NewsRegistereds({ data, isLoading, error }: INewsRegistered) {
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar informações</p>;
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Novos cadastros (por semana)</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Período</th>
            <th>Clientes</th>
            <th>Prestadores</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.period}>
              <td>{r.period}</td>
              <td>{r.clients_count}</td>
              <td>{r.providers_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
