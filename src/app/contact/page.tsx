'use client';

import { Canvas } from '@react-three/fiber';
import { GlobalNetwork } from '@/components/3d/GlobalNetwork';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [intent, setIntent] = useState('general');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-steel-blue/30 overflow-hidden relative">
      
      {/* Background World */}
      <div className="absolute inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <GlobalNetwork />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
         </Canvas>
      </div>

      {/* Header Overlay */}
      <header className="absolute top-0 left-0 right-0 z-20 p-8 flex justify-between items-center pointer-events-none">
         <Link href="/ir" className="flex items-center gap-3 pointer-events-auto group">
            <div className="w-8 h-8 bg-white/10 backdrop-blur rounded flex items-center justify-center text-white font-bold text-xs border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">LC</div>
            <span className="font-bold tracking-tight text-sm uppercase">
               <span className="md:hidden">LSI | CytosAI</span>
               <span className="hidden md:inline">Living Systems Intelligence | CytosAI</span>
            </span>
         </Link>
         <Link href="/ir" className="pointer-events-auto text-[10px] font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
            Return to Investor Relations
         </Link>
      </header>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center p-8 lg:p-24 gap-16 pointer-events-none">
         
         {/* Left: The Hook */}
         <div className="lg:w-1/2 space-y-8 text-center lg:text-left pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
               <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">
                 Initiate<br/>Dialogue
               </h1>
               <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                 We prioritize high-bandwidth communication with our institutional partners. Direct routing to the Office of the Corporate Secretary.
               </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col gap-4"
            >
               <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors cursor-default max-w-sm">
                  <div className="relative">
                     <div className="w-12 h-12 rounded-full bg-steel-blue/20 flex items-center justify-center border border-steel-blue/30">
                        <svg className="w-6 h-6 text-steel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                     </div>
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  </div>
                  <div>
                     <p className="font-bold text-sm text-white">Regional Operations</p>
                     <p className="text-xs text-steel-blue font-mono">NODE: EU_NORTH_1</p>
                     <p className="text-[10px] text-gray-500 mt-1">Status: Systems Nominal</p>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Right: The Interface */}
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="lg:w-1/2 w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl pointer-events-auto"
         >
            <form className="space-y-6">
               <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Intent</p>
                  <div className="grid grid-cols-2 gap-3">
                     {['Partnership', 'Due Diligence', '1:1 Meeting', 'Press Inquiry'].map((item) => (
                       <button 
                         type="button"
                         key={item}
                         onClick={() => setIntent(item)}
                         className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                           intent === item 
                             ? 'bg-white text-black border-white' 
                             : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                         }`}
                       >
                         {item}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Institutional Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-steel-blue transition-all" placeholder="name@fund.com" />
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message Payload</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-steel-blue transition-all" placeholder="Enter secure transmission..." />
               </div>

               <button className="w-full bg-steel-blue text-white font-bold py-4 rounded-xl hover:bg-steel-blue-hover transition-colors shadow-lg shadow-steel-blue/20 flex items-center justify-center gap-2 group">
                  <span>Transmit Securely</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
               
               <p className="text-center text-[9px] text-gray-600 font-mono">
                 ENCRYPTION: AES-256-GCM // ROUTING: PRIORITY_High
               </p>
            </form>
         </motion.div>

      </div>
    </div>
  );
}
