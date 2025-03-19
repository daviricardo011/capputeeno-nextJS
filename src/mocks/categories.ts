export interface ICategory {
  id: number;
  name: string;
  value: string;
}

export const categories: ICategory[] = [
  { id: 1, name: "Todos os produtos", value: "" },
  { id: 2, name: "Camisetas", value: "camiseta" },
  { id: 3, name: "Canecas", value: "caneca" },
];
