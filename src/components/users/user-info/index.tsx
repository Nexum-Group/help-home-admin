import { User, UserDetail } from "@/src/types/user"
import { formatDate } from "@/src/utils/format-date"

interface IUserInfo {
    user: UserDetail | User
}

export default function UserInfo({ user }:IUserInfo) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Informações do Usuário</h2>

            <div className="admin-form-row">

            <div>
                <strong>ID</strong>
                <p>{user.id}</p>
            </div>

            <div>
                <strong>Nome</strong>
                <p>{user.name}</p>
            </div>

            <div>
                <strong>Email</strong>
                <p>{user.email}</p>
            </div>

            <div>
                <strong>Telefone</strong>
                <p>{user.phone}</p>
            </div>

            <div>
                <strong>Status</strong>
                <p>
                <span className="admin-badge admin-badge-success">
                    {user.is_active ? "Ativo" : "Inativo"}
                </span>
                </p>
            </div>

            <div>
                <strong>Criado em</strong>
                <p>{formatDate(user.created_at)}</p>
            </div>

            </div>
      </div>
    )
}