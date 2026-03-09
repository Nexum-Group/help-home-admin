import { Provider } from "@/src/types/provider"

interface IProvider {
    provider: Provider
}
export default function ProviderService({provider}:IProvider) {
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Prestador</h2>

            <div className="admin-grid">

                <div className="admin-info">
                    <span>Nome: </span>
                    <strong>{provider?.user?.name}</strong>
                </div>

                <div className="admin-info">
                    <span>Email: </span>
                    <strong>{provider?.user?.email}</strong>
                </div>

                <div className="admin-info">
                    <span>Categorias: </span>
                    <strong>{provider?.categories.join(",")}</strong>
                </div>

                <div className="admin-info">
                    <span>Avaliação: </span>
                    <strong>{provider?.rating_average} ⭐</strong>
                </div>

            </div>
      </div>
    )
}