'use client'

import { useLogin } from "@/src/hooks/useLogin"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
    const router = useRouter()
    const { mutate, isPending } = useLogin()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            alert("Preencha todos os campos")
            return
        }

        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    console.log("Login bem-sucedido:", data)
                    router.push("/admin/")
                },
                onError: () => {
                    alert("Credenciais inválidas")
                }
            }
        )
    }

    return (
        <main className="admin-login-page">
            <div className="admin-login-card">
                <h1>Help Home Admin</h1>
                <p>Área restrita. Faça login para continuar.</p>

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            id="senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="admin-btn admin-btn-primary"
                    >
                        {isPending ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </main>
    )
}