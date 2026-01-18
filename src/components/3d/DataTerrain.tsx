'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export function DataTerrain() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
        // Subtle wave animation
        const time = state.clock.getElapsedTime();
        mesh.current.position.y = Math.sin(time * 0.2) * 0.2;
    }
  });

  return (
    <Plane ref={mesh} args={[20, 20, 32, 32]} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <meshStandardMaterial 
        color="#0F1216" 
        wireframe 
        emissive="#3A5F7D"
        emissiveIntensity={0.2}
      />
    </Plane>
  );
}
