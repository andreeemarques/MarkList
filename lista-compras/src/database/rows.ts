/**
 * Linhas das tabelas tal como o SQLite as devolve (nomes em snake_case),
 * e funções que as convertem nos modelos de domínio (camelCase).
 * Só os repositories conhecem estes tipos.
 */

import type { Cents, IsoDateString, Product, ProductUnit } from '@/types/models';

/** Uma linha da tabela `products`. */
export interface ProductRow {
  id: number;
  name: string;
  description: string | null;
  current_price_cents: Cents;
  // O CHECK da tabela garante que só pode ser 'un', 'kg' ou 'l'.
  unit: ProductUnit;
  photo_uri: string | null;
  archived_at: IsoDateString | null;
  created_at: IsoDateString;
  updated_at: IsoDateString;
}

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    currentPriceCents: row.current_price_cents,
    unit: row.unit,
    photoUri: row.photo_uri,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}