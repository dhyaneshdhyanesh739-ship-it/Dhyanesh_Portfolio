import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function EducationSection() {
  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/10 transition-all duration-300 relative selection:bg-cyan-500 selection:text-black">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-2xl"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-orbitron font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span> Education
        </h2>
      </div>

      {/* Education Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Card 1: College */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-6 rounded-2xl flex flex-col justify-between hover:border-purple-500/20 dark:hover:border-purple-500/20 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.05)] transition-all duration-300 group">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-[10px] font-fira bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/30 px-2 py-0.5 rounded text-purple-600 dark:text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> 2024 - 2028
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-orbitron font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Kalaignar Karunanidhi Institute of Technology
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> B.Tech. Artificial Intelligence and Data Science
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
              Focusing on cutting-edge fields including machine learning, deep neural networks, cognitive computing, and data science methodology. Engaging in hands-on labs and collegiate tech symposiums.
            </p>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-900/60 pt-4 mt-6 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">GRADE RATING</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> CGPA: 8.24 / 10.0
            </span>
          </div>
        </div>

        {/* Card 2: School */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-900/60 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 dark:hover:border-cyan-500/20 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 group">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-[10px] font-fira bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/30 px-2 py-0.5 rounded text-cyan-600 dark:text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> 2023 - 2024
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-orbitron font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Theni Melapettai Hindu Nadar Uravinmurai Matriculation Higher Secondary School
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Higher Secondary (Class XII)
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
              Completed academic curriculum with specialization in Physics, Chemistry, Mathematics, and Computer Science. Laid core analytical skills and fundamentals in science and mathematics.
            </p>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-900/60 pt-4 mt-6 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">PERFORMANCE</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> 80.83%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
