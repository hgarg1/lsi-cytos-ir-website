'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Overview', href: '/ir', icon: 'dashboard' },
  { label: 'Business Overview', href: '/ir/business-overview', icon: 'business' },
  { label: 'Structure & Entities', href: '/ir/structure-entities', icon: 'structure' },
  { label: 'Financial Information', href: '/ir/financial-information', restricted: true, icon: 'lock' },
  { label: 'Reports & Filings', href: '/ir/reports-filings', icon: 'folder' },
  { label: 'Governance', href: '/ir/governance', icon: 'gavel' },
  { label: 'Leadership', href: '/ir/leadership', icon: 'group' },
  { label: 'Risk Factors', href: '/ir/risk-factors', restricted: true, icon: 'shield' },
  { label: 'Ethics & Responsibility', href: '/ir/ethics-safety-responsibility', icon: 'leaf' },
  { label: 'Investor Communications', href: '/ir/investor-communications', icon: 'chat' },
  { label: 'Legal Disclaimers', href: '/ir/legal-disclaimers', icon: 'info' },
];

export default function IRSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const isLoggedIn = !!session?.user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <motion.nav 
      className="flex flex-row lg:flex-col lg:sticky lg:top-24 pr-0 lg:pr-8 pb-4 lg:pb-12 w-full overflow-x-auto lg:overflow-visible no-scrollbar"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="hidden lg:block mb-6 px-3">
        <h2 className="text-xs font-bold tracking-widest text-text-meta uppercase opacity-70">Navigation</h2>
      </motion.div>
      
      <ul className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 min-w-max lg:min-w-0">
        {navItems.map((item) => {
          const isActive = item.href === '/ir' 
            ? pathname === '/ir' 
            : pathname.startsWith(item.href);

          return (
            <motion.li key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'bg-white text-graphite font-medium shadow-sm border border-platinum' 
                    : 'text-text-meta hover:text-graphite hover:bg-white/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${isActive ? 'bg-steel-blue' : 'bg-transparent group-hover:bg-platinum-dark'}`} />
                  <span>{item.label}</span>
                </div>
                {item.restricted && !isLoggedIn && (
                  <svg className="w-3 h-3 text-text-disabled ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                )}
              </Link>
            </motion.li>
          );
        })}
      </ul>
      
      <motion.div variants={itemVariants} className="hidden lg:block mt-8 pt-6 border-t border-platinum px-3">
        <div className="bg-graphite text-platinum p-4 rounded-lg shadow-lg">
          <p className="text-xs font-medium text-white/80 mb-1">IR Contact</p>
          <a href="mailto:ir@lsi-cytos.bio" className="text-sm font-bold text-white hover:underline block mb-2">ir@lsi-cytos.bio</a>
          <p className="text-[10px] text-white/50 leading-tight">
            For institutional inquiries only. Media inquiries should be directed to the Press Office.
          </p>
        </div>
      </motion.div>
    </motion.nav>
  );
}
