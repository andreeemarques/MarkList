import type { SQLiteDatabase } from 'expo-sqlite';

/**
 * Migrações do esquema da base de dados.
 *
 * Regras:
 * - Cada migração tem uma versão única e crescente (1, 2, 3...).
 * - Uma migração JÁ APLICADA nunca se altera: para mudar o esquema, acrescenta-se
 *   uma migração nova no fim da lista.
 * - A versão fica guardada em `PRAGMA user_version`.
 */

interface Migration {
  version: number;
  description: string;
  sql: string;
}

const MIGRATIONS: Migration[] = [
  {
    version: 1,
    description: 'Esquema inicial',
    sql: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL CHECK (length(trim(name)) > 0),
        description TEXT,
        current_price_cents INTEGER NOT NULL CHECK (current_price_cents >= 0),
        unit TEXT NOT NULL DEFAULT 'un' CHECK (unit IN ('un', 'kg', 'l')),
        photo_uri TEXT,
        archived_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE price_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
        price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
        changed_at TEXT NOT NULL
      );

      CREATE INDEX idx_price_history_product_date
        ON price_history (product_id, changed_at);

      CREATE TABLE shopping_lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL CHECK (length(trim(name)) > 0),
        description TEXT,
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT
      );

      CREATE TABLE shopping_list_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list_id INTEGER NOT NULL REFERENCES shopping_lists (id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE RESTRICT,
        product_name_snapshot TEXT NOT NULL,
        unit_snapshot TEXT NOT NULL CHECK (unit_snapshot IN ('un', 'kg', 'l')),
        unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
        quantity REAL NOT NULL CHECK (quantity > 0),
        is_purchased INTEGER NOT NULL DEFAULT 0 CHECK (is_purchased IN (0, 1)),
        purchased_at TEXT,
        created_at TEXT NOT NULL,
        UNIQUE (list_id, product_id)
      );

      CREATE INDEX idx_items_product ON shopping_list_items (product_id);
      CREATE INDEX idx_items_purchased_at ON shopping_list_items (purchased_at);

      CREATE TABLE settings (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );
    `,
  },
];

const LATEST_SCHEMA_VERSION = Math.max(...MIGRATIONS.map((migration) => migration.version));

/** Aplica, por ordem, as migrações que a base de dados ainda não tem. */
export async function runMigrations(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion > LATEST_SCHEMA_VERSION) {
    // Dados criados por uma versão mais recente da app: não os tocamos.
    throw new Error(
      `A base de dados está na versão ${currentVersion}, mais recente do que a que esta app suporta (${LATEST_SCHEMA_VERSION}).`,
    );
  }

  const pending = MIGRATIONS.filter((migration) => migration.version > currentVersion).sort(
    (a, b) => a.version - b.version,
  );

  for (const migration of pending) {
    // Transação: o esquema e a nova versão são guardados juntos, ou nenhum dos dois.
    await db.withTransactionAsync(async () => {
      await db.execAsync(migration.sql);
      // Os PRAGMA não aceitam parâmetros; a versão vem de uma constante nossa, não de dados externos.
      await db.execAsync(`PRAGMA user_version = ${migration.version}`);
    });

    if (__DEV__) {
      console.log(`[db] migração ${migration.version} aplicada: ${migration.description}`);
    }
  }
}