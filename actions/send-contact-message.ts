"use server";

import { z } from "zod";
import { deliverContactMessage } from "@/lib/contact-delivery";
import {
  contactFormSchema,
  type ContactFormState,
  type ContactFormValues,
} from "@/types/contact";

/** Campo invisível para humanos: se vier preenchido, é bot. */
const HONEYPOT_FIELD = "website";

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function readContactFormValues(formData: FormData): ContactFormValues {
  return {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    subject: readText(formData, "subject"),
    message: readText(formData, "message"),
  };
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const successState: ContactFormState = {
    status: "success",
    message: "Mensagem enviada! Responderemos em até 1 dia útil.",
  };

  if (readText(formData, HONEYPOT_FIELD) !== "") {
    return successState;
  }

  const values = readContactFormValues(formData);
  const result = contactFormSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: "Revise os campos destacados e tente novamente.",
      fieldErrors: z.flattenError(result.error).fieldErrors,
      values,
    };
  }

  try {
    await deliverContactMessage(result.data);
  } catch (error) {
    console.error("[contato] falha ao entregar mensagem", error);
    return {
      status: "error",
      message:
        "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
      values,
    };
  }

  return successState;
}
