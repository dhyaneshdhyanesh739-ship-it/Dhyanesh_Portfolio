import React from 'react';
import { Code2, Globe, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Programming',
    icon: Code2,
    borderColor: 'hover:border-blue-500/30',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-950/40 border-blue-800/30',
    skills: ['Python', 'Java', 'C++', 'C']
  },
  {
    category: 'Web',
    icon: Globe,
    borderColor: 'hover:border-emerald-500/30',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-950/40 border-emerald-800/30',
    skills: ['HTML', 'CSS', 'JavaScript', 'MERN Stack']
  },
  {
    category: 'Database',
    icon: Database,
    borderColor: 'hover:border-amber-500/30',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-950/40 border-amber-800/30',
    skills: ['DBMS', 'MySQL']
  },
  {
    category: 'Tools',
    icon: Wrench,
    borderColor: 'hover:border-purple-500/30',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/40 border-purple-800/30',
    skills: ['n8n', 'UI/UX Design', 'Figma', 'Stitch']
  }
];

export default function SkillsCloud() {
  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/10 transition-all duration-300 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-orbitron font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span> Technical Skills
        </h2>
        <span className="text-[10px] font-fira text-slate-400 dark:text-slate-500 tracking-wider">SKILLS_MATRIX // DECODE_OK</span>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsData.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900/60 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.03)] p-6 rounded-[1.8rem] flex flex-col justify-between transition-all duration-300 group ${cat.borderColor}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-900/60">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${cat.iconBg} transition-transform duration-300 group-hover:scale-105`}>
                    <IconComponent className={`w-5.5 h-5.5 ${cat.iconColor}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-orbitron font-bold text-slate-800 dark:text-slate-200 tracking-wide">
                    {cat.category}
                  </h3>
                </div>

                {/* Tags Pill container */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-xs font-fira text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/35 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-[0_2px_8px_rgba(6,182,212,0.04)] dark:hover:shadow-[0_0_12px_rgba(6,182,212,0.1)] rounded-xl transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

