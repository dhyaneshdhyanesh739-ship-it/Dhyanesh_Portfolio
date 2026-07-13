import React, { useEffect, useState } from 'react';
import { Award, BookOpen, GraduationCap, Briefcase } from 'lucide-react';

// Count-up helper component
const Counter = ({ end, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endNum = parseFloat(end);
    if (isNaN(endNum) || start === endNum) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = 30;
    let steps = totalMiliseconds / incrementTime;
    let stepAmount = endNum / steps;
    
    const timer = setInterval(() => {
      start += stepAmount;
      if (start >= endNum) {
        clearInterval(timer);
        setCount(endNum);
      } else {
        setCount(parseFloat(start.toFixed(2)));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default function AboutSection() {
  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/20 transition-all duration-300 relative selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-orbitron font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span> About Me
        </h2>
        <span className="text-[10px] font-fira text-slate-400 dark:text-slate-500 tracking-wider">SECURE_CREDENTIALS // DECODE_OK</span>
      </div>

      {/* Main Grid Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Avatar */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 shrink-0">
            {/* Spinning Neon Aura Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-600 to-pink-500 animate-spin blur-[4px] opacity-60"></div>
            <div className="absolute inset-1.5 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-900">
              <img
                src="/dhyaneshphoto.jpg"
                alt="Dhyanesh S E"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Neon Accent Rings */}
            <div className="absolute -inset-2.5 rounded-full border border-dashed border-cyan-400/20 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute -inset-1.5 rounded-full border border-purple-500/30 animate-pulse pointer-events-none"></div>
          </div>
          
          <h3 className="text-lg font-orbitron font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest mt-6">
            Dhyanesh S E
          </h3>
          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-wider mt-1.5">
            Full Stack Developer // AI & DS Student
          </p>
        </div>

        {/* Right Side Bio & Context */}
        <div className="lg:col-span-8 space-y-5">
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-inter">
            I am a highly driven **Full Stack Developer** and **Artificial Intelligence & Data Science student** with a deep passion for building high-performance, intelligent software architectures. I specialize in designing responsive, immersive user interfaces and constructing robust, scalable backend operations.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-inter">
            My engineering approach centers around visual superiority, optimization, and clean programmatic architecture. Whether integrating AI hardware interfaces (such as Brain-Computer Interfaces) or coding responsive web ecosystems, I aim to build systems that are fast, elegant, and impactful.
          </p>
          
          <div className="border-t border-slate-200/80 dark:border-slate-900/60 pt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-500">
            <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">&gt; STATUS:</span> Open to Opportunities</div>
            <div><span className="text-purple-600 dark:text-purple-400 font-bold">&gt; LOCATION:</span> Tamil Nadu, India</div>
            <div><span className="text-pink-600 dark:text-pink-400 font-bold">&gt; FOCUS:</span> Web, AI, Data Science</div>
          </div>
        </div>

      </div>

      {/* Grid of 4 Stats Counters (Full Width 4 Columns / 2x2 Mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        
        {/* Stat 1: Projects */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-5 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 dark:hover:border-cyan-500/20 transition-all duration-300 group hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.05)]">
          <span className="text-[10px] font-fira uppercase text-slate-500 dark:text-slate-500 tracking-wider flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Projects
          </span>
          <div className="text-slate-800 dark:text-slate-200 mt-4 font-orbitron">
            <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 block tracking-tight">
              <Counter end="3" />+
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans mt-0.5">Completed Projects</span>
          </div>
        </div>

        {/* Stat 2: CGPA */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-5 rounded-2xl flex flex-col justify-between hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-300 group hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.05)]">
          <span className="text-[10px] font-fira uppercase text-slate-500 dark:text-slate-500 tracking-wider flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> CGPA
          </span>
          <div className="text-slate-800 dark:text-slate-200 mt-4 font-orbitron">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 block tracking-tight">
              <Counter end="8.24" />
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans mt-0.5">Academic CGPA Rating</span>
          </div>
        </div>

        {/* Stat 3: Experience */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-5 rounded-2xl flex flex-col justify-between hover:border-pink-500/20 dark:hover:border-pink-500/20 transition-all duration-300 group hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(236,72,153,0.05)]">
          <span className="text-[10px] font-fira uppercase text-slate-500 dark:text-slate-500 tracking-wider flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" /> Experience
          </span>
          <div className="text-slate-800 dark:text-slate-200 mt-4 font-orbitron">
            <span className="text-xl sm:text-2xl font-black text-pink-600 dark:text-pink-400 block uppercase tracking-wide">
              Intern
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans mt-0.5">Full Stack Developer</span>
          </div>
        </div>

        {/* Stat 4: Hackathons */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-5 rounded-2xl flex flex-col justify-between hover:border-yellow-500/20 dark:hover:border-yellow-500/20 transition-all duration-300 group hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(234,179,8,0.05)]">
          <span className="text-[10px] font-fira uppercase text-slate-500 dark:text-slate-500 tracking-wider flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" /> Hackathons
          </span>
          <div className="text-slate-800 dark:text-slate-200 mt-4 font-orbitron">
            <span className="text-2xl sm:text-3xl font-black text-yellow-600 dark:text-yellow-400 block tracking-tight">
              <Counter end="2" />+
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans mt-0.5">Participated & Placed</span>
          </div>
        </div>

      </div>

    </div>
  );
}
