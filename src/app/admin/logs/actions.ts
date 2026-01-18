'use server'

import pool from '@/lib/db';

export async function getDetailedLogs() {
  const res = await pool.query(`
    SELECT l.*, 
           u.email as user_email, 
           u.role as user_role,
           d.title as doc_title
    FROM ir_access_logs l
    LEFT JOIN users u ON l.user_identifier = u.email
    LEFT JOIN ir_document_versions v ON l.document_version_id = v.id
    LEFT JOIN ir_documents d ON v.document_id = d.id
    ORDER BY l.timestamp DESC
    LIMIT 50
  `);
  return res.rows;
}
