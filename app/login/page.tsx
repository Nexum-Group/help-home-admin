'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsPending(true);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error('Login inválido');
      }

      window.location.href = '/admin';
    } catch {
      alert('Erro ao fazer login');
    } finally {
      setIsPending(false);
    }
  };

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

          <button type="submit" disabled={isPending} className="admin-btn admin-btn-primary">
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
