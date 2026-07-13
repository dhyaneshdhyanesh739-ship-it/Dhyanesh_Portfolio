import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, ArrowRight, MousePointer, Clock, ChevronUp, Sun, Moon, Menu, X
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';

// Component imports
import AboutSection from './AboutSection';
import EducationSection from './EducationSection';
import SkillsCloud from './SkillsCloud';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import CertificationsSection from './CertificationsSection';
import CompetitiveDashboard from './CompetitiveDashboard';
import ContactSection from './ContactSection';
import HolographicGlobe3D from './HolographicGlobe3D';

// Custom SVG Icons
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const TypewriterHero = () => {
  const line1Text = "FULL STACK ENGINEER";
  const line2Text = "ARTIFICIAL INTELLIGENCE & DATA SCIENCE ENTHUSIAST";

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    let active = true;
    let timer1;
    let timer2;
    
    let index1 = 0;
    const type1 = () => {
      if (!active) return;
      if (index1 < line1Text.length) {
        setLine1(line1Text.substring(0, index1 + 1));
        index1++;
        timer1 = setTimeout(type1, 80);
      } else {
        timer1 = setTimeout(() => {
          if (!active) return;
          setActiveLine(2);
          type2();
        }, 700);
      }
    };

    let index2 = 0;
    const type2 = () => {
      if (!active) return;
      if (index2 < line2Text.length) {
        setLine2(line2Text.substring(0, index2 + 1));
        index2++;
        timer2 = setTimeout(type2, 80);
      } else {
        setActiveLine('done');
      }
    };

    // Reset components to typing initial state
    setLine1('');
    setLine2('');
    setActiveLine(1);

    type1();

    return () => {
      active = false;
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="font-fira space-y-1.5 select-none min-h-[58px] sm:min-h-[72px] md:min-h-[92px] overflow-hidden">
      {/* Line 1 */}
      <div className="flex items-center flex-wrap leading-tight">
        <span className="text-base sm:text-xl md:text-2xl font-black tracking-wider text-[#00e5ff] uppercase">
          {line1}
        </span>
        {activeLine === 1 && (
          <span className="inline-block w-2 h-4 sm:w-2.5 sm:h-6 md:h-7 ml-1 bg-[#00e5ff] cursor-line" />
        )}
      </div>

      {/* Line 2 */}
      <div className="flex items-center flex-wrap leading-tight">
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-[#b56cff] uppercase">
          {line2}
        </span>
        {(activeLine === 2 || activeLine === 'done') && (
          <span className="inline-block w-1.5 h-3 sm:w-2 sm:h-4 md:h-5 ml-1 bg-[#b56cff] cursor-line" />
        )}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References for smooth scrolling
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Update Clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth Scroll Trigger helper
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-darkBg text-slate-800 dark:text-slate-200 font-inter flex flex-col justify-between relative selection:bg-cyan-500 selection:text-black transition-colors duration-500">
      
      {/* Aurora Glow Backgrounds */}
      <div className="aurora-bg">
        <div className="aurora-blob-1"></div>
        <div className="aurora-blob-2"></div>
        <div className="aurora-blob-3"></div>
      </div>

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 cyber-grid cyber-grid-fade pointer-events-none z-0"></div>

      {/* HEADER NAVBAR */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-6 py-3 flex items-center justify-between z-30 sticky top-0 transition-all duration-300">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full border border-cyan-500/40 flex items-center justify-center relative cursor-pointer" onClick={() => scrollToRef(homeRef)}>
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-200 dark:bg-slate-900">
              <img src="/dhyaneshphoto.jpg" alt="SED Profile Logo" className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute inset-0.5 rounded-full border border-dashed border-purple-500 dark:border-purple-500 animate-[spin_30s_linear_infinite] pointer-events-none"></div>
          </div>
          <span className="font-orbitron font-black text-[13px] text-cyan-500 dark:text-cyan-400 tracking-wider">SED</span>
        </div>

        {/* Center navigation links (smooth scroll targets) */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-orbitron uppercase font-bold tracking-widest text-slate-600 dark:text-slate-400">
          <button onClick={() => scrollToRef(homeRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Home</button>
          <button onClick={() => scrollToRef(aboutRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">About</button>
          <button onClick={() => scrollToRef(educationRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Education</button>
          <button onClick={() => scrollToRef(skillsRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Skills</button>
          <button onClick={() => scrollToRef(projectsRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Projects</button>
          <button onClick={() => scrollToRef(experienceRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Experience</button>
          <button onClick={() => scrollToRef(contactRef)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Contact</button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-3.5 text-[10px] font-mono text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> <span>{currentTime}</span>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
            aria-label="Toggle Theme"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 absolute transition-all duration-500 rotate-0 scale-100 animate-[spin_12s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 absolute transition-all duration-500 rotate-12 scale-100" />
              )}
            </div>
          </button>

          <a
            href="/dhyaneshresume.pdf"
            download="Dhyanesh_S_E_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 text-[10px] font-orbitron font-extrabold uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/15 border border-cyan-200/50 dark:border-cyan-800/25 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:bg-cyan-100/50 dark:hover:bg-cyan-950/30 rounded-xl transition-all cursor-pointer shadow-[0_2px_8px_rgba(6,182,212,0.05)] dark:shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          >
            <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Download Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown/Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] z-50 glass-panel border-b border-slate-200 dark:border-slate-850 py-4 px-6 flex flex-col gap-1 animate-slide-down shadow-[0_15px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <button 
            onClick={() => { scrollToRef(homeRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Home
          </button>
          <button 
            onClick={() => { scrollToRef(aboutRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            About
          </button>
          <button 
            onClick={() => { scrollToRef(educationRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Education
          </button>
          <button 
            onClick={() => { scrollToRef(skillsRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Skills
          </button>
          <button 
            onClick={() => { scrollToRef(projectsRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Projects
          </button>
          <button 
            onClick={() => { scrollToRef(experienceRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Experience
          </button>
          <button 
            onClick={() => { scrollToRef(contactRef); setMobileMenuOpen(false); }} 
            className="text-left py-2.5 px-4 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-cyan-450/10 text-xs font-orbitron uppercase font-extrabold tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
          >
            Contact
          </button>
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-4" />
          <div className="flex items-center justify-center gap-6 py-2">
            <a href="https://github.com/dhyaneshdhyanesh739-ship-it" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-650 dark:text-slate-350"><GithubIcon className="w-[21px] h-[21px]" /></a>
            <a href="https://www.linkedin.com/in/dhyanesh-s-e-24a831366" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-650 dark:text-slate-350"><LinkedinIcon className="w-[21px] h-[21px]" /></a>
            <a href="mailto:dhyaneshdhyanesh739@gmail.com" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-650 dark:text-slate-350"><MailIcon className="w-[21px] h-[21px]" /></a>
          </div>
        </div>
      )}

      {/* DASHBOARD SINGLE-PAGE VERTICAL DOCK */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 relative z-10 space-y-16">
        
        {/* SECTION 1: HERO / HOME (Full Screen Height focus) */}
        <section id="home" className="pt-4 scroll-mt-20" ref={homeRef}>
          <div className="w-full glass-panel p-8 pb-16 sm:p-12 sm:pb-16 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden min-h-[460px] flex items-center">
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full filter blur-3xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              
              {/* Left Column: Bio Texts & CTAs */}
              <div className="lg:col-span-7 space-y-6">

                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm uppercase tracking-widest block">HELLO, I'M</span>
                  <h1 className="text-4xl sm:text-6xl font-orbitron font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide leading-none">
                    Dhyanesh S E
                  </h1>
                </div>

                <TypewriterHero />

                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-inter">
                  Building intelligent software, immersive digital experiences, and scalable web applications.
                </p>

                {/* Interactive CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => scrollToRef(projectsRef)}
                    className="flex items-center gap-2 font-orbitron font-bold tracking-widest text-[11px] uppercase text-white dark:text-black bg-cyan-600 dark:bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-300 px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-[0_4px_12px_rgba(6,182,212,0.15)] dark:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  >
                    View My Work <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToRef(contactRef)}
                    className="flex items-center gap-2 font-orbitron font-bold tracking-widest text-[11px] uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Hire Me
                  </button>
                </div>
              </div>

              {/* Right Column: Rotating Holographic Globe */}
              <div className="lg:col-span-5 h-[340px] w-full relative">
                <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={1.0} />
                  <HolographicGlobe3D />
                </Canvas>
              </div>

            </div>

            {/* Bottom Panel Socials Indicator */}
            <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center text-xs font-mono text-slate-500 border-t border-slate-200/80 dark:border-slate-900/60 pt-3">
              <div className="flex items-center gap-4.5">
                <a href="https://github.com/dhyaneshdhyanesh739-ship-it" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110"><GithubIcon className="w-[21px] h-[21px]" /></a>
                <a href="https://www.linkedin.com/in/dhyanesh-s-e-24a831366" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110"><LinkedinIcon className="w-[21px] h-[21px]" /></a>
                <a href="mailto:dhyaneshdhyanesh739@gmail.com" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110"><MailIcon className="w-[21px] h-[21px]" /></a>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-500">
                <MousePointer className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-bounce" /> Scroll Down to Explore
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME */}
        <section id="about" className="scroll-mt-20" ref={aboutRef}>
          <AboutSection />
        </section>

        {/* SECTION 2.5: EDUCATION */}
        <section id="education" className="scroll-mt-20" ref={educationRef}>
          <EducationSection />
        </section>

        {/* SECTION 3: TECHNICAL SKILLS */}
        <section id="skills" className="scroll-mt-20" ref={skillsRef}>
          <SkillsCloud />
        </section>

        {/* SECTION 4: FEATURED PROJECTS */}
        <section id="projects" className="scroll-mt-20" ref={projectsRef}>
          <ProjectsSection />
        </section>

        {/* SECTION 5: EXPERIENCE & ACHIEVEMENTS */}
        <section id="experience" className="scroll-mt-20" ref={experienceRef}>
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <ExperienceSection />
            </div>
            
            <div className="w-full">
              <CompetitiveDashboard />
            </div>
          </div>
        </section>

        {/* SECTION 6: CERTIFICATIONS */}
        <section id="certifications" className="scroll-mt-20">
          <CertificationsSection />
        </section>

        {/* SECTION 7: CONTACT ME */}
        <section id="contact" className="scroll-mt-20" ref={contactRef}>
          <ContactSection />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-900 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-6 py-6 mt-12 relative z-10 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-orbitron font-extrabold text-slate-800 dark:text-slate-300">DHYANESH S E</span>
            <span className="text-[10px] text-slate-500">Full Stack Developer & AI & DS Student</span>
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            <div className="flex items-center gap-4.5 md:hidden mb-1">
              <a href="https://github.com/dhyaneshdhyanesh739-ship-it" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-500"><GithubIcon className="w-[18px] h-[18px]" /></a>
              <a href="https://www.linkedin.com/in/dhyanesh-s-e-24a831366" target="_blank" rel="noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-500"><LinkedinIcon className="w-[18px] h-[18px]" /></a>
              <a href="mailto:dhyaneshdhyanesh739@gmail.com" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 text-slate-500"><MailIcon className="w-[18px] h-[18px]" /></a>
            </div>
            <span>&copy; 2026 Dhyanesh S E. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Designed & Built with ❤️ and lots of ☕</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
