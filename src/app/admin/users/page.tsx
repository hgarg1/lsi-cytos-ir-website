import { getUsers } from './actions';
import UserTable from './UserTable';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">User Directory</h1>
          <p className="text-gray-500 mt-2 font-mono text-xs">MANAGE_INSTITUTIONAL_IDENTITIES</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-platinum transition-colors">INVITE_USER</button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
         <UserTable initialUsers={JSON.parse(JSON.stringify(users))} />
      </div>
    </div>
  );
}
