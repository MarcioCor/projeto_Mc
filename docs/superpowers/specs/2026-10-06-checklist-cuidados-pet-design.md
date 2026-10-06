# Checklist de cuidados com o pet — design

Data: 2026-10-06

## Objetivo

Adicionar à home uma seção com um checklist de cuidados com o pet, dividido em
blocos ("Saúde", "Alimentação", "Higiene"). Quando o usuário marca **todos** os
itens de um bloco, o fundo daquele bloco muda de cor. As marcações ficam salvas
no navegador.

## Decisões acordadas

- "Sessão" = bloco (cartão) do checklist, dentro de uma seção nova da home.
- Conteúdo: checklist de cuidados com o pet. Os textos são exemplos e podem ser
  trocados depois editando um único arquivo de dados.
- Persistência: `localStorage`, sem login e sem banco de dados.
- Desmarcar qualquer item faz o fundo do bloco voltar ao normal.
- Abordagem B: a seção é Server Component; cada bloco é um Client Component
  pequeno que usa um hook compartilhado.
- Sem framework de teste novo.

## Fora do escopo

- Login, banco de dados ou sincronização entre aparelhos.
- Adicionar, editar ou remover itens pela interface.
- Framework de teste automático (Vitest, Testing Library etc.).
- Mudanças no layout global ou criação de menu de navegação (o layout atual não
  tem menu nem cabeçalho).

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `types/checklist.ts` | Tipos do bloco (`id`, `title`, `description`, `items`) e do item (`id`, `label`). |
| `lib/checklist-groups.ts` | Dados de exemplo: 3 blocos ("Saúde", "Alimentação", "Higiene") com 4 itens cada. |
| `lib/use-checklist-progress.ts` | Hook cliente que lê e grava as marcações de um bloco no `localStorage`. |
| `components/checklist/checklist-section.tsx` | Seção (Server Component): título e lista de blocos, no mesmo padrão de `testimonials-section.tsx`. |
| `components/checklist/checklist-group-card.tsx` | Bloco (`'use client'`): contador, itens com caixinhas, estado "completo". |
| `app/page.tsx` | Inclui a nova seção entre `TestimonialsSection` e `ContactSection`. |

Nomes de arquivo em kebab-case e componentes em PascalCase, conforme o
`CLAUDE.md` do projeto.

## Dados e armazenamento

- Uma chave de `localStorage` por bloco, no formato `pet-checklist:<id-do-bloco>`
  (ex.: `pet-checklist:saude`), guardando a lista de ids dos itens marcados.
- Cada bloco lê e grava só a própria chave; um bloco não interfere em outro.
- Ao ler, os ids salvos são filtrados pelos itens que existem hoje no bloco.
  Marcações de itens removidos não contam para "completo".
- Um bloco está **completo** quando o número de itens marcados (já filtrados) é
  igual ao total de itens do bloco e o total é maior que zero.

## Comportamento

- O cartão mostra título, contador ("2 de 4 itens") e a lista de itens.
- Marcar ou desmarcar grava na hora.
- Bloco completo: fundo do cartão muda de cor; ao desmarcar qualquer item,
  volta ao normal.
- Só o cartão completo muda; a seção e os outros cartões não são afetados.
- Transição curta de cor, desativada para quem usa "reduzir movimento"
  (`motion-reduce`).

## Cor

- Normal: fundo claro neutro, no estilo dos cartões de depoimento.
- Completo: `emerald-50` com borda `emerald-300`; no modo escuro, `emerald-950`.
- Apenas classes padrão do Tailwind, sem CSS inline e sem token novo.
- Fundo da seção: neutro (branco; `stone-50` no claro, com variante escura), para
  alternar com o âmbar dos depoimentos e destacar os cartões verdes.

## Acessibilidade

- Caixinhas nativas (`<input type="checkbox">`) com `<label>`: teclado e leitor
  de tela funcionam sem código extra.
- A cor não é o único sinal: ao completar aparece o texto "Bloco completo" com
  ícone de check.
- Contador e "Bloco completo" ficam em região `aria-live="polite"`.
- Contraste de texto legível nos fundos claro e escuro.

## Carregamento e hidratação

- O servidor renderiza tudo desmarcado.
- No navegador, o hook lê o `localStorage` com `useSyncExternalStore`, com
  snapshot de servidor "nada marcado", evitando o aviso de hydration mismatch.
- Pode haver um piscar curto no primeiro carregamento para quem já tem marcações
  salvas; é aceito e nada é adicionado para escondê-lo.

## Tratamento de erros

- `localStorage` indisponível (janela anônima restrita, dados bloqueados): o
  checklist continua funcionando na visita atual, sem lembrar depois de
  recarregar, e sem mensagem de erro.
- Valor salvo corrompido ou em formato inesperado: ignorado; o bloco começa
  desmarcado. O valor lido entra como `unknown` e é validado com `zod` (lista de
  textos) antes de ser usado. Sem `any`.
- Falha ao gravar: a caixinha continua marcada na tela naquela visita.

## Verificação (sem framework de teste novo)

O projeto não tem script `test` (o `npm run test` do `CLAUDE.md` não existe).
Verificação:

1. `npm run type-check` e `npm run lint` sem erros.
2. `npm run build` conclui.
3. Teste manual no navegador (`npm run dev`):
   - marcar todos os itens de um bloco muda só o fundo daquele bloco;
   - desmarcar um item devolve a cor original;
   - recarregar a página mantém as marcações;
   - cores corretas nos modos claro e escuro;
   - navegação e marcação só com o teclado;
   - `localStorage` bloqueado não quebra a página.

## Pendência antes de codar

O `AGENTS.md` do projeto avisa que esta versão do Next.js tem mudanças. Antes de
escrever código, ler a documentação relevante em `node_modules/next/dist/docs/`
(Client Components e `'use client'`) e registrar no plano o que for confirmado.
