'use client'
import { useAutoApproveConfig } from "@/src/hooks/useConfig"
import { useState } from "react"

interface IAutoApproveProvidersProps {
    isActive: boolean;
}

export default function AutoApproveProviders({isActive}:IAutoApproveProvidersProps) {
    const [autoOn, setAutoOn] = useState(isActive ?? false)
    const { mutate, isPending} = useAutoApproveConfig()
    
    const handleChange = () => {
        mutate(undefined, {
            onSuccess: () => {
                setAutoOn(prev => !prev)
            },
            onError: (error) => {
                alert("Erro ao alterar modo aprovação automatica")
                console.log(error)
            }
        })
    }
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Aprovação de prestadores</h2>
            <div className="admin-form-group">
                <label style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    <input 
                        className="admin-config"
                        type="checkbox" 
                        checked={autoOn}
                        disabled={isPending}
                        onChange={handleChange}
                    />
                    Exigir aprovação manual de novos prestadores
                </label>
            </div>
            <p style={{margin: "0", fontSize: "0.875rem", color: "#64748b"}}>Quando ativado, novos prestadores ficam com status &quot;Pendente&quot; até aprovação.</p>
        </div>
    )
}