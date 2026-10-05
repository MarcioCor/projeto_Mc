import { SectionHeading } from "@/components/ui/section-heading";
import { ContactChannelList } from "./contact-channel-list";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="scroll-mt-16 bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="contato-titulo"
          eyebrow="Contato"
          title="Fale com a gente"
          description="Agende um horário, tire dúvidas ou peça um orçamento. Respondemos rapidinho!"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside aria-label="Canais de atendimento">
            <ContactChannelList />
          </aside>

          <div className="relative rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-950">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
