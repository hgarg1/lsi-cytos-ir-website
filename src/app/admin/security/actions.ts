'use server'

import pool from '@/lib/db';
import { SecurityGuard } from '@/lib/security';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export async function getSecurityConfig() {
  const keys = await pool.query('SELECT * FROM api_keys ORDER BY created_at DESC');
  const alerts = await pool.query('SELECT * FROM app_config WHERE key LIKE \'ALERT_%\'');
  return { keys: keys.rows, alerts: alerts.rows };
}

export async function rotateApiKey(formData: FormData) {
  const name = formData.get('name') as string;
  const rawKey = 'ir_' + crypto.randomBytes(32).toString('hex');
  const keyHash = SecurityGuard.hashKey(rawKey);
  const prefix = rawKey.substring(0, 8);

  await pool.query(
    `INSERT INTO api_keys (name, key_hash, prefix, permissions) VALUES ($1, $2, $3, $4)`,
    [name, keyHash, prefix, ['content:write']]
  );
  
  revalidatePath('/admin/security');
  // In a real app, we'd return the raw key to the user here
  return { success: true, rawKey }; 
}

export async function toggleAlert(key: string, value: string) {
  await pool.query(
    `INSERT INTO app_config (key, value, description) VALUES ($1, $2, 'System Alert')
     ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
    [key, value]
  );
  revalidatePath('/admin/security');
}
