-- 1. Create User Emails Table
CREATE TABLE IF NOT EXISTS user_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Migrate existing emails from users table
INSERT INTO user_emails (user_id, email, is_primary, verified_at)
SELECT id, email, TRUE, NOW() FROM users
ON CONFLICT (email) DO NOTHING;

-- 3. Add the second email for Archie
-- Assuming 'archie@lsi.org' is the existing email for the admin record
INSERT INTO user_emails (user_id, email, is_primary, verified_at)
SELECT id, 'archie@cytos.ai', FALSE, NOW() 
FROM users 
WHERE email = 'archie@lsi.org'
ON CONFLICT (email) DO NOTHING;

-- 4. Create index for performance
CREATE INDEX idx_user_emails_email ON user_emails(email);
