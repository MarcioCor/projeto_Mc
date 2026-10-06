import { ChecklistSection } from "@/components/checklist/checklist-section";
import { ContactSection } from "@/components/contact/contact-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <TestimonialsSection />
      <ChecklistSection />
      <ContactSection />
    </main>
  );
}
