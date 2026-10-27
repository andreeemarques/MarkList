import type { SQLiteDatabase } from 'expo-sqlite';

import { toProduct, type ProductRow } from '@/database/rows';
import type { Cents, IsoDateString, Product, ProductUnit } from '@/types/models';

const PRODUCT_COLUMNS =
  'id, name, description, current_price_cents, unit, photo_uri, archived_at, created_at, updated_at';

/** Dados necessários para inserir um produto. */
export interface NewProductData {
  name: string;
  description: string | null;
  priceCents: Cents;
  unit: ProductUnit;
  photoUri: string | null;
  createdAt: IsoDateString;
}

/** Insere um produto e devolve o seu `id`. */
export async function insertProduct(db: SQLiteDatabase, data: NewProductData): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO products
       (name, description, current_price_cents, unit, photo_uri, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    data.name,
    data.description,
    data.priceCents,
    data.unit,
    data.photoUri,
    data.createdAt,
    data.createdAt, // um produto novo ainda não foi atualizado
  );

  return result.lastInsertRowId;
}

/** Procura um produto pelo `id`; devolve `null` se não existir. */
export async function findProductById(db: SQLiteDatabase, id: number): Promise<Product | null> {
  const row = await db.getFirstAsync<ProductRow>(
    `SELECT ${PRODUCT_COLUMNS} FROM products WHERE id = ?`,
    id,
  );

  return row ? toProduct(row) : null;
}