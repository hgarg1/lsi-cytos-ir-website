'use client';

import { Canvas } from '@react-three/fiber';
import { TetragrammatonScene } from '@/components/3d/Tetragrammaton';
import { Environment, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import Link from 'next/link';

export default function ArchieGargPage() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* 3D Void */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
           <color attach="background" args={['#000000']} />
           
           {/* Divine Lighting */}
           <ambientLight intensity={0.2} />
           <pointLight position={[10, 10, 10]} intensity={2} color="#ffaa00" />
           <pointLight position={[-10, -10, -10]} intensity={2} color="#0044ff" />
           <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />
           
           <TetragrammatonScene />
           
           <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
           <Sparkles count={500} scale={10} size={2} speed={0.2} opacity={0.5} color="#ffd700" />
           <Environment preset="city" />
           <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} />
        </Canvas>
      </div>

      {/* Subtle UI Overlay */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10">
         <h1 className="text-xs font-mono text-gold/50 tracking-[1em] uppercase opacity-50 text-yellow-500">
           TETRAGRAMMATON
         </h1>
         <p className="text-[10px] text-gray-600 mt-2 font-mono">
           PROJECT_ARCHIE_GARG // CLASSIFIED_EYES_ONLY
         </p>
      </div>

      {/* Hidden Escape Hatch */}
      <Link href="/ir" className="absolute top-8 left-8 text-white/10 hover:text-white/50 transition-colors z-20">
         &larr; EXIT_SIMULATION
      </Link>
    </div>
  );
}
