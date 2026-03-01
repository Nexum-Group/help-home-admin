export default function RecentRequests() {
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
            <tbody>
                <tr>
                <td>#12348</td>
                <td>Maria Silva</td>
                <td>Ana Souza</td>
                <td>Faxina</td>
                <td><span className="admin-badge admin-badge-success">Concluída</span></td>
                <td>R$ 170</td>
                </tr>
                <tr>
                <td>#12347</td>
                <td>João Lima</td>
                <td>Carlos Mendes</td>
                <td>Eletricista</td>
                <td><span className="admin-badge admin-badge-warning">Em andamento</span></td>
                <td>R$ 120</td>
                </tr>
                <tr>
                <td>#12346</td>
                <td>Pedro Costa</td>
                <td>Ana Souza</td>
                <td>Faxina</td>
                <td><span className="admin-badge admin-badge-info">Pendente</span></td>
                <td>R$ 150</td>
                </tr>
            </tbody>
            </table>
        </div>  
    )
}