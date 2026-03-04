import { ServiceRequest } from "@/src/types/service"
import { getStatusBadgeClass } from "@/src/utils/badge-status-class";
import { formatStatus } from "@/src/utils/format-status";

interface IRecentRequest {
    data: ServiceRequest[];
}

export default function RecentRequests({ data }: IRecentRequest) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Solicitações recentes</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Prestador</th>
                        <th>Serviço</th>
                        <th>Status</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                {data.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan={6} className="admin-table-empty">
                                Nenhuma solicitação recente
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {data.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.client.name}</td>
                            <td>{request.provider.user?.name}</td>
                            <td>{request.service_name}</td>
                            <td><span className={`admin-badge ${getStatusBadgeClass(request.status)}`}>{formatStatus(request.status)}</span></td>
                        <td>R$ {request.service_price}</td> 
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>  
    )
}