"use client";

import { useChecklistProgress } from "@/lib/use-checklist-progress";
import type { ChecklistGroup } from "@/types/checklist";

type ChecklistGroupCardProps = {
  group: ChecklistGroup;
};

export function ChecklistGroupCard({ group }: ChecklistGroupCardProps) {
  const { id, title, description, items } = group;
  const { checkedIds, isComplete, toggle } = useChecklistProgress(id, items);
  const titleId = `checklist-${id}-titulo`;

  return (
    <article
      aria-labelledby={titleId}
      className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-colors motion-reduce:transition-none ${
        isComplete
          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"
          : "border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
      }`}
    >
      <h3
        id={titleId}
        className="text-xl font-bold text-stone-900 dark:text-stone-50"
      >
        {title}
      </h3>
      <p className="mt-1 text-sm text-pretty text-stone-600 dark:text-stone-400">
        {description}
      </p>

      <p
        aria-live="polite"
        className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
          isComplete
            ? "text-emerald-800 dark:text-emerald-300"
            : "text-stone-600 dark:text-stone-400"
        }`}
      >
        {isComplete ? (
          <>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.296a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.497 12.09l6.793-6.794a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
              />
            </svg>
            Bloco completo
          </>
        ) : (
          `${checkedIds.size} de ${items.length} itens`
        )}
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 text-stone-800 dark:text-stone-200">
              <input
                type="checkbox"
                checked={checkedIds.has(item.id)}
                onChange={() => toggle(item.id)}
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              />
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </article>
  );
}
