# Help Home Admin

Painel administrativo do sistema **Help Home**, desenvolvido com **Next.js**.

---

# 🚀 Tecnologias

- Next.js
- React
- Typescript
- React Query

---

# 📦 Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/Nexum-Group/help-home-admin.git
cd help-home-admin
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
JWT_SECRET= //mesmo token do secret_key do django
```

## 4. Executar aplicação

```bash
npm run dev
```

Acesse:

```bash
http://localhost:3000
```

## 5. Integração com API

O painel se conecta com a Help Home API através da variável:

```bash
NEXT_PUBLIC_API_URL
```

Exemplo:

```bash
http://localhost:8000/api
```
