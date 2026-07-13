import React from 'react';
import { Award, Trophy, Code2, Target, Flame } from 'lucide-react';

export default function CompetitiveDashboard() {
  return (
    <div className="w-full h-full glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between selection:bg-cyan-500 selection:text-black space-y-6">
      
      {/* 1. Achievements Section */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-2 mb-4">
          <h3 className="text-[11px] font-orbitron font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span> Achievements
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* CodeChef */}
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/30 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 block uppercase">CodeChef Max</span>
              <span className="text-xs font-orbitron font-black text-slate-800 dark:text-slate-200">1450 (Div-3)</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-400 block">500+ Solved</span>
            </div>
          </div>

          {/* LeetCode */}
          <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 block uppercase">LeetCode Max</span>
              <span className="text-xs font-orbitron font-black text-slate-800 dark:text-slate-200">1499</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-400 block">300+ Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hackathons Section */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-2 mb-3">
          <h3 className="text-[11px] font-orbitron font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400"></span> Hackathons
          </h3>
        </div>

        <div className="space-y-3">
          {/* Hackathon 1 */}
          <div className="p-3 rounded-2xl bg-slate-50/30 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 flex items-center justify-center shrink-0 mt-0.5">
              <Trophy className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-orbitron font-extrabold text-slate-800 dark:text-slate-200">36-Hour Hackathon</span>
                <span className="text-[8px] font-mono bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/25">Coimbatore</span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal">
                KIT Coimbatore - Developed SDG-10 Able Assist Technology for Disabled Peoples.
              </p>
            </div>
          </div>

          {/* Hackathon 2 */}
          <div className="p-3 rounded-2xl bg-slate-50/30 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-850/30 flex items-center justify-center shrink-0 mt-0.5">
              <Trophy className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 animate-pulse" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-orbitron font-extrabold text-slate-800 dark:text-slate-200">TamilNadu State Hackathon</span>
                <span className="text-[8px] font-mono bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded text-orange-600 dark:text-orange-300 border border-orange-200 dark:border-orange-850/25">Tuticorin</span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal">
                Secured <span className="text-orange-600 dark:text-orange-400 font-semibold">3rd Place</span> with Brain Computer Interface hardware prototype.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
