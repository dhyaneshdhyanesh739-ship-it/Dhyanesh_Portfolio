import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// -----------------------------------------------------------------------------
// GLSL SHADERS FOR VOLUMETRIC NEBULA & LIVING GALAXY
// -----------------------------------------------------------------------------

const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIsDark;

  varying vec2 vUv;

  // 2D Simplex Noise Helper Functions
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion for multi-octave cloud textures
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(st * frequency);
      frequency *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Aspect ratio corrected coordinates
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    
    // Parallax mouse displacement
    st += uMouse * 0.08;

    // Scale space for cosmic landscape
    st *= 1.35;

    // Non-repeating evolving time vectors
    float t1 = uTime * 0.045;
    float t2 = uTime * 0.032;
    float t3 = uTime * 0.018;

    // Domain Warping Layer 1: Smoke & Gas flow
    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(0.0, 0.0) + vec2(t1, t2));
    q.y = fbm(st + vec2(5.2, 1.3) + vec2(-t2, t1));

    // Domain Warping Layer 2: Moving Nebula filaments
    vec2 r = vec2(0.0);
    r.x = fbm(st + 3.8 * q + vec2(1.7, 9.2) + vec2(t2 * 1.4, t3));
    r.y = fbm(st + 3.8 * q + vec2(8.3, 2.8) + vec2(-t3, t1 * 1.2));

    // Final FBM composite
    float f = fbm(st + 4.2 * r + vec2(t1 * 0.8, -t2 * 0.9));
    f = clamp(f, -1.0, 1.0);

    // Dynamic Plasma Wave calculation
    float wave = sin(st.x * 3.5 + st.y * 2.5 + uTime * 0.3 + f * 4.0) * 0.5 + 0.5;

    // Aurora Light Bands
    float auroraPattern = sin(st.x * 2.2 + uTime * 0.2 + fbm(st * 1.8 + t1) * 3.0) * 0.5 + 0.5;
    float auroraMask = smoothstep(-0.8, 0.9, st.y + fbm(st * 2.5) * 0.4);
    float aurora = auroraPattern * auroraMask * 0.85;

    // Internal Lightning Flashes inside the clouds
    float lightningNoise = fbm(st * 6.0 + vec2(uTime * 1.8, -uTime * 1.4));
    float pulse1 = sin(uTime * 3.7);
    float pulse2 = cos(uTime * 5.3);
    float pulse3 = sin(uTime * 8.9);
    float flashThreshold = pow(clamp(pulse1 * pulse2 * pulse3, 0.0, 1.0), 9.0);
    float lightning = pow(clamp(lightningNoise, 0.0, 1.0), 3.5) * flashThreshold * 4.5;

    // COLOR PALETTES (Blue, Purple, Green, Cyan Energy Flow)
    // Dark Mode Colors: Deep Cosmic Void with Glowing Plasma
    vec3 darkVoid      = vec3(0.012, 0.015, 0.045); // Deep Indigo Black
    vec3 darkRoyalBlue = vec3(0.04, 0.12, 0.38);   // Royal Blue
    vec3 darkCyan      = vec3(0.02, 0.55, 0.72);   // Electric Cyan
    vec3 darkPurple    = vec3(0.48, 0.18, 0.85);   // Vibrant Violet
    vec3 darkEmerald   = vec3(0.06, 0.68, 0.45);   // Aurora Emerald
    vec3 darkMagenta   = vec3(0.85, 0.22, 0.65);   // Glowing Magenta
    vec3 darkLightning = vec3(0.70, 0.95, 1.00);   // Electric White-Cyan

    // Light Mode Colors: Crisp Atmospheric Pearlescent Sky with High Contrast Waves
    vec3 lightSky      = vec3(0.96, 0.97, 0.99);   // Pure Pearlescent White
    vec3 lightCyan     = vec3(0.82, 0.93, 0.99);   // Light Sky Blue
    vec3 lightBlueWave = vec3(0.35, 0.62, 0.96);   // Sapphire Accent
    vec3 lightPurple   = vec3(0.68, 0.45, 0.95);   // Vibrant Lavender-Violet
    vec3 lightMint     = vec3(0.32, 0.85, 0.68);   // Mint Emerald
    vec3 lightRose     = vec3(0.95, 0.48, 0.72);   // Rose Quartz Accent
    vec3 lightLightning= vec3(0.20, 0.50, 0.95);   // High Contrast Electric Flash

    // Mix color layers for Dark Mode
    vec3 darkCol = mix(darkVoid, darkRoyalBlue, clamp(f * 1.4 + 0.3, 0.0, 1.0));
    darkCol = mix(darkCol, darkPurple, clamp(length(q) * 0.9, 0.0, 1.0));
    darkCol = mix(darkCol, darkCyan, clamp(length(r.x) * 0.85, 0.0, 1.0));
    darkCol += darkEmerald * aurora * 0.9;
    darkCol += darkMagenta * wave * 0.35;
    darkCol += darkLightning * lightning;

    // Mix color layers for Light Mode
    vec3 lightCol = mix(lightSky, lightCyan, clamp(f * 0.8 + 0.2, 0.0, 1.0));
    lightCol = mix(lightCol, lightPurple, clamp(length(q) * 0.45, 0.0, 1.0));
    lightCol = mix(lightCol, lightBlueWave, clamp(length(r.x) * 0.40, 0.0, 1.0));
    lightCol = mix(lightCol, lightMint, aurora * 0.45);
    lightCol = mix(lightCol, lightRose, wave * 0.25);
    lightCol -= lightLightning * (lightning * 0.35); // Contrast shift on flash

    // Smooth theme interpolation
    vec3 finalColor = mix(lightCol, darkCol, uIsDark);

    // Subtle radial vignetting to enhance depth
    float distFromCenter = length(vUv - vec2(0.5));
    float vignette = 1.0 - smoothstep(0.4, 0.95, distFromCenter);
    float vignetteFactor = mix(0.92 + 0.08 * vignette, 0.75 + 0.25 * vignette, uIsDark);
    finalColor *= vignetteFactor;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// -----------------------------------------------------------------------------
