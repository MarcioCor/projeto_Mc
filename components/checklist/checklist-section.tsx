import { SectionHeading } from "@/components/ui/section-heading";
import { checklistGroups } from "@/lib/checklist-groups";
import { ChecklistGroupCard } from "./checklist-group-card";

export function ChecklistSection() {
  return (
    <section
      id="checklist"
      aria-labelledby="checklist-titulo"
      className="scroll-mt-16 border-y border-stone-200 bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 dark:border-stone-800 dark:bg-stone-950"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="checklist-titulo"
          eyebrow="Checklist"
          title="Cuidados do dia a dia"
          description="Marque o que você já faz pelo seu pet. Quando um bloco ficar completo, ele muda de cor."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {checklistGroups.map((group) => (
            <li key={group.id}>
              <ChecklistGroupCard group={group} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
