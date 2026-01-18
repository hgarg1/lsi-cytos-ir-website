'use server';

import { IRService } from '@/lib/ir-service';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function seedIRData(prevState: any, formData: FormData) {
  try {
    // 1. Create a Q3 Report
    const docId = await IRService.createDocument({
      title: 'Q3 2025 Financial Results',
      slug: 'q3-2025-financial-results',
      category: 'Financials',
      entity: 'Corporate',
      visibility: 'public'
    });

    await IRService.publishVersion(docId, {
      path: '/uploads/q3-2025.pdf',
      name: 'LSI_CytosAI_Q3_2025_Results.pdf',
      size: 4500000,
      checksum: 'a1b2c3d4e5f6...'
    }, 'Initial publication');

    // 2. Create a Governance Charter
    const govId = await IRService.createDocument({
      title: 'Audit Committee Charter',
      slug: 'audit-committee-charter',
      category: 'Governance',
      entity: 'Corporate',
      visibility: 'public'
    });

    await IRService.publishVersion(govId, {
      path: '/uploads/audit-charter-v4.pdf',
      name: 'Audit_Committee_Charter_2025.pdf',
      size: 120000,
      checksum: 'f5e4d3c2b1...'
    }, 'Annual review update');

    // 3. Create a Private Risk Report
    const riskId = await IRService.createDocument({
      title: 'Clinical Trial Risk Assessment - Cytos-V',
      slug: 'cytos-v-risk-assessment',
      category: 'Risk',
      entity: 'LSI',
      visibility: 'private'
    });

    await IRService.publishVersion(riskId, {
      path: '/uploads/risk-cytos-v.pdf',
      name: 'CONFIDENTIAL_Cytos_V_Risk_Assessment.pdf',
      size: 890000,
      checksum: '9988776655...'
    }, 'Board view only');

    revalidatePath('/ir/reports-filings');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to seed data: ' + String(err) };
  }
}

export async function createIRDocument(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const entity = formData.get('entity') as string;
  const visibility = formData.get('visibility') as string;
  const filename = formData.get('filename') as string;
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  try {
    const docId = await IRService.createDocument({
      title, slug, category, entity, visibility
    });

    // Mock file upload processing
    await IRService.publishVersion(docId, {
      path: `/uploads/${filename}`,
      name: filename,
      size: Math.floor(Math.random() * 5000000), // Random size
      checksum: crypto.createHash('sha256').update(title).digest('hex') // Fake hash
    }, 'Initial upload via Admin');

    revalidatePath('/ir/reports-filings');
  } catch (err) {
    console.error(err);
  }
}
