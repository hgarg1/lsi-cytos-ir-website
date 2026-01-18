# Investor Relations Module

This project includes a dedicated Investor Relations (IR) module designed for institutional trust and compliance.

## Features
- **Document Center**: Version controlled PDFs with SHA-256 checksums.
- **Access Control**: Public vs Private (Investor) document visibility.
- **Audit Logging**: Tracks access to sensitive documents.
- **Admin Portal**: Internal tool for publishing reports.

## Setup & Seeding
1. **Database Schema**: Ensure the SQL in `src/db/schema.sql` is applied to your Postgres instance.
2. **Seeding Content**:
   - Navigate to `/admin/ir` (e.g., `http://localhost:3000/admin/ir`).
   - Click "Seed Database" to generate the initial folder structure and sample documents.

## Usage
- **Public View**: Visit `/ir` to see the investor overview.
- **Reports**: Visit `/ir/reports-filings` for the document library.
- **Admin**: Use `/admin/ir` to upload new filings.

## Security
- Private documents are marked `visibility: 'private'` in the database.
- The `IRService` filters these out by default unless explicitly requested by an authenticated context.
- Robots.txt disallows indexing of private sections (`/ir/risk-factors`, etc.).
