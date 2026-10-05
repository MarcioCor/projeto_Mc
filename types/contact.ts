import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "banho-e-tosa",
  "consulta-veterinaria",
  "hotelzinho",
  "outros",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

const PHONE_PATTERN = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe seu nome.")
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(80, "O nome deve ter no máximo 80 caracteres."),
  email: z
    .string()
    .trim()
    .max(254, "O e-mail deve ter no máximo 254 caracteres.")
    .pipe(z.email("Informe um e-mail válido.")),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || PHONE_PATTERN.test(value),
      "Informe um telefone com DDD, ex.: (11) 91234-5678.",
    ),
  subject: z.enum(CONTACT_SUBJECTS, "Escolha um assunto."),
  message: z
    .string()
    .trim()
    .min(1, "Escreva sua mensagem.")
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(1000, "A mensagem deve ter no máximo 1000 caracteres."),
});

export type ContactMessage = z.infer<typeof contactFormSchema>;

export type ContactField = keyof ContactMessage;

export type ContactFormValues = Record<ContactField, string>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
  values?: ContactFormValues;
};

export const initialContactFormState: ContactFormState = { status: "idle" };
