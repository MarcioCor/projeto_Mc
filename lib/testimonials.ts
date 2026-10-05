import type { Testimonial } from "@/types/testimonial";

export const testimonials: readonly Testimonial[] = [
  {
    id: "ana-thor",
    author: "Ana Paula",
    petName: "Thor",
    petSpecies: "Golden Retriever",
    service: "Banho e tosa",
    rating: 5,
    quote:
      "O Thor sempre volta cheiroso e tranquilo. A equipe manda foto durante o banho e trata ele como se fosse da família.",
  },
  {
    id: "ricardo-mia",
    author: "Ricardo Lima",
    petName: "Mia",
    petSpecies: "Gata SRD",
    service: "Consulta veterinária",
    rating: 5,
    quote:
      "A Mia tem pavor de sair de casa, mas aqui o atendimento foi calmo e sem pressa. A veterinária explicou tudo com paciência.",
  },
  {
    id: "juliana-pipoca",
    author: "Juliana Souza",
    petName: "Pipoca",
    petSpecies: "Shih-tzu",
    service: "Hotelzinho",
    rating: 4,
    quote:
      "Deixei a Pipoca durante uma viagem e recebi notícias todos os dias. Voltei e ela estava feliz e bem cuidada.",
  },
];
