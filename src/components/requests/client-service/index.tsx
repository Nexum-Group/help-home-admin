import { User } from "@/src/types/user"

interface IClientService {
    client: User
}

export default function ClientService({ client }:IClientService) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Cliente</h2>

            <div className="admin-grid">

            <div className="admin-info">
                <span>Nome: </span>
                <strong>{client?.name}</strong>
            </div>

            <div className="admin-info">
                <span>Email: </span>
                <strong>{client?.email}</strong>
            </div>

            <div className="admin-info">
                <span>Telefone: </span>
                <strong>{client?.phone}</strong>
            </div>

            </div>
        </div>
    )
}