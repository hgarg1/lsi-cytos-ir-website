import 'server-only';
import pool from '@/lib/db';
import { auth } from '@/auth';

export async function getLiveUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  try {
    const result = await pool.query(
      `SELECT u.*, i.name as institution_name 
       FROM users u
       LEFT JOIN institutions i ON u.institution_id = i.id
       WHERE u.email = $1`,
      [session.user.email]
    );

    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    return {
      ...user,
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image_url, // Map DB column to image property
      role: user.role,
      permissions: user.permissions || [],
      institution: user.institution_name,
      isSsoManaged: user.is_sso_managed,
    };
  } catch (error) {
    console.error('Error fetching live user:', error);
    return null;
  }
}
