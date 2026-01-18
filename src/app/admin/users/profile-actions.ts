'use server'

import pool from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // Verify if managed by SSO
  const userRes = await pool.query('SELECT is_sso_managed FROM users WHERE email = $1', [session.user.email]);
  if (userRes.rows[0]?.is_sso_managed) {
    return { error: 'Profile is managed by Corporate SSO and cannot be edited manually.' };
  }

  await pool.query(
    'UPDATE users SET name = $1, image_url = $2, updated_at = NOW() WHERE email = $3',
    [name, imageUrl, session.user.email]
  );

  revalidatePath('/');
  return { success: true };
}
