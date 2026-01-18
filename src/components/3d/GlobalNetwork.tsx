'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

function Marker({ position, label, globeRef }: { position: [number, number, number], label: string, globeRef: React.RefObject<THREE.Mesh | null> }) {
  // Normalize position to sit exactly on the surface of radius 4.5
  const vec = new THREE.Vector3(...position).normalize().multiplyScalar(4.51);
  
  return (
    <group position={vec}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh scale={2.5}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#3A5F7D" transparent opacity={0.3} />
      </mesh>
      <Html 
        distanceFactor={12} 
        occlude={[globeRef as any]} // Specific occlusion against the globe
        position={[0, 0.2, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div className="bg-graphite/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white whitespace-nowrap shadow-xl flex items-center gap-2 select-none">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          {label}
        </div>
      </Html>
    </group>
  );
}

export function GlobalNetwork() {
  const group = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const globeRef = useRef<THREE.Mesh>(null);

  // Load Earth Textures from Three.js examples (stable source)
  const [colorMap, normalMap, specMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
  ]);

  // Helper to convert Lat/Long to 3D Position on Sphere
  const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z] as [number, number, number];
  };

  const GLOBE_RADIUS = 4.5;

  // Real-world coordinates
  const locations = [
    { pos: latLongToVector3(40.7128, -74.0060, GLOBE_RADIUS), label: 'HQ: New York' },
    { pos: latLongToVector3(38.9897, -76.9378, GLOBE_RADIUS), label: 'Intel: College Park, MD' },
    { pos: latLongToVector3(51.5074, -0.1278, GLOBE_RADIUS), label: 'R&D: London' },
    { pos: latLongToVector3(47.3769, 8.5417, GLOBE_RADIUS), label: 'Ops: Zurich' },
    { pos: latLongToVector3(37.7749, -122.4194, GLOBE_RADIUS), label: 'Labs: San Francisco' },
    { pos: latLongToVector3(35.6762, 139.6503, GLOBE_RADIUS), label: 'Data: Tokyo' },
    { pos: latLongToVector3(1.3521, 103.8198, GLOBE_RADIUS), label: 'AI: Singapore' },
  ];

  return (
    <group>
        <group ref={group}>
            {/* The Realistic Earth */}
            <Sphere ref={globeRef} args={[GLOBE_RADIUS, 64, 64]}>
                <meshStandardMaterial 
                    map={colorMap}
                    normalMap={normalMap}
                    roughnessMap={specMap}
                    metalness={0.1}
                    roughness={0.8}
                />
            </Sphere>
            
            {/* Cloud Layer (Synthetic glow) */}
            <Sphere args={[GLOBE_RADIUS + 0.02, 64, 64]}>
                <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.05} 
                    wireframe
                />
            </Sphere>

            {locations.map((loc, i) => (
                <Marker key={i} position={loc.pos} label={loc.label} globeRef={globeRef} />
            ))}
        </group>
        
        {/* Atmosphere Glow */}
        <mesh scale={1.15}>
            <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
            <meshBasicMaterial color="#3A5F7D" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
    </group>
  );
}
