'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Line } from '@react-three/drei';
import * as THREE from 'three';

export function NeuralNetworkScene() {
  const group = useRef<THREE.Group>(null);
  
  // Create random nodes
  const nodes = useMemo(() => {
    return new Array(15).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      speed: Math.random() * 0.2
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Instances range={15}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#2E6B4F" emissive="#2E6B4F" emissiveIntensity={2} />
        {nodes.map((node, i) => (
          <group key={i}>
            <Instance position={node.position} />
            {/* Connect every node to center */}
            <Line 
              points={[node.position, [0, 0, 0]]} 
              color="#2E6B4F" 
              transparent 
              opacity={0.3} 
              lineWidth={1} 
            />
          </group>
        ))}
      </Instances>
      
      {/* Central Hub */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#2E6B4F" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}
