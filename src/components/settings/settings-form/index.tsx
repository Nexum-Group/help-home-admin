"use client"

import { useUpdateConfig } from "@/src/hooks/useConfig";
import { Config } from "@/src/types/config";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface ISettingsProps {
  data: Config;
}

export default function SettingsForm({ data }: ISettingsProps) {
  const [platformFee, setPlatformFee] = useState(String(data?.platform_fee))
  const [cancelDeadline, setCancelDeadline] = useState(String(data?.cancellation_deadline_hours))
  const [email, setEmail] = useState(data?.email_suport)

  const router = useRouter()
  const { mutate, isPending} = useUpdateConfig()
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !platformFee || !cancelDeadline) {
        alert("Preencha todos os campos")
        return
    }

    mutate(
      { email_suport:email, platform_fee: Number(platformFee), cancellation_deadline_hours: Number(cancelDeadline) },
      {
        onSuccess: () => {
          router.push("/settings")
        },
        onError: () => {
            alert("Error ao criar configurações")
        }
      }
    )
  }

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Plataforma</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Taxa da plataforma (%)</label>
            <input 
              type="number" 
              value={platformFee}
              onChange={(e) => setPlatformFee(e.target.value)} 
              min="0" 
              max="30" 
            />
          </div>
          <div className="admin-form-group">
            <label>Prazo para cancelamento (horas)</label>
            <input 
              type="number" 
              value={cancelDeadline}
              onChange={(e) => setCancelDeadline(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label>E-mail de suporte</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button 
          type="submit" 
          className="admin-btn admin-btn-primary"
          disabled={isPending}
        >
           {isPending ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  )
}