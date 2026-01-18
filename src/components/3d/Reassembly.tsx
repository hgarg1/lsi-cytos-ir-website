'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Octahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GyroRing({ radius, speed, axis }: { radius: number, speed: number, axis: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += axis[0] * speed * 0.01;
      mesh.current.rotation.y += axis[1] * speed * 0.01;
      mesh.current.rotation.z += axis[2] * speed * 0.01;
    }
  });

  return (
    <Torus ref={mesh} args={[radius, 0.05, 16, 100]} rotation={[Math.random(), Math.random(), 0]}>
      <meshStandardMaterial 
        color="#5c4026" // Dark Bronze
        roughness={0.4} 
        metalness={0.9} 
        emissive="#9A6B3F"
        emissiveIntensity={0.2}
      />
    </Torus>
  );
}

export function ReassemblyScene() {
  const core = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (core.current) {
      // Pulse the core
      const t = state.clock.getElapsedTime();
      core.current.rotation.y = t * 0.5;
      core.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group scale={1.8}>
      {/* The Gyroscope Rings */}
      <GyroRing radius={2.0} speed={1.5} axis={[1, 0.5, 0]} />
      <GyroRing radius={1.7} speed={-2.0} axis={[0, 1, 0.5]} />
      <GyroRing radius={1.4} speed={2.5} axis={[0.5, 0, 1]} />

      {/* The unstable Core */}
      <Octahedron ref={core} args={[0.8, 0]}>
         <MeshDistortMaterial
           color="#9A6B3F" // Amber
           emissive="#ff8c00" // Bright Orange glow
           emissiveIntensity={1}
           wireframe={true}
           distort={0.4}
           speed={2}
           roughness={0}
           metalness={1}
         />
      </Octahedron>
    </group>
  );
}