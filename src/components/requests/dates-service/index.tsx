import { ServiceRequest } from "@/src/types/service"
import { formatDate } from "@/src/utils/format-date";

interface IDatesRequest {
    request:ServiceRequest;
}

export default function DatesService({ request }:IDatesRequest) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Datas</h2>

            <div className="admin-grid">

            <div className="admin-info">
                <span>Agendado para: </span>
                <strong>{formatDate(request.scheduled_date)}</strong>
            </div>

            <div className="admin-info">
                <span>Criado em: </span>
                <strong>{formatDate(request.created_at)}</strong>
            </div>

            <div className="admin-info">
                <span>Atualizado em: </span>
                <strong>{formatDate(request.updated_at)}</strong>
            </div>

            </div>
        </div>
    )
}