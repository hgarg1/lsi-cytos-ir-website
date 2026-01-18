import 'server-only';
import pool from './db';
import crypto from 'crypto';

export type Permission = 'config:read' | 'config:write' | 'content:read' | 'content:write' | 'admin:full';

interface AuthResult {
  valid: boolean;
  apiKeyId?: string;
  error?: string;
}

export class SecurityGuard {
  
  /**
   * Hashes an API key for storage/comparison using SHA-256
   */
  static hashKey(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
  }

  /**
   * Validates an incoming request's API Key
   */
  static async validateRequest(
    authHeader: string | null, 
    requiredPermission: Permission
  ): Promise<AuthResult> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'Missing or malformed Authorization header' };
    }

    const apiKey = authHeader.split(' ')[1];
    const keyHash = this.hashKey(apiKey);

    try {
      const result = await pool.query(
        `SELECT id, permissions, is_active FROM api_keys WHERE key_hash = $1`,
        [keyHash]
      );

      if (result.rows.length === 0) {
        // Log failed attempt? (Optional, be careful of DoS log filling)
        return { valid: false, error: 'Invalid API Key' };
      }

      const keyRecord = result.rows[0];

      if (!keyRecord.is_active) {
        return { valid: false, error: 'API Key is revoked' };
      }

      if (!keyRecord.permissions.includes(requiredPermission)) {
        return { valid: false, error: `Missing permission: ${requiredPermission}` };
      }

      // Update last used asynchronously
      pool.query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1', [keyRecord.id]);

      return { valid: true, apiKeyId: keyRecord.id };

    } catch (err) {
      console.error('Auth Error:', err);
      return { valid: false, error: 'Internal Authentication Error' };
    }
  }

  /**
   * Logs an API event to the database
   */
  static async logAudit(
    apiKeyId: string,
    endpoint: string,
    method: string,
    statusCode: number,
    resourceId?: string,
    metadata?: any
  ) {
    // Fire and forget - don't await this in the critical path unless strict audit required
    try {
      await pool.query(
        `INSERT INTO audit_logs (api_key_id, endpoint, method, status_code, resource_id, metadata)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [apiKeyId, endpoint, method, statusCode, resourceId, JSON.stringify(metadata)]
      );
    } catch (err) {
      console.error('Audit Log Failed:', err);
    }
  }
}
