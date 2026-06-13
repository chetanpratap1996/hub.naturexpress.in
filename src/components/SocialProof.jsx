import { useEffect, useState, useRef } from "react";
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let animationFrame;
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(end * easeOut));
      if (percentage < 1) animationFrame = requestAnimationFrame(updateCount);
    };
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <div ref={ref} className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums">
      {prefix}{count}{suffix}
    </div>
  );
};

const SocialProof = () => {
  const stats = [
    { number: 10, suffix: 'M+', label: 'Views Generated', desc: 'Across all platforms' },
    { number: 50,  suffix: '+',  label: 'Brands Scaled',   desc: 'From startups to enterprises' },
    { number: 98,  suffix: '%',  label: 'Client Retention', desc: 'Long-term partnerships' },
    { number: 5,   suffix: 'Yrs', label: 'Digital Mastery', desc: 'Building & growing brands' },
  ];

  return (
    <section className="bg-black py-24 border-y border-zinc-900/80 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-black tracking-[0.4em] text-[#f59e0b] uppercase mb-4">By the Numbers</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Results that <span className="text-gradient-orange">speak for themselves</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center p-6 md:p-8 text-center cursor-default group
                ${index < 3 ? 'md:border-r md:border-white/[0.06]' : ''}`}
            >
              <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              <div className="mt-3">
                <p className="text-[#f59e0b] font-black text-sm uppercase tracking-widest drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-600 text-xs font-medium">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

