# projeto-1

Aplicação web construída com **Next.js 16 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS 4**, seguindo a abordagem *Server Components First*.

> Status: estrutura inicial. A página em `app/page.tsx` ainda é o template padrão do `create-next-app`.

## Stack

| Tecnologia | Versão |
|---|---|
| Next.js (App Router + Turbopack) | 16.3.6 |
| React / React DOM | 19.2.8 |
| TypeScript | 5 |
| Tailwind CSS (via `@tailwindcss/postcss`) | 4 |
| ESLint (`eslint-config-next`) | 9 |

Previstos, mas **ainda não instalados**: shadcn/ui, React Hook Form e Zod.

## Pré-requisitos

- Node.js 20.9+ (testado com Node 24)
- npm

## Primeiros passos

```bash
npm install
cp .env.example .env.local   # preencha as variáveis necessárias
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run type-check` | Gera os tipos de rotas (`next typegen`) e roda `tsc --noEmit` |

Após uma série de mudanças, rode sempre:

```bash
npm run type-check && npm run lint
```

## Estrutura de pastas

```
projeto-1/
├── app/              # Rotas (App Router), agrupadas por (grupo)/
│   ├── layout.tsx    # Layout raiz
│   ├── page.tsx      # Página inicial
│   └── globals.css   # Estilos globais + Tailwind
├── actions/          # Server Actions (mutações)
├── components/       # Componentes de feature
│   └── ui/           # Primitivos reutilizáveis (shadcn)
├── lib/              # Helpers, clients e configurações
├── types/            # Tipos globais e schemas Zod compartilhados
├── public/           # Arquivos estáticos
├── .env.example      # Modelo de variáveis de ambiente
├── next.config.ts
├── tsconfig.json     # Alias de import: @/*
└── eslint.config.mjs
```

## Convenções

- **Server Components por padrão** — use `'use client'` apenas quando houver hooks, eventos ou APIs do browser.
- **Mutações via Server Actions** em `actions/` — nunca acessar o banco diretamente em Client Components.
- **Sem `any` explícito** — use `unknown` com type guards.
- **Estilo apenas com Tailwind** — sem CSS inline ou styled-components.
- **Nomes de arquivo** em kebab-case; componentes em PascalCase.
- **Variáveis de ambiente:** `NEXT_PUBLIC_*` só para valores seguros no client; segredos apenas em Server Actions ou Route Handlers.

## Git

- Branches: `feat/`, `fix/` ou `chore/` + descrição em kebab-case (ex.: `feat/login-page`).
- Commits em inglês, no imperativo (ex.: `add OAuth callback handler`).

## Observações

- `revalidatePath()` e `revalidateTag()` só funcionam em Server Actions e Route Handlers.
- `middleware.ts` fica na raiz do projeto, não dentro de `app/`.
- Imagens externas exigem domínio autorizado em `next.config.ts` (`images.remotePatterns`).
- O Next.js 16 traz mudanças que quebram compatibilidade com versões anteriores. Consulte `node_modules/next/dist/docs/` e o `AGENTS.md` antes de usar APIs novas.
