"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/actions/send-contact-message";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { contactSubjectLabels } from "@/lib/contact-subjects";
import {
  CONTACT_SUBJECTS,
  initialContactFormState,
  type ContactField,
} from "@/types/contact";
import { FormFeedback } from "./form-feedback";

const fieldId = (field: ContactField) => `contato-${field}`;

export function ContactForm() {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialContactFormState,
  );

  const errorOf = (field: ContactField) => state.fieldErrors?.[field]?.[0];
  const valueOf = (field: ContactField) => state.values?.[field] ?? "";

  return (
    // noValidate: as mensagens de validação vêm do servidor (Zod), sempre em português.
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={fieldId("name")} label="Nome" error={errorOf("name")}>
          {(a11yProps) => (
            <Input
              {...a11yProps}
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              defaultValue={valueOf("name")}
            />
          )}
        </FormField>

        <FormField
          id={fieldId("email")}
          label="E-mail"
          error={errorOf("email")}
        >
          {(a11yProps) => (
            <Input
              {...a11yProps}
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              defaultValue={valueOf("email")}
            />
          )}
        </FormField>

        <FormField
          id={fieldId("phone")}
          label="Telefone"
          optional
          error={errorOf("phone")}
        >
          {(a11yProps) => (
            <Input
              {...a11yProps}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              defaultValue={valueOf("phone")}
            />
          )}
        </FormField>

        <FormField
          id={fieldId("subject")}
          label="Assunto"
          error={errorOf("subject")}
        >
          {(a11yProps) => (
            <Select
              {...a11yProps}
              name="subject"
              required
              defaultValue={valueOf("subject")}
            >
              <option value="" disabled>
                Selecione um assunto
              </option>
              {CONTACT_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {contactSubjectLabels[subject]}
                </option>
              ))}
            </Select>
          )}
        </FormField>
      </div>

      <FormField
        id={fieldId("message")}
        label="Mensagem"
        error={errorOf("message")}
      >
        {(a11yProps) => (
          <Textarea
            {...a11yProps}
            name="message"
            rows={5}
            required
            maxLength={1000}
            placeholder="Conte como podemos ajudar você e seu pet…"
            defaultValue={valueOf("message")}
          />
        )}
      </FormField>

      {/* Armadilha anti-spam: invisível para pessoas, bots costumam preencher. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contato-website">Não preencha este campo</label>
        <input
          id="contato-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FormFeedback status={state.status} message={state.message} />

      <div>
        <SubmitButton pendingLabel="Enviando…">Enviar mensagem</SubmitButton>
      </div>
    </form>
  );
}
