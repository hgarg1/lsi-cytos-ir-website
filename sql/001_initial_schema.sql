-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. API Keys Table
-- Manages authentication for external apps (like your GCP Admin App)
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL, -- e.g., "GCP Admin App Production"
    key_hash VARCHAR(64) NOT NULL UNIQUE, -- Store HASHED keys only, never plain text
    prefix VARCHAR(8) NOT NULL, -- First few chars for identification (e.g., "ir_live_")
    permissions TEXT[] NOT NULL, -- Array of scopes: ['config:write', 'content:write', 'admin:read']
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- 2. Audit Logs Table
-- Immutable record of who changed what and when
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_key_id UUID REFERENCES api_keys(id),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER NOT NULL,
    resource_id VARCHAR(255), -- ID of the content/config changed
    metadata JSONB, -- Stores specific diffs or request details
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. App Config Table
-- for simple Key-Value pairs (e.g., STOCK_TICKER = "CYTO")
CREATE TABLE IF NOT EXISTS app_config (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES api_keys(id)
);

-- 4. Content Items Table
-- for complex structured content (Press Releases, Bio, Reports)
CREATE TABLE IF NOT EXISTS content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'press_release', 'executive_bio', 'financial_report'
    data JSONB NOT NULL, -- Flexible schema for complex structures
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    version INTEGER DEFAULT 1
);

-- Create indexes for performance
CREATE INDEX idx_content_type ON content_items(type);
CREATE INDEX idx_content_slug ON content_items(slug);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);

-- ==========================================
-- IR MODULE SCHEMA
-- ==========================================

-- 5. IR Documents Table
-- Metadata for a document container
CREATE TABLE IF NOT EXISTS ir_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Financials, Governance, Risk, Letters, Policies, Other
    entity VARCHAR(50) NOT NULL, -- LSI, CytosAI, Corporate
    visibility VARCHAR(20) NOT NULL DEFAULT 'public', -- public, private, internal
    status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, in_review, published, archived, superseded
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. IR Document Versions Table
-- Immutable versions of a document
CREATE TABLE IF NOT EXISTS ir_document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES ir_documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    file_path TEXT NOT NULL, -- Path to storage (local or blob)
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) DEFAULT 'application/pdf',
    size_bytes BIGINT,
    sha256_checksum VARCHAR(64) NOT NULL, -- Security requirement
    notes TEXT, -- Release notes for this version
    published_by UUID, -- Could link to api_keys or separate user table if strictly mapped
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(document_id, version_number)
);

-- 7. IR Access Logs
-- Audit trail for document access
CREATE TABLE IF NOT EXISTS ir_access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_identifier VARCHAR(255) NOT NULL, -- Email or User ID or "Public"
    document_version_id UUID REFERENCES ir_document_versions(id),
    action VARCHAR(50) NOT NULL, -- 'view', 'download'
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. IR Changelog Entries
-- For pages and documents
CREATE TABLE IF NOT EXISTS ir_changelog_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scope_type VARCHAR(20) NOT NULL, -- 'page', 'document'
    scope_id_or_slug VARCHAR(255) NOT NULL, -- e.g., 'governance' or doc UUID
    title VARCHAR(255) NOT NULL,
    body TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for IR Module
CREATE INDEX idx_ir_docs_category ON ir_documents(category);
CREATE INDEX idx_ir_docs_visibility ON ir_documents(visibility);
CREATE INDEX idx_ir_logs_doc ON ir_access_logs(document_version_id);
CREATE INDEX idx_ir_changelog_scope ON ir_changelog_entries(scope_type, scope_id_or_slug);
