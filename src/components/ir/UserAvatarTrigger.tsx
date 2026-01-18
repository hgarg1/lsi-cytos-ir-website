'use client';

import { useState } from 'react';
import ProfileModal from './ProfileModal';
import { AnimatePresence } from 'framer-motion';

export default function UserAvatarTrigger({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  if (!user) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-platinum overflow-hidden border border-platinum-dark group-hover:border-steel-blue transition-all flex items-center justify-center shadow-sm">
          {user.image ? (
            <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] font-bold text-graphite">
              {user.name?.substring(0, 2).toUpperCase() || '??'}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && <ProfileModal user={user} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
