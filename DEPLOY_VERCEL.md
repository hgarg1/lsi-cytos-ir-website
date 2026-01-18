# Deploying to Vercel with Cloud PostgreSQL

## 1. Environment Variables
In your Vercel Project Settings > Environment Variables, add the following:

### Option A: Connection String (Recommended)
Most Cloud providers (Google Cloud SQL, Neon, Supabase, AWS RDS) provide a full connection string.
```bash
DATABASE_URL="postgres://user:password@34.x.x.x:5432/ir_platform_db?sslmode=require"
```

### Option B: Discrete Variables
If you prefer individual values:
```bash
POSTGRES_HOST=34.x.x.x
POSTGRES_PORT=5432
POSTGRES_DATABASE=ir_platform_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_SSL=true
```

## 2. NextAuth Secret
You must generate a random secret for authentication to work in production.
```bash
AUTH_SECRET="generate_a_long_random_string_here"
```
*Tip: You can generate one by running `openssl rand -base64 32` in your terminal.*

## 3. Google Cloud SQL Specifics
If using Google Cloud SQL:
1. **Public IP**: Ensure your instance has a Public IP enabled.
2. **Authorized Networks**: You must authorize Vercel's IP addresses.
   * *Note: Vercel IPs change dynamically.*
   * *Solution:* Allow `0.0.0.0/0` (Allow All) on the database firewall **BUT** enforce strong passwords and SSL. This is the standard pattern for serverless.

## 4. Verification
After deployment, visit `/ir`. If you see "Mock Data" or default content, check the Vercel Function Logs.
To confirm the DB is connected, the app will stop showing the "DB Connection Failed" warnings in the logs.
