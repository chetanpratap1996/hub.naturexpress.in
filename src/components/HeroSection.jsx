import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ── AnimatedCounter ─────────────────────────────────────────── */
const AnimatedCounter = ({ target, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const duration = 1800;
        const animate = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          setCount(Math.floor(ease * target));
          if (t < 1) requestAnimationFrame(animate);
          else setCount(target);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

const HeroSection = () => {
  const scrollToReality = () => {
    const el = document.getElementById('market-reality');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAudit = () => {
    const el = document.getElementById('live-audit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-b from-slate-50/90 via-white to-white pt-20 pb-6 lg:pt-24 lg:pb-8 px-6 md:px-12 overflow-hidden border-b border-slate-200/60">
      
      {/* Background Soft Mesh Ambient Glows */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-purple-100/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

        {/* Left Column: High-Suspense Newspaper Headline (Proportionate for Above-The-Fold fit) */}
        <div className="lg:col-span-6 text-left space-y-4">
          
          {/* Newspaper Briefing Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-extrabold uppercase tracking-widest text-slate-200">
              SPECIAL REPORT • 2026 TECH & CREATIVE HIRING MARKET
            </span>
          </motion.div>

          {/* Headline (Proportionate size for 100vh viewport fit) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black text-slate-900 tracking-tight leading-[1.12]"
          >
            210,000+ Jobs & Clients Exist Right Now.{' '}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600">
              Yet 95% of Applicants Get Auto-Rejected. Here Is Why.
            </span>
          </motion.h1>

          {/* Subtitle (Concise & High Suspense) */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-xl"
          >
            An inside look into why engineering managers, growth directors, and art leads auto-filter 98% of traditional resumes—and the single proof-of-work metric that flips the hiring odds in your favor.
          </motion.p>

          {/* Action Buttons (Clean & Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-1"
          >
            <button
              onClick={scrollToReality}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 text-white font-extrabold text-xs md:text-sm shadow-md shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Uncover The Market Report ↓</span>
            </button>

            <button
              onClick={scrollToAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-bold text-xs md:text-sm hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all duration-200 text-center cursor-pointer"
            >
              Check Profile Status
            </button>
          </motion.div>

          {/* Market Reality Data Points */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 max-w-md"
          >
            <div>
              <p className="text-lg md:text-xl font-black text-slate-900 leading-none mb-1">
                <AnimatedCounter target={98} suffix="%" />
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">ATS Auto-Rejection</p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-black text-indigo-600 leading-none mb-1">
                <AnimatedCounter target={85} suffix="%" />
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Hidden Referral Market</p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-black text-rose-600 leading-none mb-1">
                <AnimatedCounter target={6} suffix="s" />
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Avg HR Screen Time</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Prominent Large Graphic (Fills blank space completely) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 flex items-center justify-center relative"
        >
          <div className="relative group w-full flex items-center justify-center py-2">
            {/* Soft Ambient Radial Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none transform group-hover:scale-105 transition-transform duration-500" />
            
            <img
              src="/skills_hero_image.png"
              alt="NatureXpress Insider Market Briefing"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain relative z-10 drop-shadow-2xl scale-105 lg:scale-110 hover:scale-115 transition-transform duration-500"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
