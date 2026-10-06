import type { ChecklistGroup } from "@/types/checklist";

// Os ids dos blocos e dos itens são usados para salvar as marcações no
// navegador: trocar o texto (label) não perde nada, trocar o id perde.
export const checklistGroups: ChecklistGroup[] = [
  {
    id: "saude",
    title: "Saúde",
    description: "O básico para manter o seu pet protegido e acompanhado.",
    items: [
      { id: "vacinas", label: "Vacinas em dia" },
      { id: "vermifugo", label: "Vermífugo aplicado" },
      { id: "antipulgas", label: "Antipulgas e carrapatos aplicado" },
      { id: "consulta", label: "Consulta veterinária no último ano" },
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentação",
    description: "Refeições certas, na medida certa, todos os dias.",
    items: [
      { id: "racao", label: "Ração adequada à idade e ao porte" },
      { id: "agua", label: "Água fresca sempre disponível" },
      { id: "porcoes", label: "Porções medidas, sem excesso de petiscos" },
      { id: "potes", label: "Comedouro e bebedouro limpos" },
    ],
  },
  {
    id: "higiene",
    title: "Higiene",
    description: "Cuidados de rotina para o conforto e o bem-estar do pet.",
    items: [
      { id: "banho", label: "Banho na frequência indicada" },
      { id: "escovacao", label: "Escovação dos pelos" },
      { id: "unhas", label: "Unhas aparadas" },
      { id: "dentes-ouvidos", label: "Dentes e ouvidos verificados" },
    ],
  },
];
