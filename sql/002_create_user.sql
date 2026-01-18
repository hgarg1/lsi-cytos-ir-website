-- 1. Create the Application User (if it doesn't exist)
-- Replace 'secure_app_password' with a strong password.
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'ir_app_user') THEN

      CREATE ROLE ir_app_user WITH LOGIN PASSWORD 'secure_app_password';
   END IF;
END
$do$;

-- 2. Grant Connection Privilege
GRANT CONNECT ON DATABASE ir_dev_db TO ir_app_user;

-- 3. Grant Usage on Public Schema (Allows accessing tables in 'public')
GRANT USAGE ON SCHEMA public TO ir_app_user;

-- 4. Grant Read/Write on Existing Tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ir_app_user;

-- 5. Grant Usage on Sequences (Required for auto-incrementing IDs like UUID generators)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ir_app_user;

-- 6. Ensure Future Tables are Accessible automatically
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ir_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO ir_app_user;
