import { useCallback, useMemo, useSyncExternalStore } from "react";
import { z } from "zod";
import type { ChecklistItem } from "@/types/checklist";

const STORAGE_PREFIX = "pet-checklist:";

const checkedIdsSchema = z.array(z.string());

// Guarda o último valor salvo nesta visita. Faz a caixinha marcar na tela mesmo
// quando o localStorage está bloqueado ou a gravação falha.
const memoryStore = new Map<string, string>();
const listeners = new Set<() => void>();

function readRaw(key: string): string | null {
  const inMemory = memoryStore.get(key);
  if (inMemory !== undefined) return inMemory;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string) {
  memoryStore.set(key, value);

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Sem localStorage: segue só com a memória desta visita.
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getServerSnapshot(): string | null {
  return null;
}

function parseCheckedIds(
  raw: string | null,
  items: readonly ChecklistItem[],
): Set<string> {
  if (raw === null) return new Set();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return new Set();
  }

  const result = checkedIdsSchema.safeParse(parsed);
  if (!result.success) return new Set();

  const validIds = new Set(items.map((item) => item.id));
  return new Set(result.data.filter((id) => validIds.has(id)));
}

export function useChecklistProgress(
  groupId: string,
  items: readonly ChecklistItem[],
) {
  const key = `${STORAGE_PREFIX}${groupId}`;

  const getSnapshot = useCallback(() => readRaw(key), [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const checkedIds = useMemo(() => parseCheckedIds(raw, items), [raw, items]);

  const toggle = useCallback(
    (itemId: string) => {
      const next = new Set(checkedIds);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      writeRaw(key, JSON.stringify([...next]));
    },
    [checkedIds, key],
  );

  const isComplete = items.length > 0 && checkedIds.size === items.length;

  return { checkedIds, isComplete, toggle };
}
