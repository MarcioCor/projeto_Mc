# Checklist de cuidados com o pet — plano de implementação

Spec: `docs/superpowers/specs/2026-10-06-checklist-cuidados-pet-design.md`

Objetivo: seção nova na home com blocos de checklist; quando todos os itens de
um bloco estão marcados, o fundo daquele bloco muda de cor. Marcações salvas no
`localStorage`.

## Pré-requisito já cumprido: documentação do Next.js

Lida em `node_modules/next/dist/docs/01-app/`
(`03-api-reference/01-directives/use-client.md` e
`01-getting-started/05-server-and-client-components.md`). Confirmado:

- `'use client'` vai no topo do arquivo, antes dos imports, e só é necessário nos
  arquivos que a seção (Server Component) renderiza direto. Aqui: só
  `checklist-group-card.tsx`.
- `localStorage` e hooks são casos de Client Component.
- Props de Client Component precisam ser serializáveis. Os dados dos blocos são
  objetos simples (strings e listas), então atendem.
- `lib/use-checklist-progress.ts` não precisa de diretiva: só é importado pelo
  cartão, que já é cliente.

## Padrões do projeto a seguir

- Exportações nomeadas (`export function X`), aspas duplas, ponto e vírgula.
- Tipos com `export type`, imports com `@/`.
- Tailwind apenas, sem CSS inline e sem token novo. Sem `any`.
- Nomes de arquivo em kebab-case.

## Tarefa 1 — Tipos e dados

**Criar `types/checklist.ts`:**

```ts
export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
};
```

**Criar `lib/checklist-groups.ts`** exportando
`checklistGroups: ChecklistGroup[]` com 3 blocos de 4 itens (textos de exemplo,
ids estáveis em kebab-case; trocar o texto não perde as marcações, trocar o id
perde):

- `saude` — "Saúde": vacinas em dia; vermífugo aplicado; antipulgas e
  carrapatos aplicado; consulta veterinária no último ano.
- `alimentacao` — "Alimentação": ração adequada à idade e ao porte; água fresca
  sempre disponível; porções medidas, sem excesso de petiscos; comedouro e
  bebedouro limpos.
- `higiene` — "Higiene": banho na frequência indicada; escovação dos pelos;
  unhas aparadas; dentes e ouvidos verificados.

Cada bloco tem `description` de uma frase curta.

**Verificar:** `npm run type-check`. **Commit:** `feat(checklist): add checklist
types and sample data`.

## Tarefa 2 — Hook `lib/use-checklist-progress.ts`

Responsabilidade: ler e gravar as marcações de **um** bloco. Chave:
`pet-checklist:<groupId>`, valor: JSON com a lista de ids marcados.

Desenho:

- Armazenamento em memória por chave (`Map<string, string>`) que tem prioridade
  na leitura. Garante que a caixinha marca na tela mesmo se o `localStorage`
  estiver bloqueado ou a gravação falhar.
- `readRaw(key)`: devolve o texto salvo (memória primeiro, depois
  `localStorage`), ou `null`. Todo acesso ao `localStorage` dentro de
  `try/catch`. Retorna `string | null`, que é um valor primitivo e portanto
  estável para o `useSyncExternalStore` (sem precisar de cache de objetos).
- `writeRaw(key, value)`: grava na memória, tenta gravar no `localStorage`
  (ignora falha) e avisa os assinantes.
- `subscribe(listener)`: conjunto de assinantes do próprio módulo; devolve a
  função de cancelar. Sem ouvinte do evento `storage` (outras abas): fora do
  escopo.
- `useSyncExternalStore(subscribe, () => readRaw(key), () => null)`: o terceiro
  argumento é o snapshot do servidor (nada marcado), que evita o hydration
  mismatch.
- `parseCheckedIds(raw, items)`: `JSON.parse` dentro de `try/catch` → `unknown`
  → `z.array(z.string()).safeParse` → filtra pelos ids que existem hoje em
  `items` → `Set<string>`. Qualquer falha devolve conjunto vazio.
- Retorno: `{ checkedIds: Set<string>, isComplete: boolean, toggle(itemId) }`.
  `isComplete = items.length > 0 && checkedIds.size === items.length`.
  `toggle` monta o novo conjunto a partir do atual e chama `writeRaw`.

