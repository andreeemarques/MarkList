/**
 * Modelos de domínio da app.
 *
 * São o que os ecrãs e os services veem. A base de dados usa nomes em snake_case
 * e booleanos como 0/1; os repositories convertem essas linhas para estes modelos.
 */

/** Valor em cêntimos (ex.: 1,50 € é 150). Evita erros de arredondamento dos decimais. */
export type Cents = number;

/** Data e hora em ISO 8601 UTC (ex.: '2026-10-26T14:30:00.000Z'). */
export type IsoDateString = string;

/** Unidades suportadas. Decidem como se mostra a quantidade (un, kg, l). */
export const PRODUCT_UNITS = ['un', 'kg', 'l'] as const;
export type ProductUnit = (typeof PRODUCT_UNITS)[number];

/** Estados de uma lista de compras. */
export const LIST_STATUSES = ['active', 'completed'] as const;
export type ListStatus = (typeof LIST_STATUSES)[number];

/** Um produto do catálogo. */
export interface Product {
  id: number;
  name: string;
  description: string | null;
  /** Preço atual. Os itens das listas guardam o seu próprio preço (ver ShoppingListItem). */
  currentPriceCents: Cents;
  unit: ProductUnit;
  photoUri: string | null;
  /** Se tem data, o produto foi "eliminado" (arquivado), mas o histórico mantém-se. */
  archivedAt: IsoDateString | null;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

/** Um registo no histórico de preços de um produto. */
export interface PriceHistoryEntry {
  id: number;
  productId: number;
  priceCents: Cents;
  changedAt: IsoDateString;
}

/** Uma lista de compras. */
export interface ShoppingList {
  id: number;
  name: string;
  description: string | null;
  status: ListStatus;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
  /** Só tem valor quando a lista está concluída. */
  completedAt: IsoDateString | null;
}

/** Um produto dentro de uma lista de compras. */
export interface ShoppingListItem {
  id: number;
  listId: number;
  productId: number;
  /** Nome e unidade do produto no momento em que o item foi adicionado. */
  productNameSnapshot: string;
  unitSnapshot: ProductUnit;
  /** Preço no momento em que o item foi adicionado. Não muda se o produto mudar de preço. */
  unitPriceCents: Cents;
  /** Pode ser decimal (ex.: 1,5 kg). */
  quantity: number;
  isPurchased: boolean;
  purchasedAt: IsoDateString | null;
  createdAt: IsoDateString;
}