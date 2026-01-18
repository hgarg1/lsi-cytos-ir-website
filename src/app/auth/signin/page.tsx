'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SecurityOrb } from '@/components/3d/SecurityOrb';
import { Environment, OrbitControls, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      redirect: false,
      callbackUrl: '/ir',
    });

    if (res?.error) {
      setError('Access Denied. Domain not authorized for SSO.');
      setLoading(false);
    } else {
      // Manual redirect on success
      window.location.href = '/ir';
    }
  };

  return (
    <div className="h-screen w-full bg-graphite flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT: 3D Immersive Viewport */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-graphite border-r border-white/5 order-first">
        <div className="absolute inset-0 z-0">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@lsi.org"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border-l-2 border-red-500 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-graphite font-bold py-4 rounded-lg hover:bg-platinum transition-colors flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="animate-pulse">Verifying Identity...</span>
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
      </div>

    </div>
  );
}