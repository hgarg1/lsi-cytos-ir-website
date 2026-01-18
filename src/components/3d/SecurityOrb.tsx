'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function SecurityOrb() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={mesh} visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#3A5F7D"
        attach="material"
        distort={0.4} // Amount of distortion
        speed={1.5} // Speed of animation
        roughness={0.2}
        metalness={0.9}
        wireframe={true} // High-tech look
      />
    </Sphere>
  );
}
