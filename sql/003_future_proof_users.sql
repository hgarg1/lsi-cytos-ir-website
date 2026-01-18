-- 1. Institutions Table
-- IR access is usually firm-based
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    domain VARCHAR(255), -- e.g., 'sequoiacap.com'
    tier VARCHAR(50) DEFAULT 'standard', -- 'strategic', 'standard', 'blacklisted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Expanded Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    
    -- RBAC
    role VARCHAR(50) NOT NULL DEFAULT 'investor', 
    -- Granular scopes: ['docs:read_private', 'audit:view', 'admin:full']
    permissions TEXT[] DEFAULT '{}', 
    
    -- Relationships
    institution_id UUID REFERENCES institutions(id),
    
    -- Lifecycle
    status VARCHAR(20) DEFAULT 'pending', -- 'active', 'pending', 'suspended', 'invited'
    
    -- Compliance (CRITICAL for IR)
    tos_accepted_at TIMESTAMP WITH TIME ZONE,
    
    -- Analytics
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_institution ON users(institution_id);
CREATE INDEX idx_users_status ON users(status);
