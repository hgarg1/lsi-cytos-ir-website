'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface AdminMobileNavProps {
  navItems: { label: string; href: string; icon: string }[];
  user?: any;
}

export default function AdminMobileNav({ navItems, user }: AdminMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-400 hover:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm lg:hidden"
              />
              
              {/* Drawer */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-72 bg-[#0F1216] z-[101] border-r border-white/10 flex flex-col p-6 lg:hidden shadow-2xl"
                style={{ backgroundColor: '#0F1216' }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-[10px]">LC</div>
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Governance</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-1 mb-8">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          isActive 
                            ? 'bg-white text-black font-bold' 
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        <svg className={`w-5 h-5 transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-4">
                   <Link 
                     href="/ir" 
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-3 px-4 py-3 rounded-xl bg-steel-blue/10 border border-steel-blue/20 text-steel-blue text-xs font-bold uppercase tracking-widest hover:bg-steel-blue/20 transition-all"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                     Return to IR Portal
                   </Link>

                   <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-steel-blue/20 flex items-center justify-center text-xs font-bold text-steel-blue">
                        {user?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{user?.name}</p>
                         <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">{user?.role?.replace('_', ' ')}</p>
                      </div>
                   </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
