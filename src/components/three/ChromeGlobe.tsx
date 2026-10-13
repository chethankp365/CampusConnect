'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);

  // Generate 15 college node positions around sphere
  const { nodePositions, arcCurves } = useMemo(() => {
    const coords: number[] = [];
    const count = 18;
    const r = 2.4;
    const pointsList: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      coords.push(x, y, z);
      pointsList.push(new THREE.Vector3(x, y, z));
    }

    return {
      nodePositions: new Float32Array(coords),
      arcCurves: pointsList,
    };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.15;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Inner Sphere with Chrome sheen */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.36, 32, 32]} />
        <meshStandardMaterial
          color="#07070D"
          metalness={0.9}
          roughness={0.15}
          emissive="#111827"
        />
      </mesh>

      {/* Wireframe Longitude & Latitude Lines */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.SphereGeometry(2.4, 24, 24)]} />
        <lineBasicMaterial color="#4FE3FF" opacity={0.25} transparent />
      </lineSegments>

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
          size={0.12}
          color="#FF4D1C"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

export default function ChromeGlobe() {
  return (
    <div className="w-full h-full min-h-[350px] sm:min-h-[450px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, -2, -2]} intensity={1.2} color="#4FE3FF" />
        <pointLight position={[4, -2, 2]} intensity={1.2} color="#FF4D1C" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
