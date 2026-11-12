export type CategoriaItem =
  | 'Geral'
  | 'Frutas e Legumes'
  | 'Lacticínios'
  | 'Talho e Peixaria'
  | 'Padaria'
  | 'Bebidas'
  | 'Limpeza'
  | 'Higiene';

export type ItemCompra = {
  id: string;
  nome: string;
  quantidade: number;
  categoria: CategoriaItem;
  comprado: boolean;
  notas?: string;
  data: string; // <-- Essencial para o histórico
};

export type FiltroCompra = 'Todos' | 'Pendentes' | 'Comprados' | CategoriaItem;