'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

export function DualCoreScene() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={group} rotation={[0.5, 0, 0]}>
      {/* LSI Core (Physical) */}
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#3A5F7D" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Cytos Core (Digital) */}
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#2E6B4F" wireframe />
      </mesh>

      {/* Connection Lines (Orbit) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ccc" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
