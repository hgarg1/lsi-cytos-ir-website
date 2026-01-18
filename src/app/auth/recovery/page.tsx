'use client';

import { Canvas } from '@react-three/fiber';
import { ReassemblyScene } from '@/components/3d/Reassembly';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecoveryPage() {
  return (
    <div className="h-screen w-full bg-graphite flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT: 3D Immersive Viewport */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-graphite border-r border-white/5 order-first">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 10, 5]} intensity={2} color="#3A5F7D" />
            <ReassemblyScene />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
           <h2 className="text-white text-3xl font-bold tracking-tighter">System Recovery</h2>
           <p className="text-steel-blue font-mono text-xs mt-1">INITIATING_RECONSTRUCTION...</p>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-graphite border-l border-white/5 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-8"
        >
          <div>
             <h1 className="text-3xl font-bold text-white tracking-tight">Identity Restoration</h1>
             <p className="text-gray-400 mt-2">
               Enter your verified email to initiate the secure credential reset protocol.
             </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verified Email</label>
              <input 
                type="email" 
                placeholder="name@lsi.org"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-steel-blue outline-none transition-colors"
              />
            </div>

            <button 
              type="button" 
              className="w-full bg-steel-blue text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Send Recovery Signal
            </button>
          </form>

          <div className="text-center pt-8">
            <Link href="/auth/signin" className="text-sm text-gray-500 hover:text-white transition-colors">Abort Procedure</Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
