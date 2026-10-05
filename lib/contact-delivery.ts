import "server-only";
import type { ContactMessage } from "@/types/contact";

/**
 * Ponto único de entrega das mensagens de contato.
 * Ainda não há provedor de e-mail/CRM configurado: por enquanto apenas
 * registra no log do servidor (sem dados pessoais). Integrar aqui o envio real.
 */
export async function deliverContactMessage(
  contactMessage: ContactMessage,
): Promise<void> {
  console.info(
    `[contato] nova mensagem recebida (assunto: ${contactMessage.subject})`,
  );
}
