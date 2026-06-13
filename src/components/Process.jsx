import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your brand, audience, and goals. I engineer a custom blueprint designed specifically for high retention and conversion.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Design & Development',
    desc: 'Crafting premium user experiences and robust architectures. Every element is engineered to ensure the journey aligns perfectly with the strategy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Execution & Optimization',
    desc: 'This is where the magic happens. Seamless animations, psychological triggers, and data-driven optimizations come together to create the WOW factor.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Delivery & Scaling',
    desc: 'You receive the final polished systems, optimized for peak performance. We review the analytics and iterate to scale your growth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

/* ── Step Card ─────────────────────────────────────────────── */
const StepCard = ({ step, isEven }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#111] border border-white/[0.08] p-6 md:p-8 rounded-3xl card-hover hover:border-[#f59e0b]/30 group"
    >
      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-[5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
        {step.num}
      </span>

      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] mb-5 group-hover:bg-[#f59e0b]/20 transition-colors duration-300">
        {step.icon}
      </div>

      <h3 className="text-white font-black text-xl mb-3 tracking-tight">{step.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      />
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────── */
const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="bg-[#050505] py-28 px-6 md:px-12 relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#f59e0b]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Our Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            How We <span className="text-gradient-orange">Get Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-lg mx-auto"
          >
            A proven framework that turns ideas into high-performing assets — every time.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2" />
          {/* Animated red fill */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#f59e0b] to-[#fbbf24] -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
          <motion.div
            className="md:hidden absolute left-5 top-0 w-[2px] bg-gradient-to-b from-[#f59e0b] to-[#fbbf24] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-start md:items-center">

                  {/* Mobile: left side dot + content */}
                  <div className="md:hidden flex items-start gap-6 pl-14 w-full">
                    {/* Dot */}
                    <div className="absolute left-[14px] w-[22px] h-[22px] rounded-full bg-[#050505] border-2 border-[#f59e0b] flex items-center justify-center z-10 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    </div>
                    <StepCard step={step} index={index} isEven={false} />
                  </div>

                  {/* Desktop: alternating */}
                  <div className="hidden md:flex w-full items-center">
                    {/* Left content */}
                    <div className={`flex-1 pr-12 ${!isEven ? 'opacity-0 pointer-events-none' : ''}`}>
                      {isEven && <StepCard step={step} index={index} isEven={false} />}
                    </div>

                    {/* Center dot */}
                    <div className="relative z-20 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-12 h-12 rounded-full bg-[#050505] border-2 border-[#f59e0b] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                      >
                        <div className="text-[#f59e0b]">
                          {step.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right content */}
                    <div className={`flex-1 pl-12 ${isEven ? 'opacity-0 pointer-events-none' : ''}`}>
                      {!isEven && <StepCard step={step} index={index} isEven={true} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

