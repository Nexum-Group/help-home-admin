import { ServiceRequest } from '@/src/types/service';

interface IRequestsList {
  requests: ServiceRequest[];
}

export default function RequestsList({ requests }: IRequestsList) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Solicitações de Serviço</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Serviço</th>
            <th>Status</th>
            <th>Preço</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {requests?.map((request) => (
            <tr key={request.id}>
              <td>{request.service_name}</td>

              <td>
                <span
                  className={`admin-badge ${
                    request.status === 'completed' ? 'admin-badge-success' : 'admin-badge-warning'
                  }`}
                >
                  {request.status}
                </span>
              </td>

              <td>R$ {request.service_price}</td>
              <td>{request.scheduled_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
