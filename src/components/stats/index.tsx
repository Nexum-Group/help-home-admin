export default function Stats() {
    return (
        <div className="admin-stats">
            <div className="admin-stat">
                <span className="admin-stat-value">2.847</span>
                <span className="admin-stat-label">Usuários</span>
            </div>
            <div className="admin-stat">
                <span className="admin-stat-value">342</span>
                <span className="admin-stat-label">Prestadores</span>
            </div>
            <div className="admin-stat">
                <span className="admin-stat-value">1.256</span>
                <span className="admin-stat-label">Solicitações (mês)</span>
            </div>
            <div className="admin-stat">
                <span className="admin-stat-value">R$ 187k</span>
                <span className="admin-stat-label">Volume (mês)</span>
            </div>
        </div>
    )
}