'use server'

import pool from '@/lib/db';

export async function getUsers() {
  const result = await pool.query(`
    SELECT u.*, i.name as institution_name 
    FROM users u
    LEFT JOIN institutions i ON u.institution_id = i.id
    ORDER BY u.created_at DESC
  `);
  return result.rows;
}

export async function updateUserRole(userId: string, role: string) {
  await pool.query('UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2', [role, userId]);
  return { success: true };
}

export async function toggleUserStatus(userId: string, currentStatus: string) {
  const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
  await pool.query('UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2', [nextStatus, userId]);
  return { success: true };
}
