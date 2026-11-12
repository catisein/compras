import type { ItemCompra } from '../features/compras/types';

export type RootStackParamList = {
  Welcome: undefined;
  ListaCompras: undefined;
  Historico: { itens: ItemCompra[] };
  DetalhesItem: { item: ItemCompra };
};