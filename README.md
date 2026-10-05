# projeto_Cr

Base (*starter*) para aplicações web **full-stack** com **Next.js 16 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS 4**, seguindo a abordagem *Server Components First*.

O projeto já vem preparado para desenvolvimento assistido por IA (Claude Code e outros agentes), com regras de arquitetura e *skills* versionadas no próprio repositório.

> **Status:** estrutura inicial. As pastas da arquitetura já existem, mas a página em `app/page.tsx` ainda é o template padrão do `create-next-app`.

## Tipo de projeto

- **Aplicação web full-stack** em um único projeto Next.js: interface (React) e lógica de servidor (Server Actions e Route Handlers) convivem no mesmo código.
- **Renderização no servidor por padrão:** as páginas são geradas no servidor e só viram código de navegador quando precisam de interatividade.
- **Ponto de partida reutilizável:** organização de pastas, convenções e ferramentas já definidas para começar novas funcionalidades.

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) (App Router + Turbopack) | 16.3.6 | Framework (rotas, renderização no servidor, Server Actions) |
| [React](https://react.dev) / React DOM | 19.2.8 | Interface |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) (via `@tailwindcss/postcss`) | 4.3 | Estilização |
| [ESLint](https://eslint.org) (`eslint-config-next`) | 9 | Qualidade de código |
| `next/font` (Geist e Geist Mono) | — | Fontes otimizadas |

Previstos na arquitetura, mas **ainda não instalados**: [shadcn/ui](https://ui.shadcn.com) (componentes), [React Hook Form](https://react-hook-form.com) e [Zod](https://zod.dev) (formulários e validação).

## Pré-requisitos

- Node.js **20.9 ou superior** (testado com Node 24)
- npm

## Primeiros passos

```bash
git clone https://github.com/MarcioCor/projeto_Mc.git
cd projeto_Mc
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente

As variáveis ficam em `.env.local`, que **não** vai para o Git. Crie-o a partir do modelo e preencha os valores:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_*` → apenas valores que podem ser expostos no navegador.
- Segredos (banco de dados, chaves de API) → sem o prefixo, usados somente em Server Actions ou Route Handlers.

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
projeto_Cr/
├── app/                # Rotas (App Router), agrupadas por (grupo)/
│   ├── layout.tsx      # Layout raiz (fontes Geist)
│   ├── page.tsx        # Página inicial
│   └── globals.css     # Estilos globais + Tailwind
├── actions/            # Server Actions (mutações)
├── components/         # Componentes de feature
│   └── ui/             # Primitivos reutilizáveis (shadcn)
├── lib/                # Helpers, clients e configurações
├── types/              # Tipos globais e schemas Zod compartilhados
├── public/             # Arquivos estáticos
├── .agents/skills/     # Skills para agentes de IA
├── .claude/            # Regras e skills do Claude Code
├── AGENTS.md           # Avisos para agentes sobre o Next.js 16
├── CLAUDE.md           # Instruções do projeto para o Claude Code
├── skills-lock.json    # Origem e versão das skills instaladas
├── next.config.ts
├── tsconfig.json       # Alias de import: @/*
└── eslint.config.mjs
```

## Desenvolvimento com IA

O repositório inclui contexto para assistentes de código:

- **`CLAUDE.md`**: stack, arquitetura, estilo de código e armadilhas comuns do projeto.
- **`AGENTS.md`**: lembra que o Next.js 16 tem mudanças que quebram compatibilidade e que a documentação certa está em `node_modules/next/dist/docs/`.
- **Skills** (registradas em `skills-lock.json`):

| Skill | Origem | Para quê |
|---|---|---|
| `frontend-design` | `anthropics/skills` | Direção visual e design de interfaces |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | Boas práticas de performance em React/Next.js |
| `web-design-guidelines` | `vercel-labs/agent-skills` | Revisão de UI, acessibilidade e UX |

## Convenções

- **Server Components por padrão.** Use `'use client'` apenas quando houver hooks, eventos ou APIs do navegador.
- **Mutações via Server Actions** em `actions/`. Nunca acessar o banco diretamente em Client Components.
- **Sem `any` explícito.** Use `unknown` com type guards.
- **Estilo apenas com Tailwind.** Sem CSS inline nem styled-components.
- **Nomes de arquivo** em kebab-case; componentes em PascalCase.
- **Imports** com ES modules (`import`/`export`) e o alias `@/*`.

## Git

- Branch principal: `main`.
- Branches de trabalho: `feat/`, `fix/` ou `chore/` + descrição em kebab-case (ex.: `feat/login-page`).
- Commits em inglês, no imperativo (ex.: `add OAuth callback handler`).

## Observações

- `revalidatePath()` e `revalidateTag()` só funcionam em Server Actions e Route Handlers.
- `middleware.ts` fica na raiz do projeto, não dentro de `app/`.
- Imagens externas exigem domínio autorizado em `next.config.ts` (`images.remotePatterns`).
- O Next.js 16 traz mudanças que quebram compatibilidade com versões anteriores. Consulte `node_modules/next/dist/docs/` antes de usar APIs novas.
