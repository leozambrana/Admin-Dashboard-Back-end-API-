# AdminDash Backend 🚀

Este é o backend da aplicação **AdminDash**, uma API RESTful construída com Node.js, Express e Prisma, projetada para gerenciar usuários, planos, projetos e fornecer estatísticas para o dashboard administrativo.

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js
- **Linguagem**: TypeScript
- **Framework Web**: Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Criptografia**: BCryptJS
- **Validação**: Zod
- **Segurança**: Helmet & CORS

## 🏗️ Arquitetura

O projeto segue uma estrutura modular inspirada em princípios de **DDD (Domain-Driven Design)**, organizada da seguinte forma:

- `src/modules`: Contém os módulos de negócio (Users, Auth, Plans, Projects, Dashboard). Cada módulo possui seus próprios controllers, repositories, mappers e use cases.
- `src/shared`: Códigos compartilhados entre módulos, como rotas globais e erros.
- `src/middlewares`: Interceptadores globais (Autenticação, Tratamento de Erros).
- `src/db/prisma`: Cliente e configurações do banco de dados.

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- Instância de PostgreSQL rodando

### Passo a Passo

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz baseado no `.env.example` e preencha as credenciais do banco de dados e a secret do JWT.

3. **Gere o cliente do Prisma**:

   ```bash
   npm run prisma:generate
   ```

4. **Rode as migrações do banco**:

   ```bash
   npm run prisma:migrate
   ```

5. **Popule o banco de dados (Seed)**:

   ```bash
   npm run prisma:seed
   ```

6. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333`.

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor com recarregamento automático (ts-node-dev).
- `npm run build`: Compila o projeto para JavaScript.
- `npm run start`: Inicia o projeto compilado.
- `npm run prisma:studio`: Abre a interface visual do Prisma para gerenciar o banco.
- `npm run prisma:seed`: Executa o script de população inicial de dados.

## 🔗 Endpoints da API

A API está exposta sob o prefixo `/api`. Exemplos:

- `POST /api/auth/login`: Autenticação de usuário.
- `GET /api/auth/me`: Retorna dados do usuário logado (Requer Token).
- `GET /api/users`: Lista usuários com paginação e filtros.
- `GET /api/dashboard/stats`: Retorna métricas globais para o dashboard.
- `GET /api/plans`: Lista os planos de assinatura disponíveis.

---

Desenvolvido como parte do ecossistema AdminDash.
