'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Glitch } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function DestabilizedCore() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 2; // Fast spin
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 32, 32]} scale={1.5}>
       <MeshDistortMaterial
         color="#000000"
         emissive="#ffffff"
         emissiveIntensity={0.5}
         wireframe
         distort={0.8} // Extreme distortion
         speed={5}
       />
    </Sphere>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas>
          <ambientLight intensity={0.5} />
          <DestabilizedCore />
          {/* Post-processing glitch effect simulation via fast movement/distortion */}
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-8">
        <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/50 text-red-500 font-mono text-xs mb-6 rounded">
          CRITICAL_SYSTEM_FAILURE
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Structural Integrity Compromised
        </h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed font-light">
          Automatic containment protocols have been initiated due to an unhandled exception in the neural core.
          <br/>
          <span className="font-mono text-xs text-gray-600 mt-2 block">Digest: {error.digest || 'UNKNOWN_VECTOR'}</span>
        </p>

        <div className="flex gap-4 justify-center">
            <button 
              onClick={() => reset()}
              className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
            >
              Attempt Core Restart
            </button>
            <button 
              onClick={() => window.location.href = '/ir'}
              className="px-6 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-colors"
            >
              Evacuate to Safety
            </button>
        </div>
      </div>
    </div>
  );
}
