import { ServiceRequest } from '@/src/types/service';
import { getStatusBadgeClass } from '@/src/utils/badge-status-class';
import { getStatusBadgeClassPayment } from '@/src/utils/badge-status-payment';
import { formatStatus } from '@/src/utils/format-status';
import { formatPaymentStatus } from '@/src/utils/format-status-payment';

interface ISerciceInfo {
  request: ServiceRequest;
}

export default function ServiceInfo({ request }: ISerciceInfo) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Solicitação</h2>

      <div className="admin-grid">
        <div className="admin-info">
          <span>ID: </span>
          <strong>{request.id}</strong>
        </div>

        <div className="admin-info">
          <span>Categoria: </span>
          <strong>{request?.category?.name}</strong>
        </div>

        <div className="admin-info">
          <span>Serviço: </span>
          <strong>{request.service_name}</strong>
        </div>

        <div className="admin-info">
          <span>Status: </span>
          <span className={`admin-badge ${getStatusBadgeClass(request.status)}`}>
            {formatStatus(request.status)}
          </span>
        </div>

        <div className="admin-info">
          <span>Status Pagamento: </span>
          <span className={`admin-badge ${getStatusBadgeClassPayment(request.status)}`}>
            {formatPaymentStatus(request.payment_status)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <span className="admin-label">Descrição: </span>
        <p>{request.description}</p>
      </div>
    </div>
  );
}
