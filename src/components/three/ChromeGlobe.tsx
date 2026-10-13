'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate 28 college node coordinates around sphere
  const { nodePositions } = useMemo(() => {
    const coords: number[] = [];
    const count = 32;
    const r = 2.8;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      coords.push(x, y, z);
    }

    return {
      nodePositions: new Float32Array(coords),
    };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.18;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Inner Metallic Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.76, 40, 40]} />
        <meshStandardMaterial
          color="#0A0A12"
          metalness={0.95}
          roughness={0.12}
          emissive="#0D1322"
        />
      </mesh>

      {/* Outer Wireframe Longitude & Latitude Lines */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.SphereGeometry(2.82, 28, 28)]} />
        <lineBasicMaterial color="#4FE3FF" opacity={0.35} transparent />
      </lineSegments>

      {/* Orbiting Equatorial Glow Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[3.3, 3.45, 64]} />
        <meshBasicMaterial color="#5B5BFF" side={THREE.DoubleSide} opacity={0.4} transparent />
      </mesh>

      {/* Glowing College Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#FF4D1C"
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>
    </group>
  );
}

export default function ChromeGlobe() {
  return (
    <div className="w-full h-full min-h-[480px] lg:min-h-[580px] xl:min-h-[640px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 6, 6]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-5, -3, -3]} intensity={1.5} color="#4FE3FF" />
        <pointLight position={[5, -3, 3]} intensity={1.5} color="#FF4D1C" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
