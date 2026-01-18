import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import pool from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
          // Fetch user with institution details
          const result = await pool.query(`
            SELECT u.*, i.name as institution_name, i.tier as institution_tier
            FROM users u
            LEFT JOIN institutions i ON u.institution_id = i.id
            WHERE u.email = $1
          `, [email]);

          if (result.rows.length > 0) {
            const user = result.rows[0];
            
            // Block suspended users immediately
            if (user.status === 'suspended') return null;

            // Update last login
            pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
            
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image_url,
              role: user.role,
              permissions: user.permissions || [],
              institution: user.institution_name,
              isSsoManaged: user.is_sso_managed,
            };
          }

          // Auto-Provisioning for verified domains (Tier 2 access)
          const allowedDomains = ['cytosai.tech', 'cytos.ai', 'lsi.org', 'livingsystemsintelligence.org'];
          const domain = email.split('@')[1];

          if (allowedDomains.includes(domain)) {
             return {
               id: 'provisioned-' + email,
               email: email,
               name: email.split('@')[0],
               image: null,
               role: 'investor',
               permissions: ['docs:read_public'],
               status: 'active',
               isSsoManaged: false,
             };
          }
          
          return null;
        } catch (error) {
          console.error('Auth System Error:', error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: '/auth/signin', error: '/auth/error' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
        token.institution = (user as any).institution;
        token.isSsoManaged = (user as any).isSsoManaged;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).permissions = token.permissions;
        (session.user as any).institution = token.institution;
        (session.user as any).isSsoManaged = token.isSsoManaged;
      }
      return session;
    },
  },
});
