'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function EntityNode({ position, label, color, scale = 1 }: { position: [number, number, number], label: string, color: string, scale?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
        mesh.current.rotation.y += 0.01;
        mesh.current.rotation.z += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[scale, 1]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <Html distanceFactor={15}>
        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded border border-gray-200 text-xs font-bold text-gray-800 whitespace-nowrap shadow-sm">
          {label}
        </div>
      </Html>
    </group>
  );
}

export function StructureGraph() {
  return (
    <group>
      {/* Holding Co */}
      <EntityNode position={[0, 2, 0]} label="LSI | CytosAI Inc. (DE)" color="#0F1216" scale={1.2} />
      
      {/* Connections */}
      <line>
        <bufferGeometry attach="geometry" attributes-position={new THREE.BufferAttribute(new Float32Array([0, 2, 0, -2, -1, 0]), 3)} />
        <lineBasicMaterial attach="material" color="#ccc" transparent opacity={0.5} />
      </line>
      <line>
        <bufferGeometry attach="geometry" attributes-position={new THREE.BufferAttribute(new Float32Array([0, 2, 0, 2, -1, 0]), 3)} />
        <lineBasicMaterial attach="material" color="#ccc" transparent opacity={0.5} />
      </line>

      {/* Subsidiaries */}
      <EntityNode position={[-2, -1, 0]} label="LSI Therapeutics LLC (USA)" color="#3A5F7D" scale={0.8} />
      <EntityNode position={[2, -1, 0]} label="CytosAI Labs Ltd. (Ireland)" color="#2E6B4F" scale={0.8} />
    </group>
  );
}
