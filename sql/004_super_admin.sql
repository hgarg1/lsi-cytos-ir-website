-- 1. Create the Internal Institution if it doesn't exist
INSERT INTO institutions (name, domain, tier)
VALUES ('Living Systems Intelligence Internal', 'lsi.org', 'strategic')
ON CONFLICT (name) DO NOTHING;

-- 2. Add Archie as Super Admin
-- We grant 'admin:full' which should be checked by sensitive Admin UI components
INSERT INTO users (
    email, 
    name, 
    role, 
    permissions, 
    status, 
    institution_id
)
VALUES (
    'archie@lsi.org', 
    'Archie Garg', 
    'super_admin', 
    ARRAY['admin:full', 'docs:write', 'docs:read_private', 'audit:view', 'users:manage'], 
    'active',
    (SELECT id FROM institutions WHERE name = 'Living Systems Intelligence Internal')
)
ON CONFLICT (email) 
DO UPDATE SET 
    role = 'super_admin',
    permissions = ARRAY['admin:full', 'docs:write', 'docs:read_private', 'audit:view', 'users:manage'],
    status = 'active';
