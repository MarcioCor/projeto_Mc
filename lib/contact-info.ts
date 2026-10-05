export type ContactChannelIcon = "map" | "phone" | "mail" | "clock";

export type ContactChannel = {
  icon: ContactChannelIcon;
  label: string;
  value: string;
  href?: string;
};

// Dados de exemplo: substituir pelos dados reais do petshop.
export const contactChannels: readonly ContactChannel[] = [
  {
    icon: "map",
    label: "Endereço",
    value: "Rua das Patinhas, 123 – Centro, São Paulo/SP",
    href: "https://www.google.com/maps/search/?api=1&query=Rua+das+Patinhas+123+S%C3%A3o+Paulo",
  },
  {
    icon: "phone",
    label: "Telefone e WhatsApp",
    value: "(11) 91234-5678",
    href: "tel:+5511912345678",
  },
  {
    icon: "mail",
    label: "E-mail",
    value: "contato@petshop.com.br",
    href: "mailto:contato@petshop.com.br",
  },
  {
    icon: "clock",
    label: "Horário de atendimento",
    value: "Seg. a sáb., das 8h às 19h",
  },
];
