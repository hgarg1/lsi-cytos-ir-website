'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Atom({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function Connection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const distance = startVec.distanceTo(endVec);
  const position = startVec.clone().add(endVec).multiplyScalar(0.5);
  const direction = endVec.clone().sub(startVec).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.05, 0.05, distance, 8]} />
      <meshStandardMaterial color="#4A5568" transparent opacity={0.3} />
    </mesh>
  );
}

export function MolecularStructure() {
  const group = useRef<THREE.Group>(null);
  
  // Generate random "molecule" structure
  const { atoms, connections } = useMemo(() => {
    const atomsArr: { pos: [number, number, number], color: string, scale: number }[] = [];
    const connectionsArr: { start: [number, number, number], end: [number, number, number] }[] = [];
    
    // Core
    atomsArr.push({ pos: [0, 0, 0], color: "#3A5F7D", scale: 0.8 });

    // Surrounding nodes
    const colors = ["#E6E8EB", "#2E6B4F", "#3A5F7D"];
    for (let i = 0; i < 15; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2 + Math.random() * 2;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      atomsArr.push({ 
        pos: [x, y, z], 
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.15 + Math.random() * 0.2 
      });

      // Connect to center or random previous atom
      const target = i > 5 ? atomsArr[Math.floor(Math.random() * i)].pos : [0,0,0] as [number, number, number];
      connectionsArr.push({ start: [x,y,z], end: target });
    }
    return { atoms: atomsArr, connections: connectionsArr };
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {connections.map((c, i) => (
          <Connection key={`con-${i}`} start={c.start} end={c.end} />
        ))}
        {atoms.map((a, i) => (
          <Atom key={`atom-${i}`} position={a.pos} color={a.color} scale={a.scale} />
        ))}
      </Float>
    </group>
  );
}
