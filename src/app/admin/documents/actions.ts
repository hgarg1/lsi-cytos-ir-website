'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function getDocuments() {
  const res = await pool.query(`
    SELECT d.*, 
      (SELECT COUNT(*) FROM ir_access_logs l 
       JOIN ir_document_versions v ON l.document_version_id = v.id 
       WHERE v.document_id = d.id) as download_count
    FROM ir_documents d
    ORDER BY d.updated_at DESC
  `);
  return res.rows;
}

export async function createDocument(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const entity = formData.get('entity') as string;
  
  // Auto-generate slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. Create Document Container
    const docRes = await client.query(
      `INSERT INTO ir_documents (title, slug, category, entity, visibility, status)
       VALUES ($1, $2, $3, $4, $5, 'published')
       RETURNING id`,
      [title, slug, category, entity, visibility]
    );
    const docId = docRes.rows[0].id;

    // 2. Create Initial Version (Mocking file storage)
    const fakeChecksum = crypto.randomBytes(32).toString('hex');
    await client.query(
      `INSERT INTO ir_document_versions (document_id, version_number, file_path, file_name, size_bytes, sha256_checksum, notes)
       VALUES ($1, 1, $2, $3, $4, $5, 'Initial Upload')`,
      [docId, '/uploads/mock.pdf', `${slug}.pdf`, 1024 * 1024 * 2, fakeChecksum]
    );

    await client.query('COMMIT');
    revalidatePath('/admin/documents');
    return { success: true };
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    return { error: 'Failed to create document' };
  } finally {
    client.release();
  }
}

export async function deleteDocument(id: string) {
  await pool.query('DELETE FROM ir_documents WHERE id = $1', [id]);
  revalidatePath('/admin/documents');
}
