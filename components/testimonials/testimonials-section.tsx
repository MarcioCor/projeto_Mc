import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/testimonials";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="scroll-mt-16 bg-amber-50/60 px-4 py-20 sm:px-6 lg:px-8 dark:bg-stone-950"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="depoimentos-titulo"
          eyebrow="Depoimentos"
          title="Quem confia, recomenda"
          description="Veja o que os tutores dizem sobre o cuidado que damos aos seus pets."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
