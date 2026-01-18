# Database Setup Scripts

To initialize your PostgreSQL database (Local or Cloud), run these scripts in order.

## 1. Initial Schema
**File:** `001_initial_schema.sql`
**Description:** Creates the `api_keys`, `audit_logs`, `content_items`, and IR-specific tables (`ir_documents`, etc.).

### How to Run (Local)
```bash
psql -h localhost -U postgres -d ir_dev_db -f sql/001_initial_schema.sql
```

### How to Run (Google Cloud SQL)
1. Connect via Cloud Shell or Proxy.
2. Run:
```bash
psql -h 34.x.x.x -U postgres -d ir_prod_db -f sql/001_initial_schema.sql
```
