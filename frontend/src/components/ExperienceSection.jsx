import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <div className="w-full h-full glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 mb-5">
        <h3 className="text-sm font-orbitron font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span> EXPERIENCE
        </h3>
        <span className="text-[9px] font-fira text-slate-400 dark:text-slate-500">ID: DSE_EXP_LOG</span>
      </div>

      {/* Timeline item */}
      <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 ml-2 py-1 space-y-4">
        
        {/* Absolute Timeline Dot */}
        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 border-2 border-darkBg shadow-[0_0_8px_#06b6d4]"></div>
        
        {/* Card Body */}
        <div>
          <span className="text-[9px] font-fira bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/30 px-2 py-0.5 rounded text-cyan-600 dark:text-cyan-300 font-bold uppercase tracking-wider">
            2025 - 2026
          </span>
          <h4 className="text-sm font-orbitron font-bold text-slate-800 dark:text-slate-200 mt-2">
            Full Stack Development Intern
          </h4>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Arumexa Technology Private Limited, Madurai
          </p>

          <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 list-disc pl-4 font-inter leading-relaxed">
            <li>Developed student ERP portals using the MERN stack.</li>
            <li>Collaborated in a team of 2 members to design robust frontend interfaces.</li>
            <li>Built database schemas in MongoDB & optimized CRUD endpoints in Express.</li>
            <li>Configured secure auth routes and token validation patterns.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
