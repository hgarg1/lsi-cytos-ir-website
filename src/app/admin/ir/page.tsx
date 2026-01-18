'use client';

import { seedIRData, createIRDocument } from './actions';
import { useActionState } from 'react';

export const dynamic = 'force-dynamic';

export default function IRAdminPage() {
  const [seedState, seedAction, isPending] = useActionState(seedIRData, null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">IR Content Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Initial Setup</h2>
          <p className="mb-4 text-sm text-gray-600">
            Populate the database with the initial LSI | CytosAI folder structure and placeholder documents.
          </p>
          <form action={seedAction}>
             <button 
               disabled={isPending}
               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
             >
               {isPending ? 'Seeding...' : 'Seed Database'}
             </button>
             {seedState?.success && <p className="text-green-600 mt-2">Database seeded successfully!</p>}
             {seedState?.error && <p className="text-red-600 mt-2">{seedState.error}</p>}
          </form>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
          <form action={createIRDocument} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input name="title" type="text" className="w-full border p-2 rounded" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="category" className="w-full border p-2 rounded">
                    <option>Financials</option>
                    <option>Governance</option>
                    <option>Risk</option>
                    <option>Letters</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Entity</label>
                  <select name="entity" className="w-full border p-2 rounded">
                    <option>LSI</option>
                    <option>CytosAI</option>
                    <option>Corporate</option>
                  </select>
               </div>
            </div>
            <div>
               <label className="block text-sm font-medium mb-1">Visibility</label>
               <select name="visibility" className="w-full border p-2 rounded">
                 <option value="public">Public</option>
                 <option value="private">Private (Investors Only)</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium mb-1">File (Mock)</label>
               <input type="text" name="filename" placeholder="e.g. Q4_Report.pdf" className="w-full border p-2 rounded" required />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
              Create & Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
