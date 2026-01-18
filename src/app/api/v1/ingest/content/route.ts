import { NextRequest, NextResponse } from 'next/server';
import { SecurityGuard } from '@/lib/security';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  // 1. Security Check
  const auth = await SecurityGuard.validateRequest(
    request.headers.get('Authorization'),
    'content:write'
  );

  if (!auth.valid) {
    // Log unauthorized attempt if we had a valid key ID (we don't here usually)
    return NextResponse.json({ error: auth.error }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { slug, type, data, published_at } = body;

    if (!slug || !type || !data) {
      return NextResponse.json({ error: 'Missing required fields: slug, type, data' }, { status: 400 });
    }

    // 2. Database Upsert (Insert or Update)
    // We bump the version on conflict
    const result = await pool.query(
      `INSERT INTO content_items (slug, type, data, published_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (slug) 
       DO UPDATE SET 
         type = EXCLUDED.type,
         data = EXCLUDED.data,
         published_at = EXCLUDED.published_at,
         updated_at = NOW(),
         version = content_items.version + 1
       RETURNING id;`,
      [slug, type, data, published_at || new Date()]
    );

    const resourceId = result.rows[0].id;

    // 3. Audit Log
    await SecurityGuard.logAudit(
      auth.apiKeyId!,
      '/api/v1/ingest/content',
      'POST',
      200,
      resourceId,
      { slug, type }
    );

    return NextResponse.json({ success: true, id: resourceId, message: 'Content persisted' });

  } catch (error) {
    console.error('API Error:', error);
    // Log 500 error
    if (auth.apiKeyId) {
      await SecurityGuard.logAudit(auth.apiKeyId, '/api/v1/ingest/content', 'POST', 500, undefined, { error: String(error) });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
