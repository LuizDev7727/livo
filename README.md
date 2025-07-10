# Livo

Plataforma de salas inteligentes com IA avançada para interação em tempo real durante apresentações, aulas e reuniões.

## 🚀 Sobre o Projeto

O **Livo** é uma plataforma que permite criar salas interativas onde participantes podem fazer perguntas em tempo real e receber respostas inteligentes da IA baseadas no conteúdo ao vivo. Ideal para apresentações, aulas e reuniões que precisam de interação contextual.

### Principais Funcionalidades

- **Salas Colaborativas**: Crie salas personalizadas para suas apresentações
- **Perguntas Inteligentes**: Sistema de moderação e priorização de questões
- **IA Contextual**: Análise do conteúdo ao vivo para respostas precisas
- **Transcrição de Áudio**: Conversão automática de áudio para texto
- **Autenticação Google**: Login seguro com Google OAuth

## 🛠️ Stack Tecnológica

### Frontend (Web App)
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado do servidor
- **Zod** - Validação de schemas

### Backend (API)
- **Fastify** - Framework web rápido
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL + pgvector** - Banco de dados com suporte a embeddings
- **Google Gemini AI** - IA para transcrição e geração de respostas
- **JWT** - Autenticação baseada em tokens
- **OpenTelemetry** - Observabilidade e tracing

### Infraestrutura
- **Turbo** - Monorepo build system
- **pnpm** - Gerenciador de pacotes
- **Docker Compose** - Containerização do banco de dados
- **Biome** - Linter e formatter

## 📋 Pré-requisitos

- Node.js >= 18
- pnpm 9.0.0
- Docker e Docker Compose

## 🚀 Setup e Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd livo
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://livo:livo@localhost:5432/livo"

# API
SERVER_PORT=3333
NEXT_PUBLIC_API_URL="http://localhost:3333"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/google/callback"

# JWT
JWT_SECRET="your-jwt-secret"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrações
```bash
pnpm --filter api db:migrate
```

### 6. Inicie o desenvolvimento
```bash
pnpm dev
```

O projeto estará disponível em:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3333
- **Database UI**: http://localhost:3333/db (via Drizzle Studio)

## 📁 Estrutura do Projeto

```
livo/
├── apps/
│   ├── api/          # Backend Fastify
│   └── web/          # Frontend Next.js
├── packages/
│   └── env/          # Configurações de ambiente
├── docker/           # Configurações Docker
└── docker-compose.yml
```

## 🔧 Scripts Disponíveis

### Root
- `pnpm dev` - Inicia todos os serviços em modo desenvolvimento
- `pnpm build` - Build de todos os projetos
- `pnpm lint` - Executa linting em todos os projetos
- `pnpm check-types` - Verifica tipos TypeScript

### API
- `pnpm --filter api dev` - Inicia apenas a API
- `pnpm --filter api db:generate` - Gera novas migrações
- `pnpm --filter api db:migrate` - Executa migrações
- `pnpm --filter api db:ui` - Abre Drizzle Studio

### Web
- `pnpm --filter web dev` - Inicia apenas o frontend

## 🎯 Padrões de Projeto

- **Monorepo**: Estrutura organizada com Turbo e pnpm workspaces
- **Type Safety**: TypeScript em todo o projeto
- **Schema Validation**: Zod para validação de dados
- **Component Architecture**: Componentes reutilizáveis com Radix UI
- **API Design**: RESTful com Fastify e validação automática
- **Database**: Migrations com Drizzle ORM
- **State Management**: TanStack Query para cache e sincronização

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.