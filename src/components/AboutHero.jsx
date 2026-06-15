import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';

/* ─── Animated Counter ─── */
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ─── Floating Badge ─── */
const FloatingBadge = ({ label, icon, style, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'backOut' }}
      style={style}
      className="hidden lg:flex absolute bg-zinc-900/90 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 items-center gap-2.5 shadow-2xl z-30 hover:border-[#f59e0b]/50 transition-colors duration-300"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-white text-xs font-bold tracking-wide whitespace-nowrap">{label}</span>
    </motion.div>
  );
};

/* ─── Main Component ─── */
const AboutHero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const stats = [
    { value: 5,   suffix: '+',  label: 'Years Experience' },
    { value: 120, suffix: '+',  label: 'Projects Delivered' },
    { value: 98,  suffix: '%',  label: 'Client Satisfaction' },
    { value: 40,  suffix: 'K+', label: 'Community Reach' },
  ];

  const expertiseItems = [
    { icon: '⚡', label: 'Full-Stack Web & App Dev' },
    { icon: '📈', label: 'Digital Marketing Strategy' },
    { icon: '🤖', label: 'AI Workflow Automation' },
    { icon: '🎬', label: 'YouTube Growth Systems' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#050505] font-sans border-t border-white/[0.04]"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f59e0b]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#f59e0b]/4 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-screen">

        {/* LEFT: Image Column */}
        <motion.div style={{ y: imageY }} className="relative w-full lg:w-[420px] shrink-0 flex justify-center">

          {/* Floating badges — hidden on mobile to avoid overflow from hardcoded positions */}
          <FloatingBadge label="React & Next.js Expert" icon="⚛️" style={{ top: '-18px', left: '-20px' }}  delay={0.5} />
          <FloatingBadge label="AI Automation"          icon="🤖" style={{ top: '90px', right: '-30px' }}  delay={0.7} />
          <FloatingBadge label="YouTube Growth"         icon="🎬" style={{ bottom: '120px', left: '-35px' }} delay={0.9} />
          <FloatingBadge label="Digital Marketer"       icon="📈" style={{ bottom: '-10px', right: '-15px' }} delay={1.1} />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f59e0b]/30 to-transparent blur-3xl scale-110 opacity-60" />
            <div className="relative w-full max-w-[300px] md:max-w-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group">
              {/* Online indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-green-400 text-[10px] font-bold">Available</span>
              </div>

              {/* Image */}
              <div className="aspect-[3/4] w-full bg-zinc-900 overflow-hidden">
                <img
                  src="/chetan_profile_photo.png"
                  alt="Chetan Pratap Singh — Founder, NatureXpress Hub"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6">
                <p className="text-white font-black text-xl tracking-tight">Chetan Pratap Singh</p>
                <p className="text-[#f59e0b] text-sm font-bold tracking-widest uppercase mt-1">MBA in Entrepreneurship and Venture Development</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Content Column */}
        <motion.div style={{ y: textY }} className="flex-1 text-white">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Meet the Founder</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-8"
          >
            Building{' '}
            <span className="relative inline-block">
              <span className="text-[#f59e0b]">Digital</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,6 Q50,0 100,6 Q150,12 200,6" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.5"/>
              </svg>
            </span>
            {' '}Empires
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10"
          >
            <strong className="text-white font-black">NatureXpress Hub</strong> is led by{' '}
            <strong className="text-white font-black">Chetan Pratap Singh</strong> — a versatile digital architect who bridges complex engineering, data-driven marketing, and AI-powered automation. One expert. Every angle covered.
          </motion.p>

          {/* Expertise tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {expertiseItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-gray-300 hover:border-[#f59e0b]/50 hover:text-white hover:bg-[#f59e0b]/5 transition-all duration-300 cursor-default"
              >
                <span>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:border-[#f59e0b]/30 hover:bg-[#f59e0b]/5 transition-all duration-300 group card-hover"
              >
                <p className="text-4xl font-black text-white tracking-tight group-hover:text-[#f59e0b] transition-colors duration-300">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 fill-[#0a0a0a]">
          <path d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
};

export default AboutHero;

