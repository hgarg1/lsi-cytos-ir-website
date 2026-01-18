'use server'

import pool from '@/lib/db';
import { SecurityGuard } from '@/lib/security';
import crypto from 'crypto';

// NOTE: In a real production app, these actions should be protected by
// NextAuth.js or a similar session-based authentication for the human admin.

export async function getAuditLogs() {
  const result = await pool.query(`
    SELECT l.*, k.name as key_name 
    FROM audit_logs l
    LEFT JOIN api_keys k ON l.api_key_id = k.id
    ORDER BY l.timestamp DESC 
    LIMIT 100
  `);
  return result.rows;
}

export async function getApiKeys() {
  const result = await pool.query(`
    SELECT id, name, prefix, permissions, is_active, created_at, last_used_at 
    FROM api_keys 
    ORDER BY created_at DESC
  `);
  return result.rows;
}

export async function createApiKey(name: string, permissions: string[]) {
  // Generate a random 32-byte hex string (64 chars)
  const rawKey = 'ir_' + crypto.randomBytes(32).toString('hex');
  const keyHash = SecurityGuard.hashKey(rawKey);
  const prefix = rawKey.substring(0, 8);

  await pool.query(
    `INSERT INTO api_keys (name, key_hash, prefix, permissions) VALUES ($1, $2, $3, $4)`,
    [name, keyHash, prefix, permissions]
  );

  // Return the RAW key once so the user can copy it. It is never stored again.
  return rawKey;
}

export async function revokeApiKey(id: string) {
  await pool.query('UPDATE api_keys SET is_active = FALSE WHERE id = $1', [id]);
  return { success: true };
}
