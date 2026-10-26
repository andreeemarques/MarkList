import type { SQLiteDatabase } from 'expo-sqlite';

/** Nome do ficheiro da base de dados, guardado no armazenamento interno da app. */
export const DATABASE_NAME = 'lista-compras.db';

/**
 * Corre sempre que a base de dados é aberta (no arranque da app).
 * Tem de ser seguro executar várias vezes.
 */
export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
  // `foreign_keys` vale só para esta ligação e vem desligado por defeito no SQLite.
  // `journal_mode = WAL` evita que leituras e escritas se bloqueiem mutuamente.
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

  // Na subtarefa 2.3 é aqui que passam a ser aplicadas as migrações.

  if (__DEV__) {
    const foreignKeys = await db.getFirstAsync<{ foreign_keys: number }>('PRAGMA foreign_keys');
    const version = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    console.log(
      `[db] aberta: foreign_keys=${foreignKeys?.foreign_keys}, user_version=${version?.user_version}`,
    );
  }
}