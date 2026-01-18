import 'server-only';
import { Pool, PoolConfig } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

// Configuration helper that prefers DATABASE_URL but falls back to discrete vars
const getConfig = (): PoolConfig => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Required for most Cloud SQL / Vercel external connections
    };
  }

  return {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD || '',
    ssl: process.env.POSTGRES_SSL === 'true' || isProduction 
      ? { rejectUnauthorized: false } 
      : undefined,
    connectionTimeoutMillis: 5000, // 5 seconds
  };
};

const pool = new Pool(getConfig());

// Helper to test connection (call this in a health check route)
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