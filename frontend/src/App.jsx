import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './components/Dashboard';

const generateLightningPath = (startX, startY, endX, endY, displace) => {
  const points = [[startX, startY]];
  const subdivide = (x1, y1, x2, y2, disp) => {
    if (disp < 12) {
      points.push([x2, y2]);
      return;
    }
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
    subdivide(x1, y1, midX, midY, disp * 0.5);
    subdivide(midX, midY, x2, y2, disp * 0.5);
  };
  subdivide(startX, startY, endX, endY, displace);
  return points.map(p => `${p[0]},${p[1]}`).join(' ');
};

const LightningStorm = () => {
  const [bolts, setBolts] = useState([]);

  useEffect(() => {
    const generateBolts = () => {
      const newBolts = [];
      const numBolts = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numBolts; i++) {
        const startX = Math.random() * window.innerWidth;
        const startY = 0;
        const endX = window.innerWidth / 2 + (Math.random() - 0.5) * 450;
        const endY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
        const path = generateLightningPath(startX, startY, endX, endY, 150);
        newBolts.push({
          id: Math.random(),
          points: path,
          opacity: 0.65 + Math.random() * 0.35,
          width: 1.5 + Math.random() * 2
        });
      }
      setBolts(newBolts);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        generateBolts();
      } else {
        setBolts([]);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <defs>
        <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {bolts.map(b => (
        <polyline
          key={b.id}
          points={b.points}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={b.width}
          opacity={b.opacity}
          filter="url(#gold-glow)"
        />
      ))}
    </svg>
  );
};

const FireStorm = () => {
  const embers = useMemo(() => {
    const arr = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const left = 10 + Math.random() * 80;
      const size = 5 + Math.random() * 8;
      const delay = Math.random() * 2;
      const duration = 1.0 + Math.random() * 1.5;
      arr.push({ id: i, left, size, delay, duration });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20">
      {embers.map(e => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full fire-ember-particle"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [scene, setScene] = useState('intro'); // 'intro' | 'tunnel' | 'dashboard'
  const [introStage, setIntroStage] = useState('quotes'); // starts at 'quotes'
  const [showCursor, setShowCursor] = useState(false);
  
  // Custom cursor references
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  
  // R3F Canvas references for camera control
  const cameraRef = useRef();
 
  // 1. Mouse coordinates listener for Custom Cursor & Ripple effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setShowCursor(true);
      if (cursorDotRef.current && cursorRingRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08
        });
        gsap.to(cursorRingRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.22
        });
      }
    };
    
    const handleMouseDown = () => {
      if (cursorRingRef.current) {
        gsap.to(cursorRingRef.current, { scale: 0.7, duration: 0.15 });
      }
    };

    const handleMouseUp = () => {
      if (cursorRingRef.current) {
        gsap.to(cursorRingRef.current, { scale: 1.0, duration: 0.15 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Trigger sequential cinematic victory stages instantly on page load
  useEffect(() => {
    if (scene === 'intro') {
      setIntroStage('vini');
      const t1 = setTimeout(() => {
        setIntroStage('vidi');
      }, 2000); // 2s
      
      const t2 = setTimeout(() => {
        setIntroStage('vici');
      }, 4000); // 4s

      const t3 = setTimeout(() => {
        setScene('dashboard');
      }, 6000); // 6s total play time
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [scene]);

  return (
    <div className="relative w-full min-h-screen bg-[#020208] text-slate-200 select-none overflow-hidden">
      
      {/* Custom Cursor */}
      {showCursor && (
        <>
          <div ref={cursorDotRef} className="custom-cursor-dot pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <div ref={cursorRingRef} className="custom-cursor pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        </>
      )}

      {/* STATE ORCHESTRATOR */}
      <AnimatePresence mode="wait">
        
        {/* SCENE 1: CINEMATIC INTRO */}
        {scene === 'intro' && (
          <motion.div
            key="intro-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full min-h-screen flex flex-col justify-center items-center relative p-6 z-10"
          >
            {/* Background floating particles */}
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ParticleBackground stage={introStage} />
              </Canvas>
            </div>

            {/* Glowing Aurora */}
            <div className="aurora-bg">
              <div className="aurora-blob-1"></div>
              <div className="aurora-blob-2"></div>
            </div>

            {/* Overlaid absolute text reveals */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
              <AnimatePresence>
                
                {introStage === 'vini' && (
                  <>
                    <div className="lightning-overlay" />
                    <LightningStorm />
                    <motion.div
                      key="vini"
                      initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ scale: 1.02, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.15 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute flex flex-col items-center justify-center text-center px-4 z-30"
                    >
                      <div className="relative select-none gold-glow-wrapper">
                        <h1 className="text-7xl sm:text-[10rem] md:text-[13rem] font-orbitron font-black tracking-[0.2em] uppercase leading-none pr-[-0.2em] electric-text">
                          VINI
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent -skew-x-20 animate-sweep mix-blend-overlay pointer-events-none"></div>
                        </h1>
                      </div>
                      <p className="text-[10px] sm:text-xs font-orbitron font-bold tracking-[0.5em] text-amber-400 uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] mt-4">
                        "I CAME"
                      </p>
                    </motion.div>
                  </>
                )}

                {introStage === 'vici' && (
                  <>
                    <div className="fire-glow-overlay" />
                    <FireStorm />
                    <motion.div
                      key="vici"
                      initial={{ scale: 0.75, opacity: 0, filter: 'blur(12px)' }}
                      animate={{ 
                        scale: 1.08, 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        x: [0, -2, 2, -1, 1, 0],
                        y: [0, 1.5, -1.5, 0]
                      }}
                      exit={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
                      transition={{ 
                        x: { repeat: Infinity, duration: 0.12, repeatType: 'mirror' },
                        y: { repeat: Infinity, duration: 0.18, repeatType: 'mirror' },
                        default: { duration: 0.8, ease: 'easeOut' }
                      }}
                      className="absolute flex flex-col items-center justify-center text-center px-4 z-30"
                    >
                      <div className="relative select-none fire-glow-wrapper">
                        <h1 className="text-7xl sm:text-[10rem] md:text-[13rem] font-orbitron font-black tracking-[0.2em] uppercase leading-none fire-text">
                          VICI
                          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-pulse pointer-events-none"></span>
                        </h1>
                      </div>
                      <p className="text-[10px] sm:text-xs font-orbitron font-bold tracking-[0.5em] text-orange-400 uppercase drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] mt-4">
                        "I CONQUERED"
                      </p>
                    </motion.div>
                  </>
                )}

                {introStage === 'vidi' && (
                  <>
                    <div className="water-overlay" />
                    <motion.div
                      key="vidi"
                      initial={{ scale: 0.95, opacity: 0, filter: 'blur(5px)' }}
                      animate={{ 
                        scale: 1.12, 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        x: [0, -1, 1, 0],
                        y: [0, 2, -2, 0]
                      }}
                      exit={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
                      transition={{ 
                        x: { repeat: Infinity, duration: 2.0, ease: 'easeInOut' },
                        y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
                        default: { duration: 0.8, ease: 'easeOut' }
                      }}
                      className="absolute flex flex-col items-center justify-center text-center px-4"
                    >
                      <h1 className="text-7xl sm:text-[10rem] md:text-[13rem] font-orbitron font-black tracking-[0.2em] select-none uppercase leading-none water-text">
                        VIDI
                      </h1>
                      <p className="text-[10px] sm:text-xs font-orbitron font-bold tracking-[0.5em] text-cyan-300 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] mt-4">
                        "I SAW"
                      </p>
                    </motion.div>
                  </>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* SCENE 5: WEB PORTFOLIO SYSTEM */}
        {scene === 'dashboard' && (
          <motion.div
            key="dashboard-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen relative z-10"
          >
            <Dashboard />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
