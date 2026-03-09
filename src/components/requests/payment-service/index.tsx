import { ServiceRequest } from '@/src/types/service';

interface IPaymentService {
  request: ServiceRequest;
}

export default function PaymentService({ request }: IPaymentService) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Pagamento</h2>

      <div className="admin-grid">
        <div className="admin-info">
          <span>Valor do Serviço: </span>
          <strong>R$ {request.service_price}</strong>
        </div>

        <div className="admin-info">
          <span>Taxa da Plataforma: </span>
          <strong>R$ {request.platform_fee}</strong>
        </div>

        <div className="admin-info">
          <span>Total: </span>
          <strong>
            R$ {(Number(request.service_price) + Number(request.platform_fee)).toFixed(2)}
          </strong>
        </div>
      </div>
    </div>
  );
}
