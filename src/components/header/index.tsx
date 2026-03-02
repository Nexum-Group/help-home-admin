'use client'

import { useUser } from "@/src/hooks/useUser"

export default function Header() {
    const { data, isLoading, error } = useUser()
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar dashboard</p>
    return (
        <header className="admin-header">
            <h1>Dashboard</h1>
            <div className="admin-header-user">
                <span>{data?.name}</span>
                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'}}>A</div>
            </div>
        </header>
    )
}