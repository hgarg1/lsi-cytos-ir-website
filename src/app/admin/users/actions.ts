'use server'

import pool from '@/lib/db';

export async function getUsers() {
  try {
    const result = await pool.query(`
      SELECT u.*, i.name as institution_name 
      FROM users u
      LEFT JOIN institutions i ON u.institution_id = i.id
      ORDER BY u.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('getUsers failed, returning mock data:', error);
    return [
      {
        id: '1',
        name: 'Archie Garg',
        email: 'archie@lsi.org',
        role: 'super_admin',
        status: 'active',
        institution_name: 'Living Systems Intelligence Internal'
      },
      {
        id: '2',
        name: 'Marcus Thorne',
        email: 'm.thorne@goldman.com',
        role: 'investor',
        status: 'active',
        institution_name: 'Goldman Sachs'
      }
    ];
  }
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
