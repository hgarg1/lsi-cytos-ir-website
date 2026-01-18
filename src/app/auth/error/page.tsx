'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import { useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';

function RejectingShield() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      // Violent, jagged rotation
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 64, 64]} scale={2.2}>
      <MeshDistortMaterial
        color="#7f1d1d" // Dark Red/Amber
        emissive="#450a0a"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={1}
        distort={0.6} // High distortion for "rejection"
        speed={3} // Fast pulsing
        wireframe={true}
      />
    </Sphere>
  );
}

function ScanningRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z -= 0.01;
    }
  });

  return (
    <group ref={group} rotation={[Math.PI / 2, 0, 0]}>
       {[2.5, 3.0, 3.5].map((radius, i) => (
         <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[radius, 0.02, 16, 100]} />
           <meshBasicMaterial color="#ef4444" transparent opacity={0.3 - (i * 0.1)} />
         </mesh>
       ))}
    </group>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="h-screen w-full bg-graphite flex flex-col items-center justify-center relative overflow-hidden text-white font-sans selection:bg-red-900">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
           <ambientLight intensity={0.2} />
           <pointLight position={[10, 10, 10]} intensity={2} color="#ef4444" />
           <pointLight position={[-10, -10, -10]} intensity={2} color="#3A5F7D" />
           <RejectingShield />
           <ScanningRings />
           <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Canvas>
      </div>

      {/* Glass Overlay */}
      <div className="relative z-10 max-w-lg w-full p-8 bg-black/60 backdrop-blur-lg border border-red-900/50 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center">
         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/50 mb-6 animate-pulse">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
         </div>
         
         <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Identity Verification Failed</h1>
         <div className="h-px w-24 bg-red-900/50 mx-auto my-4"></div>
         <p className="text-gray-400 mb-8 text-sm leading-relaxed">
           The Sentinel Identity Provider could not validate your biometric signature against the authorized domain registry. Access to this facility is strictly prohibited.
         </p>
         
         <div className="flex flex-col gap-3">
           <Link 
             href="/auth/signin" 
             className="w-full bg-white text-graphite font-bold py-3 rounded hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
           >
             Re-Initialize Handshake
           </Link>
           <Link href="/ir" className="text-xs text-red-400 hover:text-red-300 tracking-widest uppercase mt-4">
             Return to Public Sector
           </Link>
         </div>
      </div>
      
      {/* Footer Tech Code */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-red-900/60">
        ERR_AUTH_PROTOCOL_MISMATCH :: 0x84F2
      </div>
    </div>
  );
}