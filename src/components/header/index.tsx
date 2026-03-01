export default function Header() {
    return (
        <header className="admin-header">
            <h1>Dashboard</h1>
            <div className="admin-header-user">
                <span>Admin</span>
                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'}}>A</div>
            </div>
        </header>
    )
}