import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ParticleBackground({ stage, ...props }) {
  const pointsRef = useRef();
  
  const count = 1800;

  // Let's customize initial structures and velocities based on stage:
  const initialData = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const life = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      life[i] = Math.random();
      if (stage === 'vini') {
        // THUNDER: Jagged branches / electric sparks radiating outward or clustered
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5;
        pos[i * 3] = radius * Math.cos(angle);
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8; // vertical axis
        pos[i * 3 + 2] = radius * Math.sin(angle);

        vel[i * 3] = (Math.random() - 0.5) * 0.15;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

        // Gold / Amber electric sparks
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.75 + Math.random() * 0.25;
        col[i * 3 + 2] = 0.15 + Math.random() * 0.15;
      } else if (stage === 'vidi') {
        // WATER: Ripple waves flat grid
        const angle = Math.random() * Math.PI * 2;
        const radius = 1 + Math.random() * 6;
        pos[i * 3] = radius * Math.cos(angle);
        pos[i * 3 + 1] = Math.sin(radius * 1.5) * 0.5;
        pos[i * 3 + 2] = radius * Math.sin(angle);

        vel[i * 3] = -Math.sin(angle) * 0.015; // circular orbit
        vel[i * 3 + 1] = 0.005 + Math.random() * 0.005; // slow float
        vel[i * 3 + 2] = Math.cos(angle) * 0.015;

        // Marine Deep blue / Seafoam Cyan colors
        col[i * 3] = 0.0;
        col[i * 3 + 1] = 0.35 + Math.random() * 0.45;
        col[i * 3 + 2] = 0.75 + Math.random() * 0.25;
      } else {
        // FIRE (vici): Rising embers
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 2.0; 
        pos[i * 3] = r * Math.cos(angle);
        pos[i * 3 + 1] = -4.0 + Math.random() * 8.0; 
        pos[i * 3 + 2] = r * Math.sin(angle);

        vel[i * 3] = (Math.random() - 0.5) * 0.02;
        vel[i * 3 + 1] = 0.03 + Math.random() * 0.05; // fast rise speed
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

        // Fiery red/orange/yellow
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.25 + Math.random() * 0.6;
        col[i * 3 + 2] = 0.0;
      }
    }
    return { pos, col, vel, life };
  }, [stage]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posArr = geom.attributes.position.array;
    const colArr = geom.attributes.color.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      if (stage === 'vini') {
        // THUNDER: High speed crackling jitter
        const jitter = 0.09;
        if (Math.random() > 0.98) {
          // Spark crackle jump
          posArr[i * 3] = initialData.pos[i * 3] + (Math.random() - 0.5) * 2.0;
          posArr[i * 3 + 1] = initialData.pos[i * 3 + 1] + (Math.random() - 0.5) * 2.0;
          posArr[i * 3 + 2] = initialData.pos[i * 3 + 2] + (Math.random() - 0.5) * 2.0;

          // Lightning flash to bright white
          colArr[i * 3] = 1.0;
          colArr[i * 3 + 1] = 1.0;
          colArr[i * 3 + 2] = 1.0;
        } else {
          posArr[i * 3] += (Math.random() - 0.5) * jitter;
          posArr[i * 3 + 1] += (Math.random() - 0.5) * jitter;
          posArr[i * 3 + 2] += (Math.random() - 0.5) * jitter;

          // Return to electric blue / cyan
          colArr[i * 3] += (initialData.col[i * 3] - colArr[i * 3]) * 0.12;
          colArr[i * 3 + 1] += (initialData.col[i * 3 + 1] - colArr[i * 3 + 1]) * 0.12;
          colArr[i * 3 + 2] += (initialData.col[i * 3 + 2] - colArr[i * 3 + 2]) * 0.12;
        }

        // Keep centered
        posArr[i * 3] += (initialData.pos[i * 3] - posArr[i * 3]) * 0.02;
        posArr[i * 3 + 1] += (initialData.pos[i * 3 + 1] - posArr[i * 3 + 1]) * 0.02;
        posArr[i * 3 + 2] += (initialData.pos[i * 3 + 2] - posArr[i * 3 + 2]) * 0.02;

      } else if (stage === 'vidi') {
        // WATER: Waves, fluid floatation and ripples
        const x = posArr[i * 3];
        const z = posArr[i * 3 + 2];
        const dist = Math.sqrt(x * x + z * z);

        // Sinusoidal wave motion
        posArr[i * 3 + 1] = Math.sin(dist * 1.3 - time * 2.2) * 0.5 + Math.cos(x * 0.6 + time) * 0.25;

        // Gentle float rotation
        posArr[i * 3] += initialData.vel[i * 3];
        posArr[i * 3 + 2] += initialData.vel[i * 3 + 2];

      } else {
        // FIRE: Rising embers drifting up
        posArr[i * 3 + 1] += initialData.vel[i * 3 + 1];
        posArr[i * 3] += initialData.vel[i * 3] + Math.sin(time * 1.5 + i) * 0.012;
        posArr[i * 3 + 2] += initialData.vel[i * 3 + 2] + Math.cos(time * 1.5 + i) * 0.012;

        const heightFactor = (posArr[i * 3 + 1] + 4) / 8.0; // 0 to 1

        // Color shifts from bright yellow to deep red as it rises
        colArr[i * 3] = 1.0;
        colArr[i * 3 + 1] = Math.max(0.0, 0.85 - heightFactor * 0.85);
        colArr[i * 3 + 2] = 0.0;

        // Reset if particles go too high
        if (posArr[i * 3 + 1] > 4.5) {
          posArr[i * 3 + 1] = -4.0;
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 1.5;
          posArr[i * 3] = r * Math.cos(angle);
          posArr[i * 3 + 2] = r * Math.sin(angle);
        }
      }
    }

    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;

    // Apply basic rotations to points container
    if (stage === 'vici') {
      pointsRef.current.rotation.y += 0.012;
    } else if (stage === 'vidi') {
      pointsRef.current.rotation.y += 0.003;
    } else {
      pointsRef.current.rotation.y += 0.025;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false} {...props}>
      <bufferGeometry key={stage}>
        <bufferAttribute
          attach="attributes-position"
          args={[initialData.pos, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[initialData.col, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={stage === 'vici' ? 0.08 : stage === 'vini' ? 0.065 : 0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={stage === 'vici' ? 0.75 : 0.6}
      />
    </points>
  );
}
