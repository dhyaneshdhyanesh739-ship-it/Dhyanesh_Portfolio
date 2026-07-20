import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './components/Dashboard';
import GalaxyBackground from './components/GalaxyBackground';

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
  const svgRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const generateLightningBolts = () => {
      const svg = svgRef.current;
      if (!svg) return;
      
      // Clear existing bolts
      while (svg.firstChild && svg.firstChild.tagName !== 'defs') {
        svg.removeChild(svg.lastChild);
      }

      if (Math.random() > 0.35) {
        const numBolts = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numBolts; i++) {
          const startX = Math.random() * window.innerWidth;
          const endX = window.innerWidth / 2 + (Math.random() - 0.5) * 450;
          const endY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
          const path = generateLightningPath(startX, 0, endX, endY, 150);

          const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          polyline.setAttribute('points', path);
          polyline.setAttribute('fill', 'none');
          polyline.setAttribute('stroke', '#fbbf24');
          polyline.setAttribute('stroke-width', String(1.5 + Math.random() * 2));
          polyline.setAttribute('opacity', String(0.65 + Math.random() * 0.35));
          polyline.setAttribute('filter', 'url(#gold-glow)');
          svg.appendChild(polyline);
        }
      }
    };

    intervalRef.current = setInterval(generateLightningBolts, 150);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <defs>
        <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

const FireStorm = () => {
  const embers = useMemo(() => {
    const arr = [];
    const count = 65; // increased from 22 for richer fire storm
    for (let i = 0; i < count; i++) {
      const left = 5 + Math.random() * 90;
      const size = 6 + Math.random() * 12; // larger embers
      const delay = Math.random() * 2;
      const duration = 1.2 + Math.random() * 1.8;
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

const WaterDroplets = () => {
  const drops = useMemo(() => {
    const arr = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const size = 1.5 + Math.random() * 3.5;
      const delay = Math.random() * 3;
      const duration = 1.2 + Math.random() * 1.8;
      arr.push({ id: i, left, size, delay, duration });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20">
      {drops.map(d => (
        <span
          key={d.id}
          className="absolute top-[-25px] rounded-full water-drop-particle"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size * 5.5}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const Sparkles = ({ color }) => {
  const sparkles = useMemo(() => {
    const arr = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 110 - 5;
      const top = Math.random() * 110 - 5;
      const size = 4 + Math.random() * 8;
      const delay = Math.random() * 3;
      const duration = 1.2 + Math.random() * 1.8;
      arr.push({ id: i, left, top, size, delay, duration });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-[-30px] pointer-events-none z-40 overflow-visible">
      {sparkles.map(s => (
        <svg
          key={s.id}
          className="absolute sparkle-particle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            fill: color,
            '--glow-color': color,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
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
    <div className={`relative w-full min-h-screen select-none overflow-hidden transition-colors duration-500 ${
      scene === 'intro' ? 'bg-[#020208] text-slate-200' : 'bg-transparent text-slate-800 dark:text-slate-200'
    }`}>
      
      {/* Dynamic Galaxy Background */}
      <GalaxyBackground scene={scene} />
      
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
                        <Sparkles color="#fef08a" />
                        <h1 className="text-[5.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-serif font-bold tracking-[0.05em] uppercase leading-none whitespace-nowrap electric-text">
                          VINI
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent -skew-x-20 animate-sweep mix-blend-overlay pointer-events-none"></div>
                        </h1>
                      </div>
                      <p 
                        className="text-xs sm:text-sm font-orbitron font-bold tracking-[0.5em] text-amber-400 uppercase mt-4"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(245,158,11,0.7)' }}
                      >
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
                        x: { repeat: Infinity, duration: 0.25, repeatType: 'mirror' },
                        y: { repeat: Infinity, duration: 0.35, repeatType: 'mirror' },
                        default: { duration: 0.8, ease: 'easeOut' }
                      }}
                      className="absolute flex flex-col items-center justify-center text-center px-4 z-30"
                    >
                      <div className="relative select-none fire-glow-wrapper">
                        <Sparkles color="#ff4500" />
                        <h1 className="text-[5.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-serif font-bold tracking-[0.05em] uppercase leading-none whitespace-nowrap fire-text">
                          VICI
                        </h1>
                      </div>
                      <p 
                        className="text-xs sm:text-sm font-orbitron font-bold tracking-[0.5em] text-orange-400 uppercase mt-4"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(249,115,22,0.7)' }}
                      >
                        "I CONQUERED"
                      </p>
                    </motion.div>
                  </>
                )}

                {introStage === 'vidi' && (
                  <>
                    <div className="water-overlay" />
                    <WaterDroplets />
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
                      className="absolute flex flex-col items-center justify-center text-center px-4 z-30"
                    >
                      <div className="relative select-none">
                        <Sparkles color="#22d3ee" />
                        <h1 className="text-[5.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-serif font-bold tracking-[0.05em] uppercase leading-none whitespace-nowrap water-text">
                          VEDI
                        </h1>
                      </div>
                      <p 
                        className="text-xs sm:text-sm font-orbitron font-bold tracking-[0.5em] text-cyan-300 uppercase mt-4"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(6,182,212,0.7)' }}
                      >
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
