'use client'

import { useUser } from "@/src/hooks/useUser"
import { usePathname } from "next/navigation"

const titles: Record<string, string> = {
    "/": "Dashboard",
    "/users": "Usuários",
    "/requests": "Solicitações",
    "/providers": "Prestadores",
    "/categories": "Categorias",
    "/settings": "Configurações",
    "/reports": "Relatórios"
    // Adicione mais rotas e títulos conforme necessário
}

export default function Header() {
    const pathName = usePathname()

    const title = titles[pathName] || "Dashboard"

    const { data, isLoading, error } = useUser()
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao carregar dashboard</p>
    return (
        <header className="admin-header">
            <h1>{title}</h1>
            <div className="admin-header-user">
                {pathName === '/categories' && (
                    <button className="admin-btn admin-btn-primary">Nova categoria</button>
                )}
                <span>{data?.name}</span>
                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'}}>A</div>
            </div>
        </header>
    )
}