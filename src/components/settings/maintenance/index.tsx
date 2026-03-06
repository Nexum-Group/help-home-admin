'use client'

import { useMaintenanceConfig } from "@/src/hooks/useConfig";
import { useState } from "react"
interface IMaintenance {
    isActive: boolean
}
export default function Maintenance({ isActive }:IMaintenance) {
    const [maintenanceOn, setMaintenance] = useState(isActive);
    const { mutate, isPending} = useMaintenanceConfig()

    const handleChange = () => {
        mutate(undefined, {
            onSuccess: () => {
                setMaintenance(prev => !prev)
            },
            onError: (error) => {
                alert("Erro ao alterar modo manutenção")
                console.log(error)
            }
        })
    }
    return (
        <div className="admin-card">
            <h2 className="admin-card-title">Manutenção</h2>
            <div className="admin-form-group">
                <label style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    <input 
                        className="admin-config"
                        type="checkbox"
                        checked={maintenanceOn}
                        disabled={isPending}
                        onChange={handleChange}
                    />
                    Modo manutenção
                </label>
            </div>
            <p style={{margin: "0", fontSize: "0.875rem", color: "#64748b"}}>Quando ativado, o app exibe uma tela de manutenção para todos os usuários.</p>
        </div>
    )
}