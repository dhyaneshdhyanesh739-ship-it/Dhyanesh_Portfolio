import React from 'react';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

const certificationsData = [
  { title: 'AI Essentials', provider: 'Coursera', color: 'from-purple-500/10 to-purple-800/5' },
  { title: 'Foundations of AI & ML', provider: 'Coursera', color: 'from-pink-500/10 to-pink-800/5' },
  { title: 'Data Analytics on AWS', provider: 'Coursera', color: 'from-cyan-500/10 to-cyan-800/5' },
  { title: 'Python Visualization', provider: 'Coursera', color: 'from-yellow-500/10 to-yellow-800/5' },
  { title: 'OS Basics', provider: 'Cisco', color: 'from-blue-500/10 to-blue-800/5' },
  { title: 'Python Essentials 1 & 2', provider: 'Cisco', color: 'from-emerald-500/10 to-emerald-800/5' }
];

export default function CertificationsSection() {
  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/10 transition-all duration-300 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-orbitron font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span> Certifications
        </h3>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificationsData.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${cert.color} border border-slate-200 dark:border-slate-900 flex flex-col justify-between hover:border-cyan-500/25 transition-all duration-300 relative group hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.03)]`}
          >
            {/* Radial glow background */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/[0.01] transition-colors duration-300 pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-850 transition-transform duration-300 group-hover:scale-105">
                <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-[10px] font-fira text-slate-500 dark:text-slate-450 uppercase tracking-wider font-bold">{cert.provider}</span>
            </div>
            
            <h4 className="text-sm font-orbitron font-bold text-slate-800 dark:text-slate-200 mt-1 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors relative z-10">
              {cert.title}
            </h4>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
