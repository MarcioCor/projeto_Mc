export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
};
