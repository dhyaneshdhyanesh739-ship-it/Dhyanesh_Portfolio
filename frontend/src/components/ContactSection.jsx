import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, CheckCircle2, AlertTriangle, Mail, Phone, MapPin, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

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

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMsg('Please complete all form fields.');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      let rawApiUrl = import.meta.env.VITE_API_URL;
      let API_URL = rawApiUrl;
      
      if (!API_URL) {
        console.warn('VITE_API_URL is undefined at build time. Falling back to default service URL.');
        API_URL = import.meta.env.DEV 
          ? 'http://localhost:5000' 
          : 'https://dhyanesh-portfolio-backend.onrender.com';
      } else {
        // Clean up API_URL in case it contains brackets, quotes, or accidental spaces
        API_URL = API_URL.replace(/[\[\]"']/g, '').trim();
      }

      // Check if protocol is missing (like "dhyanesh-portfolio-backend.onrender.com")
      if (API_URL && !/^https?:\/\//i.test(API_URL)) {
        console.error(`ERROR: API URL "${API_URL}" is missing http:// or https:// protocol. Prepending "https://".`);
        API_URL = `https://${API_URL}`;
      }

      // Check for common typo (missing "-backend" in Render URL)
      if (API_URL && API_URL.includes('dhyanesh-portfolio.onrender.com')) {
        console.warn(`WARNING: The API URL "${API_URL}" appears to be missing the "-backend" suffix. Auto-correcting to https://dhyanesh-portfolio-backend.onrender.com`);
        API_URL = 'https://dhyanesh-portfolio-backend.onrender.com';
      }

      console.log(`Submitting contact form to API endpoint: ${API_URL}/api/contact`);
      const response = await axios.post(`${API_URL}/api/contact`, formData);

      if (response.data.success) {
        setStatus('success');
        setStatusMsg('Message transmitted successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#a855f7', '#ec4899']
        });
      } else {
        setStatus('error');
        setStatusMsg('System rejected payload.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMsg('Transmission failed. Verify backend service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/20 transition-all duration-300 selection:bg-cyan-500 selection:text-black">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 mb-5">
        <h3 className="text-sm font-orbitron font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span> CONTACT ME
        </h3>
        <span className="text-[9px] font-fira text-slate-450 dark:text-slate-500">SSL_SECURE: OK</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Form Inputs */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Your Name"
              required
              className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="Your Email"
              required
              className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
            placeholder="Subject"
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none transition-colors"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            placeholder="Your Message"
            required
            rows={4}
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none transition-colors resize-none"
          />

          {loading && (
            <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Transmission active...
            </div>
          )}

          {status === 'success' && (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {statusMsg}
            </div>
          )}

          {status === 'error' && (
            <div className="p-2.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 rounded-xl flex items-center gap-2 text-red-650 dark:text-red-400 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {statusMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-orbitron font-extrabold tracking-widest text-[10px] uppercase text-white dark:text-black bg-cyan-600 dark:bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-300 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 px-4 py-3 rounded-xl transition-all cursor-pointer shadow-[0_4px_10px_rgba(6,182,212,0.1)] dark:shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            Send Message
          </button>
        </form>

        {/* Right Side: Quick Specs details */}
        <div className="lg:col-span-4 space-y-3.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase leading-none">Email</span>
              <a href="mailto:dhyaneshdhyanesh739@gmail.com" className="text-slate-800 dark:text-slate-200 text-[10px] hover:underline truncate block">dhyaneshdhyanesh739@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase leading-none">Phone</span>
              <span className="text-slate-800 dark:text-slate-200 text-[10px]">+91 7550317811</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <MapPin className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase leading-none">Location</span>
              <span className="text-slate-800 dark:text-slate-200 text-[10px]">Theni, Tamil Nadu, India</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase leading-none">LinkedIn</span>
              <a href="https://www.linkedin.com/in/dhyanesh-s-e-24a831366" target="_blank" rel="noreferrer" className="text-slate-800 dark:text-slate-200 text-[10px] hover:underline truncate block">linkedin.com/in/dhyanesh-s-e</a>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <GithubIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 block uppercase leading-none">GitHub</span>
              <a href="https://github.com/dhyaneshdhyanesh739-ship-it" target="_blank" rel="noreferrer" className="text-slate-800 dark:text-slate-200 text-[10px] hover:underline truncate block">github.com/dhyaneshdhyanesh739</a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