// GLSL SHADERS FOR FLOATING COSMIC STARS & PARTICLES
// -----------------------------------------------------------------------------

const starVertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uIsDark;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    
    // Organic floating movement
    vec3 pos = position;
    pos.x += sin(uTime * 0.2 + aPhase) * 0.35;
    pos.y += cos(uTime * 0.25 + aPhase * 1.5) * 0.35;
    pos.z += sin(uTime * 0.15 + aPhase * 2.0) * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Dynamic twinkling
    float twinkle = 0.5 + 0.5 * sin(uTime * 2.5 + aPhase * 6.28);
    
    // Size attenuation based on depth
    gl_PointSize = aScale * (260.0 / -mvPosition.z) * (0.8 + 0.4 * twinkle);

    // Opacity modulation between themes
    vAlpha = mix(0.45 + 0.55 * twinkle, 0.65 + 0.35 * twinkle, uIsDark);
  }
`;

const starFragmentShader = /* glsl */ `
  uniform float uIsDark;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft anti-aliased circular particle point
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Smooth soft radial bloom halo
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    float core = smoothstep(0.2, 0.0, dist);

    // Adapt particle brightness for light/dark mode
    vec3 col = vColor;
    if (uIsDark < 0.5) {
      // In light mode, enhance particle color intensity for crisp visibility over white glass panels
      col = mix(col * 0.7, vec3(0.1, 0.2, 0.4), 0.25);
    }

    gl_FragColor = vec4(col + vec3(core * 0.4), alpha);
  }
`;

// -----------------------------------------------------------------------------
// R3F NEBULA PLANE COMPONENT
// -----------------------------------------------------------------------------

function NebulaPlane({ isDark }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const targetIsDark = useRef(isDark ? 1.0 : 0.0);

  useEffect(() => {
    targetIsDark.current = isDark ? 1.0 : 0.0;
  }, [isDark]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      if (materialRef.current) {
        // Smooth lerp mouse coordinates
        materialRef.current.uniforms.uMouse.value.x += (x - materialRef.current.uniforms.uMouse.value.x) * 0.05;
        materialRef.current.uniforms.uMouse.value.y += (y - materialRef.current.uniforms.uMouse.value.y) * 0.05;
      }
    };

    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth transition for light/dark theme toggle
      const currentIsDark = materialRef.current.uniforms.uIsDark.value;
      const target = targetIsDark.current;
      materialRef.current.uniforms.uIsDark.value += (target - currentIsDark) * delta * 2.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// -----------------------------------------------------------------------------
// R3F STARFIELD & PARTICLES COMPONENT
// -----------------------------------------------------------------------------

function StarField({ isDark }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const count = 5500;

  const { positions, scales, phases, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const pha = new Float32Array(count);
    const col = new Float32Array(count * 3);

    // Color swatches for stars: Cyan, Electric Purple, Aurora Green, Soft Blue, White
    const palette = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#c084fc'), // Purple
      new THREE.Color('#34d399'), // Mint Green
      new THREE.Color('#818cf8'), // Soft Indigo
      new THREE.Color('#f472b6'), // Coral Pink
      new THREE.Color('#ffffff'), // Pure White
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;

      sca[i] = Math.random() * 0.18 + 0.05;
      pha[i] = Math.random() * Math.PI * 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, scales: sca, phases: pha, colors: col };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      const target = isDark ? 1.0 : 0.0;
      materialRef.current.uniforms.uIsDark.value += (target - materialRef.current.uniforms.uIsDark.value) * delta * 2.5;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// -----------------------------------------------------------------------------
// MAIN GALAXY BACKGROUND EXPORT
// -----------------------------------------------------------------------------

export default function GalaxyBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <NebulaPlane isDark={isDark} />
        <StarField isDark={isDark} />
      </Canvas>
    </div>
  );
}
