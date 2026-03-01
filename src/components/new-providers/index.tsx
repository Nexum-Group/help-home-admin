export default function NewProviders() {
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
                <tr>
                <td>Fernanda Lima</td>
                <td>Diarista</td>
                <td>28/02/2026</td>
                <td><span className="admin-badge admin-badge-success">Ativo</span></td>
                </tr>
                <tr>
                <td>Roberto Santos</td>
                <td>Eletricista</td>
                <td>27/02/2026</td>
                <td><span className="admin-badge admin-badge-warning">Pendente</span></td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}