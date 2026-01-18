'use client';

import { getCsrfToken } from 'next-auth/react';
import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SecurityOrb } from '@/components/3d/SecurityOrb';
import { Environment, OrbitControls, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  useEffect(() => {
    async function loadCsrf() {
      const token = await getCsrfToken();
      setCsrfToken(token || '');
    }
    loadCsrf();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    // Let the browser take over for the POST request
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm space-y-8"
    >
      <div>
         <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center mb-6">
            <span className="font-bold text-graphite text-lg tracking-tighter">LC</span>
         </div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Institutional Login</h1>
         <p className="text-gray-400 mt-2">
           Enter your corporate credentials to access the Living Systems Intelligence data room.
         </p>
      </div>

      {/* NATIVE FORM POST: This bypasses 'Failed to fetch' issues */}
      <form 
        method="POST" 
        action="/api/auth/callback/credentials" 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value="/ir" />
        <input type="hidden" name="redirect" value="true" />
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work Email</label>
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@lsi.org"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
            required
          />
        </div>

        {urlError && (
          <div className="p-4 bg-red-900/20 border-l-2 border-red-500 text-red-200 text-sm">
            Access Denied. Domain not authorized or identity mismatch.
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-graphite font-bold py-4 rounded-lg hover:bg-platinum transition-colors flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <span className="animate-pulse">Initializing Handshake...</span>
          ) : (
            <>
              <span>Authenticate via SSO</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </form>

      <div className="flex justify-between text-xs text-gray-500 pt-8 border-t border-white/5">
        <Link href="/auth/request-access" className="hover:text-white transition-colors">Request Access</Link>
        <Link href="/auth/recovery" className="hover:text-white transition-colors">System Recovery</Link>
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <div className="h-screen w-full bg-graphite flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT: 3D Immersive Viewport */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-graphite border-r border-white/5 order-first">
        <div className="absolute inset-0 z-0 touch-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#3A5F7D" />
            <SecurityOrb />
            <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#3A5F7D" />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Overlay Text on 3D side */}
        <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
           <h2 className="text-white text-3xl font-bold tracking-tighter">Sentinel Core</h2>
           <p className="text-steel-blue font-mono text-xs mt-1">v4.0.1 // IDENTITY_VERIFICATION</p>
        </div>
      </div>

      {/* RIGHT: Login Interface */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-graphite border-l border-white/5 relative z-10">
        <Link 
          href="/ir" 
          className="absolute top-8 right-8 text-[10px] font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2 group"
        >
          Return to Portal
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
        <Suspense fallback={<div className="text-white font-mono text-xs">LOADING_INTERFACE...</div>}>
          <SignInForm />
        </Suspense>
      </div>

    </div>
  );
}