Assinatura: `useChecklistProgress(groupId: string, items: readonly ChecklistItem[])`.

**Verificar:** `npm run type-check` e `npm run lint`. **Commit:**
`feat(checklist): add localStorage progress hook`.

## Tarefa 3 — Cartão `components/checklist/checklist-group-card.tsx`

`'use client'` na primeira linha. Props: `{ group: ChecklistGroup }`.

- `<article aria-labelledby="checklist-<id>-titulo">` com `<h3>` (título) e a
  descrição.
- Região `aria-live="polite"` com o contador "`n` de `total` itens" ou, quando
  completo, ícone de check (SVG inline, `aria-hidden`) + "Bloco completo".
- Lista de itens: `<label>` envolvendo `<input type="checkbox">` nativo
  (`checked` controlado pelo hook, `onChange` chama `toggle(item.id)`) e o texto.
- Classes por estado, como strings completas (o Tailwind não enxerga classes
  montadas por pedaços):
  - normal: `border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900`
  - completo: `border-emerald-300 bg-emerald-50 dark:border-emerald-800
    dark:bg-emerald-950`
  - base comum: `rounded-2xl border p-6 shadow-sm transition-colors
    motion-reduce:transition-none`
- Caixinha com `accent-emerald-600` e tamanho `size-5`, com anel de foco visível.
- Texto do contador/"Bloco completo" em verde escuro no claro e verde claro no
  escuro, com contraste legível.

**Verificar:** `npm run type-check` e `npm run lint`. **Commit:**
`feat(checklist): add checklist group card`.

## Tarefa 4 — Seção e home

**Criar `components/checklist/checklist-section.tsx`** (Server Component, sem
diretiva), no molde de `testimonials-section.tsx`:

- `<section id="checklist" aria-labelledby="checklist-titulo"
  className="scroll-mt-16 border-y border-stone-200 bg-stone-50 px-4 py-20
  sm:px-6 lg:px-8 dark:border-stone-800 dark:bg-stone-950">`.
  O fundo `stone-50` com borda evita que a seção se confunda com os depoimentos
  (âmbar) e com o contato (`bg-white`).
- `SectionHeading` com `id="checklist-titulo"`, eyebrow "Checklist", título
  "Cuidados do dia a dia" e uma descrição curta.
- `<ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">` com um
  `<li>` por bloco contendo `ChecklistGroupCard`.

**Editar `app/page.tsx`:** importar `ChecklistSection` e renderizá-la entre
`TestimonialsSection` e `ContactSection`.

**Verificar:** `npm run type-check`, `npm run lint`, `npm run build`.
**Commit:** `feat(home): add pet care checklist section`.

## Tarefa 5 — Verificação final (manual, sem framework novo)

O projeto não tem script `test`. Com `npm run dev` (porta 3000), conferir:

1. Marcar todos os itens de um bloco: só o fundo daquele bloco fica verde e
   aparece "Bloco completo".
2. Desmarcar um item: o fundo volta ao normal e o contador volta a "n de 4".
3. Recarregar a página: as marcações permanecem; o console não mostra aviso de
   hydration.
4. Modo escuro e modo claro: cores e contraste corretos; a seção se distingue
   dos depoimentos e do contato.
5. Só com o teclado (Tab e Espaço): dá para marcar tudo e o foco é visível.
6. Valor corrompido: no console, `localStorage.setItem("pet-checklist:saude",
   "lixo")` e recarregar; o bloco começa desmarcado, sem erro.
7. `localStorage` bloqueado (dados do site bloqueados no navegador): a página
   abre e as caixinhas marcam na visita, sem lembrar depois.
8. Largura de celular: cartões em coluna única, sem rolagem horizontal.

Ao fim, rodar uma última vez `npm run type-check && npm run lint` e, se aparecer
algo, corrigir antes de encerrar. Se o teste no navegador mostrar problema,
corrigir na tarefa correspondente e fazer novo commit.

## Fora do plano

Framework de teste, login, banco de dados, edição de itens pela interface, menu
de navegação e sincronização entre abas.
