import { NextRequest, NextResponse } from 'next/server';
import { SecurityGuard } from '@/lib/security';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  const auth = await SecurityGuard.validateRequest(
    request.headers.get('Authorization'),
    'config:write'
  );

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { key, value, description } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Missing required fields: key, value' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO app_config (key, value, description, updated_by)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (key) 
       DO UPDATE SET 
         value = EXCLUDED.value,
         description = COALESCE(EXCLUDED.description, app_config.description),
         updated_at = NOW(),
         updated_by = EXCLUDED.updated_by`,
      [key, String(value), description, auth.apiKeyId]
    );

    await SecurityGuard.logAudit(
      auth.apiKeyId!,
      '/api/v1/ingest/config',
      'POST',
      200,
      key,
      { value_length: String(value).length }
    );

    return NextResponse.json({ success: true, key });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
