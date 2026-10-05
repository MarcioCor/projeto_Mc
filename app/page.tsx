import { ContactSection } from "@/components/contact/contact-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
