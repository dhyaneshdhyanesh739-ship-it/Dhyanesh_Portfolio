import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicGlobe3D() {
  const globeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particlesRef = useRef();

  // Load the generated golden throne texture
  const throneTexture = useTexture('/holographic_throne.png');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating animation for throne
    if (globeRef.current) {
      globeRef.current.position.y = Math.sin(t * 1.5) * 0.08 + 0.1;
    }

    // Rotate orbital rings in opposite directions
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = -t * 0.4;
      ring1Ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3;
      ring2Ref.current.rotation.z = Math.cos(t * 0.1) * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.5;
      ring3Ref.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }

    // Rotate background particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  // Generate random points floating as orbital nodes
  const particlePositions = React.useMemo(() => {
    const count = 120;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <group position={[0, -0.2, 0]}>
      {/* Base Projector Platform (Cybernetic Ring) */}
      <mesh position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.1, 32]} />
        <meshBasicMaterial color="#d97706" side={THREE.DoubleSide} transparent opacity={0.6} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
        <meshBasicMaterial color="#78350f" wireframe depthWrite={false} />
      </mesh>

      {/* Upward Volumetric Scanner Light Cone */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.8, 0.2, 1.4, 32, 1, true]} />
        <meshBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={0.06} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Holographic Golden Throne */}
      <Billboard
        ref={globeRef}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, 0.1, 0]}
      >
        <mesh>
          <planeGeometry args={[1.7, 1.7]} />
          <meshBasicMaterial
            map={throneTexture}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      </Billboard>
      
      {/* Glow Inner Core Sphere for warmth */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>

      {/* Orbital Ring 1 (Flat ring) */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <ringGeometry args={[1.3, 1.33, 64]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
        {/* Ring Node */}
        <mesh position={[1.31, 0, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* Orbital Ring 2 (Vertical-ish ring) */}
      <group ref={ring2Ref} rotation={[Math.PI / 2.2, -Math.PI / 6, 0]}>
        <mesh>
          <ringGeometry args={[1.45, 1.48, 64]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 1.46, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* Orbital Ring 3 (Horizontal-ish ring) */}
      <group ref={ring3Ref} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <mesh>
          <ringGeometry args={[1.6, 1.62, 64]} />
          <meshBasicMaterial color="#ec4899" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0, 1.61]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      </group>

      {/* Drifting satellite particles in orbits */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#fbbf24"
          transparent
          opacity={0.65}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
