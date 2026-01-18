'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { MolecularStructure } from '@/components/landing/Molecule';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-steel-blue selection:text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3A5F7D" />
          
          <MolecularStructure />
          
          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-8 px-4 pointer-events-auto">
          
          {/* Logo Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center"
          >
             <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <span className="text-black font-bold text-lg tracking-tighter">LC</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
               LSI <span className="text-gray-500 font-light">|</span> CytosAI
             </h1>
             <p className="text-gray-400 mt-4 text-sm md:text-base tracking-widest uppercase font-mono">
               Localized Structural Integrity &bull; Computational Biology
             </p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link 
              href="/ir" 
              className="group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm tracking-wide rounded hover:bg-white hover:text-black transition-all duration-300 w-48 text-center overflow-hidden"
            >
              <span className="relative z-10">INVESTOR PORTAL</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
            </Link>

            <Link 
              href="/ir/reports-filings" 
              className="text-gray-400 text-xs tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-1"
            >
              LATEST FILINGS
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Footer Meta */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
         <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.3 }}
           transition={{ delay: 2, duration: 2 }}
           className="text-[10px] text-white uppercase tracking-widest"
         >
           System Status: Operational &bull; Latency: 12ms &bull; Encryption: AES-256
         </motion.p>
      </div>
    </div>
  );
}