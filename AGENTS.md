# AGENTS.md - Guia de Desenvolvimento Help Home Admin

Este documento fornece orientação para agentes de IA que trabalham neste codebase.

## Visão Geral do Projeto

- **Nome do Projeto**: Help Home Admin
- **Tipo**: Aplicação Web Next.js (Painel Admin)
- **Tech Stack**: Next.js 16, React 19, TypeScript, React Query, Tailwind CSS 4
- **Idioma**: Português (Brasil) para textos da interface
- **API**: Comunicação com a API Django do Help Home via proxy em `/api/proxy`

## Comandos de Build, Lint e Testes

### Desenvolvimento

```bash
npm run dev          # Iniciar servidor de desenvolvimento em http://localhost:3000
npm run build        # Build para produção
npm run start        # Iniciar servidor de produção
```

### Qualidade de Código

```bash
npm run lint         # Executar ESLint
npm run lint:fix     # Executar ESLint com auto-correção
npm run format       # Formatar código com Prettier (escreve)
npm run format:check # Verificar formatação sem escrever
npm run type-check  # Verificar tipos TypeScript
```

### Comandos para Testes Individuais

Este projeto atualmente não possui um framework de testes configurado. Testes podem ser adicionados usando Jest ou Vitest.

### Variáveis de Ambiente

Crie o arquivo `.env`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
JWT_SECRET=<mesmo token do secret_key do django>
```

## Diretrizes de Estilo de Código

### Princípios Gerais

- Use componentes funcionais com hooks
- Use TypeScript para todo novo código
- Prefira tipagem explícita ao invés de `any`
- Use português para textos da interface (mensagens de erro, rótulos, botões)
- Use inglês para código (nomes de variáveis, nomes de funções, comentários)

### Imports

- Use imports absolutos com prefixo `@/` (configurado em tsconfig.json)
- Ordene imports: bibliotecas externas → módulos internos → imports relativos
- Agrupe imports por tipo (React, hooks, services, types, utils, components)

```typescript
 ordem de imports
import { useState } from 'react';
import {// Exemplo de useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/src/lib/api';
import { User } from '@/src/types/user';
import ListUsers from './list-users';
```

### Convenções de Nomenclatura

- **Componentes**: PascalCase (ex.: `ListUsers`, `UserDetail`)
- **Hooks**: camelCase com prefixo `use` (ex.: `useDashboard`, `useUser`)
- **Funções**: camelCase (ex.: `getAllUsers`, `formatDate`)
- **Types/Interfaces**: PascalCase (ex.: `User`, `AllUsers`)
- **Arquivos**: kebab-case para utilitários, PascalCase para componentes

### Diretrizes TypeScript

- Habilite strict mode em tsconfig.json
- Evite `any`; use `unknown` se o tipo for desconhecido
- Use type aliases (`type`) para uniões, interseções e primitivos
- Use interfaces para objetos que podem ser estendidos

```typescript
// Bom
type UserRole = 'client' | 'provider';
interface User {
  id: string;
  name: string;
  role: UserRole;
}

// Evitar
interface Props {
  data: any;
}
```

### Padrões de React/Componentes

- Use diretiva `'use client'` para componentes client-side
- Use React Query (`@tanstack/react-query`) para buscar dados
- Desestruture props nos parâmetros do componente
- Use retornos antecipados para estados de carregamento/erro

```typescript
'use client';

interface IListUsers {
  data: User[];
  isLoading: boolean;
  error: Error | null;
}

export default function ListUsers({ data, isLoading, error }: IListUsers) {
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  return (
    <table>...</table>
  );
}
```

### Tratamento de Erros

- Erros de API são lançados em `apiFetch` (src/lib/api.ts)
- Componentes tratam erros com try/catch ou estado de erro do React Query
- Exiba mensagens de erro em português amigáveis
- Sempre trate estados de carregamento e erro nos componentes

```typescript
// Camada de serviço
export function getUser(userUuid: string) {
  return apiFetch(`/user/detail/${userUuid}/`, {
    method: 'GET',
  });
}

// Camada de componente
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userUuid],
  queryFn: () => getUser(userUuid),
});
```

### Organização de Arquivos

```
src/
├── app/                 # Páginas Next.js App Router
│   ├── admin/          # Páginas admin (protegidas)
│   └── login/          # Página de login
├── components/         # Componentes React (baseado em funcionalidades)
│   ├── users/
│   │   ├── list-users/
│   │   ├── search-user/
│   │   └── index.tsx
│   └── ...
├── hooks/              # React hooks personalizados
├── lib/                # Utilitários (cliente API, etc.)
├── services/           # Funções de serviço da API
├── types/              # Definições de tipos TypeScript
└── utils/              # Funções auxiliares
```

### Estrutura de Componentes

Cada componente deve estar em sua própria pasta com um `index.tsx`:

```
nome-do-componente/
└── index.tsx
```

### Tailwind CSS

- Use Tailwind CSS 4 com @tailwindcss/postcss
- Use nomes de classes semânticos (ex.: `admin-card`, `admin-table`, `admin-btn`)
- Classes pré-definidas existem no codebase (busque em componentes existentes)

### Padrões de API

- Todas as chamadas de API passam por `apiFetch` em `src/lib/api.ts`
- Chamadas de API são proxyadas para o backend via rota `/api/proxy`
- Use URLSearchParams para parâmetros de query

```typescript
export function getAllUsers(params?: { search?: string; role?: string }) {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('role', params.role);
  return apiFetch(`/user/all-users/?${query.toString()}`, {
    method: 'GET',
  });
}
```

### Configuração do Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

### Configuração do ESLint

- Usa eslint-config-next (core-web-vitals, typescript)
- Usa eslint-config-prettier
- Usa eslint-plugin-prettier

## Rotas

| Caminho                   | Descrição                    |
| ------------------------- | ---------------------------- |
| `/admin`                  | Dashboard                    |
| `/admin/users`            | Gerenciamento de usuários    |
| `/admin/users/[uuid]`     | Detalhe do usuário           |
| `/admin/providers`        | Gerenciamento de prestadores |
| `/admin/providers/[uuid]` | Detalhe do prestador         |
| `/admin/requests`         | Solicitações de serviço      |
| `/admin/requests/[uuid]`  | Detalhe da solicitação       |
| `/admin/categories`       | Gerenciamento de categorias  |
| `/admin/reports`          | Relatórios                   |
| `/admin/settings`         | Configurações                |
| `/login`                  | Página de login              |

## Tarefas Comuns

### Adicionando uma Nova Feature

1. Crie tipos em `src/types/`
2. Crie funções de serviço em `src/services/`
3. Crie hook personalizado em `src/hooks/` (se necessário)
4. Crie componentes em `src/components/`
5. Crie página em `app/admin/`
6. Execute lint, format e type-check

### Modificando Chamadas de API

- Proxy de API está em `proxy.ts` (raiz)
- Cliente de API está em `src/lib/api.ts`
- Serviços estão em `src/services/`

## Notas de Segurança

- Tokens JWT são validados usando biblioteca `jose`
- Rotas admin são protegidas via middleware
- Nunca faça commit de segredos no git (verifique `.gitignore`)
