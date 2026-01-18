import 'server-only';
import { Pool, PoolConfig } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const getConfig = (): PoolConfig => {
  return {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD || '',
    ssl: process.env.POSTGRES_SSL === 'true' || isProduction 
      ? { rejectUnauthorized: false } 
      : undefined,
    connectionTimeoutMillis: 5000,
  };
};

// Singleton pattern for PostgreSQL pool in Development
const globalForPg = global as unknown as { pool: Pool };

export const pool = globalForPg.pool || new Pool(getConfig());

if (!isProduction) globalForPg.pool = pool;

export const testConnection = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;