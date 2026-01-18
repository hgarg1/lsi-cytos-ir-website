'use client';

import { useState } from 'react';
import { toggleUserStatus } from './actions';

export default function UserTable({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);

  async function handleToggleStatus(userId: string, currentStatus: string) {
    await toggleUserStatus(userId, currentStatus);
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: currentStatus === 'active' ? 'suspended' : 'active' } : u
    ));
  }

  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-white/[0.02] text-gray-500 uppercase text-[10px] font-bold tracking-widest">
        <tr>
          <th className="px-6 py-4">User</th>
          <th className="px-6 py-4">Institution</th>
          <th className="px-6 py-4">Role</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-steel-blue/20 flex items-center justify-center text-[10px] font-bold text-steel-blue">
                  {user.name?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-gray-400">
              {user.institution_name || 'Individual'}
            </td>
            <td className="px-6 py-4">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${user.role === 'super_admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                <div className={`w-1 h-1 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-xs capitalize">{user.status}</span>
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <button 
                onClick={() => handleToggleStatus(user.id, user.status)}
                className={`text-[10px] font-bold uppercase px-3 py-1 rounded transition-colors ${user.status === 'active' ? 'text-red-400 hover:bg-red-400/10' : 'text-green-400 hover:bg-green-400/10'}`}
              >
                {user.status === 'active' ? 'SUSPEND' : 'ACTIVATE'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
