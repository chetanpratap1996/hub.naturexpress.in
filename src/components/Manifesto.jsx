import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useInView, animate } from 'framer-motion';

// ─── Marquee strip ─────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Web Development', '✦', 'App Development', '✦', 'Digital Marketing',
  '✦', 'AI Automation', '✦', 'Social Media', '✦', 'YouTube Growth',
  '✦', 'Video Editing', '✦', 'UI/UX Design', '✦', 'SEO Strategy',
];

const Marquee = ({ reverse = false, speed = 30 }) => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden whitespace-nowrap py-3 border-y border-white/[0.07]">
      <motion.div
        className="inline-flex gap-8 items-center"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-[11px] font-black tracking-[0.3em] uppercase flex-shrink-0 ${
              item === '✦' ? 'text-[#f59e0b]' : 'text-zinc-400'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Animated counter ─────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return controls.stop;
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── SVG Icon set for service cards ───────────────────────────────────────────
const SVC_ICONS = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/>
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
};

// ─── Service pill card ─────────────────────────────────────────────────────────
const ServiceCard = ({ iconKey, title, desc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950 p-6 hover:border-[#f59e0b]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]"
    >
      {/* hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />

      {/* SVG Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-[#f59e0b] group-hover:bg-[#f59e0b]/10 group-hover:border-[#f59e0b]/30 transition-all duration-500 group-hover:scale-110">
        {SVC_ICONS[iconKey]}
      </div>

      <h3 className="text-white font-black text-base mb-2 tracking-tight">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed font-medium">{desc}</p>

      {/* Bottom line accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#f59e0b]"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

// ─── Big kinetic statement row ─────────────────────────────────────────────────
const Statement = ({ text, highlight, align = 'left', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${align === 'right' ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(2.6rem,7.5vw,7rem)] font-black leading-[0.92] tracking-tighter text-white"
      >
        {text}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
            {highlight}
          </span>
        )}
      </motion.div>
    </div>
  );
};

// ─── Services data (now with iconKey) ─────────────────────────────────────────
const SERVICES = [
  { iconKey: 'web',       title: 'Web Development',  desc: 'Fast, scalable websites that convert visitors into customers — built with modern stacks.' },
  { iconKey: 'app',       title: 'App Development',   desc: 'Cross-platform mobile apps that look native, feel premium, and work flawlessly.' },
  { iconKey: 'marketing', title: 'Digital Marketing', desc: 'Data-driven campaigns that grow your audience, boost clicks, and multiply revenue.' },
  { iconKey: 'ai',        title: 'AI & Automation',   desc: 'Smart systems that run your business 24/7 — workflows, chatbots, and AI pipelines.' },
  { iconKey: 'social',    title: 'Social Media',      desc: 'Content strategy, brand identity, and engagement systems that build loyal communities.' },
  { iconKey: 'youtube',   title: 'YouTube Growth',    desc: 'Channel optimization, thumbnails, scripts & SEO to 10x your subscribers and views.' },
  { iconKey: 'video',     title: 'Video Editing',     desc: 'Cinematic edits, reels, and brand videos that stop the scroll and drive action.' },
  { iconKey: 'seo',       title: 'SEO Strategy',      desc: 'Rank higher, get found faster. Technical and content SEO that delivers long-term traffic.' },
];

// ─── STATS — unified numbers ───────────────────────────────────────────────────
const STATS = [
  { value: 5,  suffix: '+',  label: 'Years Experience' },
  { value: 50, suffix: '+',  label: 'Projects Shipped' },
  { value: 10, suffix: 'M+', label: 'Views Generated' },
  { value: 8,  suffix: '',   label: 'Service Verticals' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
const Manifesto = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative bg-black w-full overflow-hidden border-t border-white/[0.06]"
    >
      {/* Scroll progress bar — scoped to this section */}
      <motion.div
        className="sticky top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] origin-left z-[49] pointer-events-none -mb-[2px]"
        style={{ scaleX }}
      />

      {/* ── PART 1: KINETIC OPENER ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-12">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-12"
        >
          <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.35em] text-[#f59e0b] uppercase">What I Do</span>
        </motion.div>

        {/* Kinetic headline stack */}
        <div className="space-y-1 mb-16">
          <Statement text="I don't just" highlight="build —" delay={0} />
          <Statement text="I" highlight="engineer results." align="right" delay={0.08} />
          <Statement text="for brands that" highlight="refuse" delay={0.16} />
          <Statement text="to be" highlight="average." align="right" delay={0.24} />
        </div>

        {/* Body text + stats */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
          >
            I'm <span className="text-white font-bold">Chetan Pratap Singh</span> — a full-stack digital weapon.
            From writing code to cutting videos, from running ads to deploying AI agents,
            I cover every angle of your brand's digital presence — so you don't have to stitch
            together five different freelancers.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 flex-shrink-0">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex flex-col"
              >
                <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-none tracking-tighter">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] font-bold tracking-[0.25em] text-zinc-500 uppercase mt-2">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────────────── */}
      <div className="my-10">
        <Marquee speed={35} />
        <Marquee reverse speed={28} />
      </div>

      {/* ── PART 2: SERVICES GRID ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#f59e0b]" />
              <span className="text-[11px] font-black tracking-[0.35em] text-[#f59e0b] uppercase">Services</span>
            </span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-white leading-tight">
              Everything you need.<br />
              <span className="text-zinc-500">One expert.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm font-medium max-w-xs leading-relaxed">
            Stop juggling freelancers. I handle the full stack — strategy, execution, and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>

      {/* ── PART 3: MANIFESTO STATEMENTS ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        {[
          {
            num: '01',
            eyebrow: 'My Belief',
            big: 'Attention is earned\nin the first',
            red: '3 seconds.',
            body: 'Every frame I cut, every ad I write, every line of code I ship is designed to hook — fast. In a world drowning in content, boring is a death sentence.',
            align: 'left',
          },
          {
            num: '02',
            eyebrow: 'My Process',
            big: 'Strategy first.',
            red: 'Execution always.',
            body: "I don't guess. I research your audience, map the funnel, and build systems that work together — marketing, automation, content — all aligned to one goal: your growth.",
            align: 'right',
          },
          {
            num: '03',
            eyebrow: 'My Standard',
            big: 'Deadlines held.',
            red: 'Quality delivered.',
            body: "Whether it's a landing page going live at midnight or a video out by morning, you get both — on time and beyond expectation. Always.",
            align: 'left',
          },
        ].map((item, i) => (
          <FullBleedStatement key={i} {...item} />
        ))}
      </div>

      {/* ── PART 4: CLOSING CTA ─────────────────────────────────────────────── */}
      <ClosingSection />
    </section>
  );
};

// ─── Full-bleed statement block ────────────────────────────────────────────────
const FullBleedStatement = ({ num, eyebrow, big, red, body, align }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isRight = align === 'right';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-white/[0.06] flex flex-col ${isRight ? 'md:items-end md:text-right' : 'md:items-start'}`}
    >
      {/* Big watermark number */}
      <span className="absolute top-1/2 -translate-y-1/2 right-8 text-[5rem] sm:text-[8rem] md:text-[14rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        {num}
      </span>

      <motion.span
        initial={{ opacity: 0, x: isRight ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 mb-6"
      >
        {!isRight && <span className="w-5 h-[2px] bg-[#f59e0b]" />}
        <span className="text-[11px] font-black tracking-[0.35em] text-[#f59e0b] uppercase">{eyebrow}</span>
        {isRight && <span className="w-5 h-[2px] bg-[#f59e0b]" />}
      </motion.span>

      <div className="overflow-hidden mb-2 max-w-4xl">
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,7vw,6rem)] font-black tracking-tighter text-white leading-[0.95] whitespace-pre-line"
        >
          {big}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">{red}</span>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed max-w-xl mt-4"
      >
        {body}
      </motion.p>
    </motion.div>
  );
};

// ─── Closing CTA section ───────────────────────────────────────────────────────
const ClosingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <div ref={ref} className="relative overflow-hidden px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#f59e0b]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#f59e0b]/5 blur-[100px] pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <span className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.35em] text-[#f59e0b] uppercase">Ready?</span>
        </span>

        <h2 className="text-[clamp(3rem,10vw,8.5rem)] font-black tracking-tighter text-white leading-[0.9] mb-8">
          Let's build<br />
          something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
            legendary.
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245,158,11,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#f59e0b] text-white font-black text-sm tracking-widest uppercase rounded-full shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-300"
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-9 py-4 border border-white/15 text-white font-black text-sm tracking-widest uppercase rounded-full hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            View Work
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Manifesto;

