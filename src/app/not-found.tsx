'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { random } from 'maath'; // Helper for random points

function FracturedHelix(props: any) {
  const ref = useRef<any>();
  // Generate points in a sphere/cloud
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3A5F7D"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-graphite flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <FracturedHelix />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent leading-none tracking-tighter select-none blur-[1px]">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-24">
            <h2 className="text-2xl font-bold text-white mb-2">Sequence Decoupled</h2>
            <p className="text-steel-blue mb-8 max-w-md font-mono text-xs">
              The requested molecular pathway [URL] could not be synthesized. It may have been deprecated or moved to cold storage.
            </p>
            <Link 
              href="/ir" 
              className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-graphite transition-all duration-300 backdrop-blur-sm text-sm font-medium"
            >
              Realig with Mainframe
            </Link>
        </div>
      </div>
    </div>
  );
}
