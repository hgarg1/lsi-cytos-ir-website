import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import pool from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      name: 'Enterprise SSO',
      credentials: {
        email: { label: "Email", type: "email" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        
        if (!email) throw new Error('Email required');

        try {
          const result = await pool.query(`
            SELECT u.*, i.name as institution_name, i.tier as institution_tier, ue.email as matched_email
            FROM user_emails ue
            JOIN users u ON ue.user_id = u.id
            LEFT JOIN institutions i ON u.institution_id = i.id
            WHERE ue.email = $1
          `, [email]);

          if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.status === 'suspended') return null;

            // Log login event
            pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]).catch(e => console.error('Update login error:', e));
            
            // ULTRA-MINIMAL PAYLOAD to fix ERR_RESPONSE_HEADERS_TOO_BIG
            return {
              id: String(user.id),
              email: String(user.matched_email),
              name: String(user.name),
              role: String(user.role),
            };
          }
        } catch (dbError) {
          console.error('[AUTH] DATABASE_ERROR:', dbError);
        }

        // Auto-Provisioning Fallback
        const allowedDomains = ['cytosai.tech', 'cytos.ai', 'lsi.org', 'livingsystemsintelligence.org'];
        const domain = email.split('@')[1];

        if (allowedDomains.includes(domain)) {
           return {
             id: 'provisioned-' + email,
             email: email,
             name: email.split('@')[0],
             role: 'investor',
           };
        }
        
        return null;
      },
    }),
  ],
  pages: { 
    signIn: '/auth/signin', 
    error: '/auth/error' 
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = String(token.sub);
        (session.user as any).role = String(token.role);
      }
      return session;
    },
  },
});