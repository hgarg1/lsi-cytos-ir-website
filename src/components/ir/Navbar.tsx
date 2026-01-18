'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import UserAvatarTrigger from '@/components/ir/UserAvatarTrigger';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  liveUser: any;
  isAdmin: boolean;
}

export default function IRNavbar({ liveUser, isAdmin }: NavbarProps) {
  const containerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-platinum shadow-sm"
    >
      <div className="ir-container h-16 flex justify-between items-center">
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 bg-graphite rounded-sm flex items-center justify-center text-white font-bold text-xs tracking-tighter group-hover:scale-105 transition-transform">LC</div>
             <div className="font-semibold text-lg tracking-tight text-graphite">Living Systems Intelligence | CytosAI</div>
          </Link>
          <div className="h-4 w-px bg-platinum mx-2 hidden md:block"></div>
          <div className="text-sm font-medium text-text-meta hidden md:block">Investor Relations</div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs font-mono text-evergreen font-medium">LCYT ▲ 142.85</span>
              <span className="text-[10px] text-text-meta">NYSE &bull; Delayed 15m</span>
           </div>

           {liveUser ? (
             <div className="flex items-center gap-3">
               {isAdmin && (
                 <Link 
                   href="/admin/ir" 
                   className="text-xs font-bold text-steel-blue uppercase tracking-widest hover:text-graphite transition-colors border border-steel-blue/20 px-3 py-1.5 rounded"
                 >
                   Management
                 </Link>
               )}
               <div className="flex items-center gap-2 pl-4 border-l border-platinum">
                  <UserAvatarTrigger session={{ user: liveUser }} />
                  <button 
                    onClick={() => signOut()}
                    className="text-xs font-medium text-text-meta hover:text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
               </div>
             </div>
           ) : (
             <Link href="/auth/signin" className="text-sm font-medium text-text-body hover:text-steel-blue transition-colors px-3 py-1.5 rounded-md hover:bg-off-white border border-transparent hover:border-platinum">
               Log In
             </Link>
           )}
        </motion.div>
      </div>
    </motion.header>
  );
}
