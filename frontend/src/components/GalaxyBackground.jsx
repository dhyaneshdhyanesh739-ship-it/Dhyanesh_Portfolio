import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Custom GLSL Shaders for the Living Galaxy
const GALAXY_SHADERS = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uTheme; // 0.0 = Light Mode, 1.0 = Dark Mode
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Fast, textureless 3D Simplex Noise by McEwan / Ashima Arts
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      // Permutations
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      // Gradients
      float n_ = 1.0/7.0; // N=7
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z); // mod(p, N*N)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_); // mod(j, N)

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Fractional Brownian Motion (4 octaves for organic detail with high performance)
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Domain Warping for dynamic fluid-like swirling filaments
    float pattern(vec3 p, out vec3 q, out vec3 r) {
      q = vec3(
        fbm(p + vec3(0.0, 0.0, 0.0)),
        fbm(p + vec3(4.2, 1.1, 0.3)),
        fbm(p + vec3(1.3, 8.4, 0.6))
      );

      r = vec3(
        fbm(p + q * 2.2 + vec3(1.5, 7.8, 0.1)),
        fbm(p + q * 1.8 + vec3(6.2, 2.3, 0.5)),
        fbm(p + q * 2.0 + vec3(2.1, 1.4, 0.8))
      );

      return fbm(p + r * 2.0);
    }

    // Pseudo-random number generator
    float rand(vec2 n) {
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    // Sheet lightning flashes inside clouds
    float getLightning(float time, float noiseVal) {
      // Periodic lightning triggers (every few seconds, random flickering)
      float trigger = step(0.985, sin(time * 0.35) * cos(time * 0.65) * 0.5 + 0.5);
      float flicker = sin(time * 90.0) * 0.45 + 0.55;
      // Confine flashes to the dense parts of the nebula
      return trigger * flicker * smoothstep(0.42, 0.85, noiseVal) * 0.22;
    }

    // Aurora curtains waving in the space
    float getAuroraCurtain(vec2 uv, float time) {
      float wave = sin(uv.x * 2.8 + time * 0.12) * 0.22 + cos(uv.x * 1.4 - time * 0.08) * 0.1;
      float rays = snoise(vec3(uv.x * 18.0, uv.y * 1.5, time * 0.08));
      float shape = smoothstep(0.38, 0.0, abs(uv.y - 0.45 - wave - rays * 0.08));
      return shape * (0.4 + 0.6 * rays);
    }

    void main() {
      // uTheme ranges from 0.0 (Light) to 1.0 (Dark)
      float theme = clamp(uTheme, 0.0, 1.0);

      // Subtle parallax coordinate offset based on smoothed mouse positions
      vec2 mouseOffset = uMouse * 0.18;
      
      // Coordinates for domain warping
      vec3 p = vec3((vUv + mouseOffset) * 2.3, uTime * 0.03);
      vec3 q, r;
      float n = pattern(p, q, r);

      // Clamp noise value
      float nClamped = clamp((n + 0.45) * 1.1, 0.0, 1.0);

      // --- COLOR PALETTE DEFINITION ---
      // Background colors
      vec3 bgDark = vec3(0.03, 0.03, 0.07); // deep space midnight
      vec3 bgLight = vec3(0.97, 0.98, 0.99); // clean slate light blue-grey
      vec3 bgColor = mix(bgLight, bgDark, theme);

      // Purple cloud colors (richer in light mode)
      vec3 purpleDark = vec3(0.42, 0.12, 0.72); // glowing neon violet
      vec3 purpleLight = vec3(0.68, 0.42, 0.88); // rich pastel lavender/purple
      vec3 purple = mix(purpleLight, purpleDark, theme);

      // Blue cloud colors (richer in light mode)
      vec3 blueDark = vec3(0.04, 0.36, 0.88); // glowing cosmic blue
      vec3 blueLight = vec3(0.48, 0.68, 0.92); // rich pastel sky blue
      vec3 blue = mix(blueLight, blueDark, theme);

      // Green cloud colors (richer in light mode)
      vec3 greenDark = vec3(0.0, 0.68, 0.52); // glowing emerald teal
      vec3 greenLight = vec3(0.48, 0.82, 0.72); // rich pastel mint green
      vec3 green = mix(greenLight, greenDark, theme);

      // --- NEBULA COMPOSITION ---
      // Combine noise warps to distribute colors organically
      vec3 nebulaColor = mix(purple, blue, clamp(length(q), 0.0, 1.0));
      nebulaColor = mix(nebulaColor, green, clamp(r.x * 2.2, 0.0, 1.0));

      // Sheet lightning effect
      float lightningIntensity = getLightning(uTime, nClamped);
      vec3 lightningColor = mix(vec3(0.6, 0.55, 0.75), vec3(0.8, 0.85, 1.0), theme);
      nebulaColor += lightningColor * lightningIntensity;

      // Density map based on theme to maintain readability (raised min from 0.12 to 0.38)
      float nebulaAlpha = nClamped * mix(0.38, 0.72, theme);

      // --- AURORA COMPOSITION ---
      float auroraIntensity = getAuroraCurtain(vUv + mouseOffset * 0.4, uTime);
      vec3 auroraColorBase = mix(vec3(0.0, 0.76, 0.58), vec3(0.18, 0.76, 0.38), sin(uTime * 0.45) * 0.5 + 0.5);
      // Vivid soft teal-green in light mode
      vec3 auroraColor = mix(vec3(0.42, 0.84, 0.76), auroraColorBase, theme);
      float auroraAlpha = auroraIntensity * mix(0.24, 0.38, theme);

      // --- TWINKLING STARS (Dark Mode Only) ---
      vec2 starUv = (vUv + mouseOffset * 0.12) * 160.0;
      float starNoise = rand(floor(starUv));
      float starTwinkle = sin(uTime * 4.5 + starNoise * 6.28) * 0.5 + 0.5;
      float stars = step(0.994, starNoise) * starTwinkle * theme * 0.85;

      // --- BLENDING ---
      vec3 color = bgColor;
      color = mix(color, nebulaColor, nebulaAlpha);
      color = mix(color, auroraColor, auroraAlpha);
      color += vec3(1.0) * stars;

      // Vignette effect for soft atmospheric borders
      float dist = length(vUv - vec2(0.5));
      float vignette = smoothstep(1.35, 0.42, dist);
      color = color * mix(0.92 + 0.08 * vignette, vignette, theme);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

// 3D Parallax Floating Dust Particles component
const FloatingDustParticles = ({ theme }) => {
  const pointsRef = useRef();
  const count = 280;

  // Generate random stable attributes for particles
  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Space them out within a large viewport frustum
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4; // Z-depth array

      rnd[i * 3] = Math.random();
      rnd[i * 3 + 1] = Math.random();
      rnd[i * 3 + 2] = Math.random();
    }
    return [pos, rnd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionsArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Drift slowly downward and sway left to right
      positionsArr[i * 3 + 1] -= (0.015 + randoms[i * 3] * 0.02) * delta * 60.0;
      positionsArr[i * 3] += Math.sin(time * 0.15 + randoms[i * 3 + 1] * 12.0) * 0.003 * delta * 60.0;

      // Recycle particles if they drift off the bottom screen edge
      if (positionsArr[i * 3 + 1] < -6) {
        positionsArr[i * 3 + 1] = 6;
        positionsArr[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Dynamic particle color and opacity based on active theme
  const particleColor = theme === 'dark' ? '#a5f3fc' : '#c084fc';
  const particleOpacity = theme === 'dark' ? 0.65 : 0.48;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={particleColor}
        transparent
        opacity={particleOpacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Shader Mesh Canvas element
const GalaxyShaderMesh = ({ theme }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { width, height } = useThree((state) => state.viewport);

  // Mouse coordinate refs
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Map mouse location from pixels to normalized [-0.5, 0.5] range
      targetMouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      targetMouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme target: 0.0 = Light mode, 1.0 = Dark mode
  const themeTarget = theme === 'dark' ? 1.0 : 0.0;
  const themeValRef = useRef(themeTarget);

  // Build uniforms structure
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTheme: { value: themeTarget },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    // Increment time
    material.uniforms.uTime.value = state.clock.getElapsedTime();

    // Lerp theme transition smoothly (takes ~1s)
    const lerpSpeedTheme = 4.0;
    themeValRef.current += (themeTarget - themeValRef.current) * lerpSpeedTheme * delta;
    themeValRef.current = Math.max(0.0, Math.min(1.0, themeValRef.current));
    material.uniforms.uTheme.value = themeValRef.current;

    // Lerp mouse coordinates for organic lag/float velocity
    const lerpSpeedMouse = 2.2;
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpSpeedMouse * delta;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpSpeedMouse * delta;
    material.uniforms.uMouse.value.copy(mouseRef.current);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width * 1.1, height * 1.1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={GALAXY_SHADERS.vertexShader}
        fragmentShader={GALAXY_SHADERS.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export default function GalaxyBackground({ scene }) {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 select-none ${
        scene === 'dashboard' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]} // Performance optimization: cap pixel ratio for 4K / mobile screens
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <GalaxyShaderMesh theme={theme} />
        <FloatingDustParticles theme={theme} />
      </Canvas>
    </div>
  );
}
