import pool from './db';
import { randomUUID } from 'crypto';

export type IRDocument = {
  id: string;
  slug: string;
  title: string;
  category: string;
  entity: string;
  visibility: 'public' | 'private' | 'internal';
  status: string;
  updated_at: Date;
  versions?: IRDocumentVersion[];
};

export type IRDocumentVersion = {
  id: string;
  version_number: number;
  file_path: string;
  file_name: string;
  size_bytes: number;
  sha256_checksum: string;
  notes: string;
  published_at: Date;
};

export class IRService {
  
  // --- Public / Read Methods ---

  static async getDocuments(
    visibility: 'public' | 'all' = 'public',
    permissions: string[] = [],
    category?: string,
    entity?: string
  ) {
    try {
      let query = `
        SELECT d.*, v.version_number, v.published_at, v.file_name, v.size_bytes
        FROM ir_documents d
        LEFT JOIN ir_document_versions v ON d.id = v.document_id
        WHERE v.version_number = (
          SELECT MAX(version_number) FROM ir_document_versions WHERE document_id = d.id
        )
      `;
      
      const params: any[] = [];
      let paramIdx = 1;

      if (visibility === 'public') {
        query += ` AND d.visibility = 'public' AND d.status = 'published'`;
      } else {
        // Only allow viewing private if the permission exists
        if (!permissions.includes('docs:read_private') && !permissions.includes('admin:full')) {
           query += ` AND d.visibility = 'public' AND d.status = 'published'`;
        }
      }

      if (category) {
        query += ` AND d.category = $${paramIdx++}`;
        params.push(category);
      }
      
      if (entity) {
        query += ` AND d.entity = $${paramIdx++}`;
        params.push(entity);
      }

      query += ` ORDER BY v.published_at DESC NULLS LAST`;

      const res = await pool.query(query, params);
      return res.rows;
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL: Database connection failed in PRODUCTION. Serving mock data.', error);
      } else {
        console.warn('DB Connection Failed, returning mock data:', error);
      }
      // Mock Data Fallback
      return [
        {
          id: 'mock-1',
          title: 'Q3 2025 Financial Results',
          slug: 'q3-2025-financial-results',
          category: 'Financials',
          entity: 'Corporate',
          published_at: new Date('2025-10-24'),
          file_name: 'LSI_CytosAI_Q3_2025.pdf',
          size_bytes: 4500000
        },
        {
          id: 'mock-2',
          title: 'Audit Committee Charter',
          slug: 'audit-committee-charter',
          category: 'Governance',
          entity: 'Corporate',
          published_at: new Date('2025-01-15'),
          file_name: 'Audit_Charter_2025.pdf',
          size_bytes: 150000
        },
        {
          id: 'mock-3',
          title: '2025 Annual Shareholder Letter',
          slug: '2025-shareholder-letter',
          category: 'Letters',
          entity: 'Corporate',
          published_at: new Date('2025-01-04'),
          file_name: 'Shareholder_Letter_2025.pdf',
          size_bytes: 1200000
        }
      ];
    }
  }

  static async getDocumentBySlug(slug: string) {
    try {
      const res = await pool.query(`
        SELECT d.*, 
          json_agg(
            json_build_object(
              'version_number', v.version_number,
              'published_at', v.published_at,
              'file_name', v.file_name,
              'notes', v.notes,
              'sha256_checksum', v.sha256_checksum,
              'id', v.id
            ) ORDER BY v.version_number DESC
          ) as versions
        FROM ir_documents d
        LEFT JOIN ir_document_versions v ON d.id = v.document_id
        WHERE d.slug = $1
        GROUP BY d.id
      `, [slug]);
      
      return res.rows[0];
    } catch (error) {
       console.warn('DB Connection Failed, returning mock data for slug:', slug);
       return {
         id: 'mock-detail-1',
         title: 'Q3 2025 Financial Results',
         slug: slug,
         category: 'Financials',
         entity: 'Corporate',
         visibility: 'public',
         versions: [
           {
             version_number: 1,
             published_at: new Date(),
             file_name: 'LSI_CytosAI_Q3_2025.pdf',
             notes: 'Initial Release',
             sha256_checksum: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
             size_bytes: 4500000
           }
         ]
       };
    }
  }

  static async getDocumentVersion(slug: string, versionNumber: number) {
    const res = await pool.query(`
      SELECT v.*, d.visibility, d.title
      FROM ir_document_versions v
      JOIN ir_documents d ON v.document_id = d.id
      WHERE d.slug = $1 AND v.version_number = $2
    `, [slug, versionNumber]);
    
    return res.rows[0];
  }

  // --- Audit / Access ---

  static async logAccess(
    userIdentifier: string,
    versionId: string,
    action: 'view' | 'download',
    ip?: string,
    userAgent?: string
  ) {
    await pool.query(
      `INSERT INTO ir_access_logs (user_identifier, document_version_id, action, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [userIdentifier, versionId, action, ip, userAgent]
    );
  }

  // --- Admin / Write Methods ---
  
  static async createDocument(metadata: {
    title: string;
    slug: string;
    category: string;
    entity: string;
    visibility: string;
  }) {
    const res = await pool.query(
      `INSERT INTO ir_documents (title, slug, category, entity, visibility, status)
       VALUES ($1, $2, $3, $4, $5, 'draft')
       RETURNING id`,
      [metadata.title, metadata.slug, metadata.category, metadata.entity, metadata.visibility]
    );
    return res.rows[0].id;
  }

  static async publishVersion(
    docId: string,
    fileData: {
      path: string;
      name: string;
      size: number;
      checksum: string;
    },
    notes: string
  ) {
    // Get next version number
    const verRes = await pool.query(
      `SELECT COALESCE(MAX(version_number), 0) + 1 as next_ver FROM ir_document_versions WHERE document_id = $1`,
      [docId]
    );
    const nextVer = verRes.rows[0].next_ver;

    await pool.query(
      `INSERT INTO ir_document_versions (document_id, version_number, file_path, file_name, size_bytes, sha256_checksum, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [docId, nextVer, fileData.path, fileData.name, fileData.size, fileData.checksum, notes]
    );

    // Update doc status
    await pool.query(
      `UPDATE ir_documents SET status = 'published', updated_at = NOW() WHERE id = $1`,
      [docId]
    );
  }
}
