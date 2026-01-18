'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Octahedron, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';

function SacredGeometry() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (outer.current && inner.current && ring1.current && ring2.current) {
      outer.current.rotation.x = Math.sin(t / 4);
      outer.current.rotation.y = Math.cos(t / 4);
      outer.current.rotation.z = Math.sin(t / 4);

      inner.current.rotation.y = t;
      inner.current.rotation.x = t * 0.5;

      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.y = t * 0.2;
      
      ring2.current.rotation.x = -t * 0.2;
      ring2.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Crystalline Shell */}
      <mesh ref={outer} scale={2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial 
          backside
          samples={16}
          thickness={2}
          roughness={0}
          chromaticAberration={1}
          anisotropy={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color="#a0c0ff"
          bg="#000000"
        />
      </mesh>

      {/* Inner Burning Core */}
      <mesh ref={inner} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ffaa00" 
          emissive="#ff5500"
          emissiveIntensity={4}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbital Rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
      
      <mesh ref={ring2} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function HebrewLetter({ char, position, rotation }: { char: string, position: [number, number, number], rotation: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position} rotation={rotation}>
                 {/* Fallback geometric representation if font fails: A glowing plane */}
                 <Text
                    fontSize={2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                 >
                    {char}
                    <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
                 </Text>
            </group>
        </Float>
    )
}

export function TetragrammatonScene() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <SacredGeometry />
      </Float>

      {/* YHWH */}
      <HebrewLetter char="י" position={[0, 4, 0]} rotation={[0, 0, 0]} />
      <HebrewLetter char="ה" position={[4, 0, 0]} rotation={[0, -Math.PI/2, 0]} />
      <HebrewLetter char="ו" position={[0, -4, 0]} rotation={[0, 0, Math.PI]} />
      <HebrewLetter char="ה" position={[-4, 0, 0]} rotation={[0, Math.PI/2, 0]} />
    </group>
  );
}