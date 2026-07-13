import React, { useState } from 'react';
import { ExternalLink, Layers, ShieldCheck, Cpu, Code2, Sparkles, BookOpen, Heart, CheckSquare, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom SVG Icon for GitHub
const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsList = [
  {
    title: 'Smart Student Portal',
    tagline: 'A comprehensive, three-tiered digital ecosystem built to unify the academic experience for Admins, Teachers, and Students.',
    category: 'MERN Stack Web App',
    icon: GraduationCap,
    color: '#a855f7',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    gitLink: 'https://github.com/dhyaneshdhyanesh739-ship-it',
    liveLink: '#',
    architecture: `
┌──────────────────────────────┐
│        React Frontend        │
│   (Context API / Tailwind)   │
└──────────────┬───────────────┘
               │ (Axios JWT Request)
┌──────────────▼───────────────┐
│     Node/Express Gateway     │
│   (Grievance Passkey Auth)   │
└──────────────┬───────────────┘
               │ (Mongoose ODM)
┌──────────────▼───────────────┐
│         MongoDB Atlas        │
│    (Telemetry / Biometrics)  │
└──────────────────────────────┘
`,
    features: [
      'Three-tiered interface unifying access for Admins, Teachers, and Students.',
      'Real-time telemetry feeds and automated biometric attendance status checks.',
      'Dynamic scheduling and automated timetable updates.',
      'Highly secure, passkey-protected grievance triage center.'
    ],
    challenges: 'Integrating diverse biometric attendance hardware payloads and securing access credentials for the passkey-protected grievance dashboard.',
    solutions: 'Built flexible API endpoints in Express to normalize biometric device payloads. Utilized WebAuthn API for passkey authentication, backing it with secure JWT session handling and MongoDB schemas.'
  },
  {
    title: 'Organ Donor Registration System',
    tagline: 'A full stack web application that allows users to register as organ donors and connects them with hospitals.',
    category: 'Full Stack Web App',
    icon: Heart,
    color: '#10b981', // green
    tech: ['React', 'Node.js', 'MongoDB'],
    gitLink: 'https://github.com/dhyaneshdhyanesh739-ship-it',
    liveLink: '#',
    architecture: `
┌──────────────────────────────┐
│        React Frontend        │
│    (Context / Axios Inter)    │
└──────────────┬───────────────┘
               │ (Secure HTTPs)
┌──────────────▼───────────────┐
│     Node/Express Server      │
│  (Helmet / Express-Val / Auth)│
└──────────────┬───────────────┘
               │ (Mongoose ODM)
┌──────────────▼───────────────┐
│     MongoDB Cloud Atlas      │
│      (Encrypted schemas)     │
└──────────────────────────────┘
`,
    features: [
      'Multi-step digital donor registration validation forms.',
      'Comprehensive donor profile management dashboards.',
      'Instant backend verification and authentication keys.',
      'Accessible, clean visual design optimized for ease of use.'
    ],
    challenges: 'Ensuring absolute data privacy and security for highly sensitive donor metrics while maintaining a swift UI loading performance.',
    solutions: 'Configured standard Helmet headers and Express validation gates. Implemented database-level schema indices and used compression middleware to achieve sub-100ms API response times.'
  },
  {
    title: 'Task Management System',
    tagline: 'A task management application to organize, track and manage daily tasks efficiently.',
    category: 'Full Stack Tool',
    icon: CheckSquare,
    color: '#8b5cf6', // purple
    tech: ['React', 'Node.js', 'MongoDB'],
    gitLink: 'https://github.com/dhyaneshdhyanesh739-ship-it',
    liveLink: '#',
    architecture: `
┌──────────────────────────────┐
│       Tailwind + React       │
│  (Custom Hooks / Memoization)│
└──────────────┬───────────────┘
               │ (REST APIs)
┌──────────────▼───────────────┐
│       Express router         │
│     (MVC Controller layer)   │
└──────────────┬───────────────┘
               │ (JSON Payloads)
┌──────────────▼───────────────┐
│         Mongoose DB          │
│       (CRUD operations)      │
└──────────────────────────────┘
`,
    features: [
      'Full Create, Read, Update, and Delete operations for user tasks.',
      'Responsive board layouts styling using Tailwind CSS grid modules.',
      'Strict REST API endpoints mapped to Express route controllers.',
      'Robust local storage caching for immediate offline loading state.'
    ],
    challenges: 'Optimizing high-frequency database writes and preventing page re-rendering jank during fast list reordering actions.',
    solutions: 'Utilized React state memoization hooks (useMemo, useCallback) and set up optimized MongoDB schema updates with lean Mongoose queries to bypass unnecessary serialization cycles.'
  },
  {
    title: 'Brain Computer Interface using Neuroprosthetic Limbs',
    tagline: 'An innovative system that interprets brain signals and converts them into control commands for prosthetic limbs.',
    category: 'Hardware & Embedded',
    icon: Cpu,
    color: '#06b6d4', // cyan
    tech: ['C++', 'Embedded', 'Hardware'],
    gitLink: 'https://github.com/dhyaneshdhyanesh739-ship-it',
    liveLink: '#',
    architecture: `
┌────────────────────────────────┐
│      Biosignals Sensor         │
│     (Raw signal acquisition)   │
└───────────────┬────────────────┘
                │ (Analog Inputs)
┌───────────────▼────────────────┐
│    Arduino Microcontroller     │
│   (C++ Interrupts / Filtering) │
└───────────────┬────────────────┘
                │ (PWM Signal)
┌───────────────▼────────────────┐
│      Servo Motor Array         │
│    (Kinematic limb movement)   │
└────────────────────────────────┘
`,
    features: [
      'C++ hardware loop logic designed to process muscle trigger signals.',
      'Low-latency analog-to-digital sensor calibration cycles.',
      'Custom hardware servo kinematic paths for arm actuation.',
      'Designed specifically to empower physically disabled individuals.'
    ],
    challenges: 'Compensating for jittery analog readings and preventing blocking loop routines that cause servo motor lag.',
    solutions: 'Replaced standard blocking delays with milliseconds-timestamp state machine checks. Implemented an exponential moving average (EMA) filter in C++ to smooth out signal noise in real-time.'
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 relative selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-orbitron font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span> Featured Projects
        </h2>
        <a 
          href="https://github.com/dhyaneshdhyanesh739-ship-it" 
          target="_blank" 
          rel="noreferrer"
          className="text-xs text-cyan-600 dark:text-cyan-400 font-mono hover:underline cursor-pointer flex items-center gap-1"
        >
          View All Projects &gt;
        </a>
      </div>

      {/* 3 cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project, idx) => {
          const IconComponent = project.icon;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900/60 p-6 rounded-2xl hover:border-slate-300 dark:hover:border-slate-800 flex flex-col justify-between relative group overflow-hidden hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
            >
              {/* Radial glow background */}
              <div 
                className="absolute -top-10 -right-10 w-20 h-20 opacity-0 group-hover:opacity-10 transition-all duration-300 blur-lg pointer-events-none rounded-full"
                style={{ backgroundColor: project.color }}
              ></div>

              <div>
                {/* Glowing Top-Left Icon Circle */}
                <div 
                  className="w-11 h-11 rounded-full flex items-center justify-center border bg-white dark:bg-slate-950/80 transition-all duration-300"
                  style={{ borderColor: `${project.color}25`, boxShadow: `0 0 10px ${project.color}05` }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: project.color }} />
                </div>

                {/* Title */}
                <h4 className="text-base font-orbitron font-black text-slate-800 dark:text-slate-200 mt-5 leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>

                {/* Tagline */}
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-2.5 leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>

                {/* Technology badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions footer */}
              <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-200 dark:border-slate-900/60">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 text-[10px] font-orbitron uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/15 border border-cyan-200 dark:border-cyan-800/20 hover:bg-cyan-100/50 dark:hover:bg-cyan-950/30 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Details
                </button>
                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-[10px] font-fira uppercase text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBg/60 dark:bg-darkBg/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 relative border border-slate-300/80 dark:border-slate-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_50px_rgba(168,85,247,0.15)] z-50"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-[10px] font-fira text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                CLOSE [ESC]
              </button>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-5 mt-3">
                <span className="text-[9px] font-fira text-cyan-600 dark:text-cyan-400 tracking-widest uppercase bg-cyan-50/40 dark:bg-cyan-950/30 px-2.5 py-1 border border-cyan-200 dark:border-cyan-800/20 rounded">
                  {selectedProject.category}
                </span>
                <h2 className="text-lg font-orbitron font-extrabold text-slate-850 dark:text-slate-100 mt-2">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* Tech list */}
                <div>
                  <h4 className="font-orbitron text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 uppercase mb-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Full Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-2.5 py-1 rounded text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div>
                  <h4 className="font-orbitron text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 uppercase mb-2">
                    <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Architecture Blueprint
                  </h4>
                  <pre className="text-[10px] font-mono bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-900 p-3 rounded-xl text-cyan-600 dark:text-cyan-400 overflow-x-auto leading-relaxed select-all">
                    {selectedProject.architecture}
                  </pre>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-orbitron text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" /> Core Features
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-xs">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-950/5 dark:bg-red-950/10 border border-red-500/10 dark:border-red-500/10 p-3 rounded-xl">
                    <h5 className="text-red-500 dark:text-red-400 font-orbitron text-xs font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Challenge
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>

                  <div className="bg-emerald-950/5 dark:bg-emerald-950/10 border border-emerald-500/10 dark:border-emerald-500/10 p-3 rounded-xl">
                    <h5 className="text-emerald-600 dark:text-emerald-400 font-orbitron text-xs font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Solution
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedProject.solutions}
                    </p>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={selectedProject.gitLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-fira text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 px-4 py-2 rounded-xl transition-all"
                >
                  GitHub Repository
                </a>
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-orbitron font-bold tracking-widest text-xs text-white dark:text-black bg-cyan-600 dark:bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-300 px-4 py-2 rounded-xl transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
