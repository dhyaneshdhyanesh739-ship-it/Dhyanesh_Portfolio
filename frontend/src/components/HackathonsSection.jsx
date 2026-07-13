import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Trophy, Calendar, MapPin, Award, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Procedural Trophy Component
function Trophy3D() {
  const trophyRef = useRef();

  useFrame((state, delta) => {
    if (trophyRef.current) {
      // Smooth slow auto-rotation
      trophyRef.current.rotation.y += delta * 0.75;
    }
  });

  return (
    <group ref={trophyRef} position={[0, -0.6, 0]}>
      {/* Pedestal / Base */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.25, 16]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Stem / Column */}
      <mesh castShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#a77044" roughness={0.15} metalness={0.9} /> {/* Bronze material */}
      </mesh>

      {/* Connector Ring */}
      <mesh castShadow position={[0, 0.7, 0]}>
        <torusGeometry args={[0.12, 0.03, 8, 24]} />
        <meshStandardMaterial color="#a77044" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Main Cup / Bowl */}
      <mesh castShadow position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.45, 0.15, 0.6, 16, 1, true]} />
        <meshStandardMaterial color="#a77044" roughness={0.1} metalness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Cup Floor (to close the open ended cylinder at the bottom) */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
        <meshStandardMaterial color="#a77044" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Left Handle */}
      <mesh castShadow position={[-0.36, 1.05, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.2, 0.04, 8, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#a77044" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Right Handle */}
      <mesh castShadow position={[0.36, 1.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.2, 0.04, 8, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#a77044" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Decorative Star inside the cup */}
      <mesh position={[0, 1.45, 0]}>
        <octahedronGeometry args={[0.12]} />
        <meshStandardMaterial color="#06b6d4" emissive={new THREE.Color('#06b6d4')} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export default function HackathonsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="space-y-8 selection:bg-cyan-500 selection:text-black">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-orbitron font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            HACKATHON MEMORIES
          </h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-fira">
            Showcase of rapid engineering and collaborative hackathon prototypes.
          </p>
        </div>
        <div className="text-[10px] text-cyan-400 font-fira bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded mt-2 md:mt-0 uppercase tracking-widest flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-cyan-400" /> Bronze Trophy Secured
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Hackathon Timelines */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-8 space-y-6"
        >
          {/* Hackathon 1 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/35 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
              <span className="text-[9px] font-fira font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/25 px-2.5 py-0.5 rounded">
                State Level Hackathon
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> 2025</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pink-400" /> Tuticorin</span>
              </div>
            </div>

            <h3 className="text-lg font-orbitron font-extrabold text-slate-200 mt-2">
              TamilNadu State Level Hackathon (SPIC Nagar School)
            </h3>
            
            <div className="mt-2 text-xs bg-orange-950/20 border border-orange-800/30 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-orange-400 font-fira uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" /> Secured #3 Prize (Bronze Trophy)
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Developed <span className="text-slate-300 font-semibold">BCI - Brain Computer Interface using Neuroprosthetic Limbs</span>.
              Collaborated in a 2-member hardware and software sprint, designing sensor parsing libraries, looping microcontrollers, and fabricating servo-actuated physical prosthetic components.
            </p>
          </motion.div>

          {/* Hackathon 2 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-purple-500/35 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full filter blur-xl"></div>
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
              <span className="text-[9px] font-fira font-bold uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/25 px-2.5 py-0.5 rounded">
                36-Hour Hackathon
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> 2024</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pink-400" /> Coimbatore</span>
              </div>
            </div>

            <h3 className="text-lg font-orbitron font-extrabold text-slate-200 mt-2">
              KIT-Coimbatore 36-Hour Hackathon
            </h3>
            
            <div className="mt-2 text-xs bg-slate-900 border border-slate-800 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-400 font-fira uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-slate-500" /> Theme: SDG-10 Able Assist Technology
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Designed and built assistive solutions for disabled individuals under the United Nations SDG-10 guidelines.
              Collaborated in a team-based coding sprint focusing on accessibility, user experience loops, fast implementation, and final pitch.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Trophy Showcase */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[300px]">
          
          <div className="absolute top-4 left-4 text-[9px] font-mono text-slate-500 z-10 pointer-events-none">
            <span>TROPHY_VIEWER.exe</span>
          </div>
          
          <div className="w-full h-[220px] relative overflow-hidden select-none">
            <Canvas camera={{ position: [0, 0.8, 2.5], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={1.0} />
              <pointLight position={[-5, -5, -5]} intensity={0.2} />
              
              <Trophy3D />
              
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
            </Canvas>
          </div>

          <div className="text-center mt-2 z-10">
            <h4 className="text-sm font-orbitron font-extrabold text-orange-400 uppercase tracking-widest">
              State Level Bronze Medalist
            </h4>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              BCI prosthetic engineering prototype
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
