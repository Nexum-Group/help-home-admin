import { Provider } from "@/src/types/provider"
import { getStatusBadgeClass } from "@/src/utils/badge-class"
import { formatCategories } from "@/src/utils/format-categories"
import { formatDate } from "@/src/utils/format-date"
import { formatStatus } from "@/src/utils/format-status"

interface INewProviders {
    newProviders: Provider[]
}
export default function NewProviders({ newProviders }: INewProviders) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Novos prestadores (últimos 7 dias)</h2>
            <table className="admin-table">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Data cadastro</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {newProviders.map((provider) => (
                    <tr key={provider.id}>
                        <td>{provider.user.name}</td>
                        <td>{provider.categories && provider.categories.length > 0 ? formatCategories(provider.categories) : "Nenhuma categoria"}</td>
                        <td>{formatDate(provider.user.created_at)}</td>
                        <td><span className={`admin-badge ${getStatusBadgeClass(provider.approval_status)}`}>{formatStatus(provider.approval_status)}</span></td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}