\i 001_initial_schema.sql
\i 002_create_user.sql
\i 003_add_users_table.sql
\i 003_future_proof_users.sql     -- Pick the correct one if duplicates
\i 004_add_global_admin.sql
\i 004_super_admin.sql             -- Same here
\i 005_user_profile_fields.sql
\i 006_multi_email_support.sql

-- Final confirmation query (optional)
SELECT 'All migrations completed successfully!' AS status;