import type { SQLiteDatabase } from 'expo-sqlite';

import type { Cents, IsoDateString } from '@/types/models';

/** Regista um preço no histórico de um produto. */
export async function insertPriceHistory(
  db: SQLiteDatabase,
  productId: number,
  priceCents: Cents,
  changedAt: IsoDateString,
): Promise<void> {
  await db.runAsync(
    'INSERT INTO price_history (product_id, price_cents, changed_at) VALUES (?, ?, ?)',
    productId,
    priceCents,
    changedAt,
  );
}