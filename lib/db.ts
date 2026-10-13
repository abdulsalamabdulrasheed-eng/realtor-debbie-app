import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pg?: Pool };

export const pool =
  globalForPg.pg ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
    max: 5,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pg = pool;

export async function db<T = any>(text: string, params?: any[]): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}

export async function dbOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await db<T>(text, params);
  return rows[0] ?? null;
}
