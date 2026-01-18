'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function SystemPulse() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.z += 0.002;
      // Breathing scale effect
      const s = 1.2 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
      mesh.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1}
          roughness={0.1}
          chromaticAberration={0.5}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#3A5F7D"
        />
      </mesh>
      {/* Outer wireframe glow */}
      <mesh scale={1.1}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#3A5F7D" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}