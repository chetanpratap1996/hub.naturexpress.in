import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

const timelineData = [
  {
    year: '2023 — Present',
    title: 'Senior Full-Stack Developer',
    company: 'Freelance & Consulting',
    type: 'Engineering',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    description:
      'Leading development of highly scalable web and mobile applications for enterprise clients. Implementing robust Node.js backends, animated React frontends, and cloud architectures on AWS.',
    tags: ['React', 'Next.js', 'Node.js', 'AWS', 'React Native'],
    achievement: '120+ Projects Shipped',
  },
  {
    year: '2021 — 2023',
    title: 'Digital Marketing Strategist',
    company: 'Tech Growth Agency',
    type: 'Marketing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    description:
      'Spearheaded data-driven campaigns managing SEO, SEM, and Meta Ads budgets of ₹50L+. Consistently outperformed industry benchmarks with 3× average ROAS for B2B and D2C brands.',
    tags: ['SEO/SEM', 'Meta Ads', 'Google Ads', 'Analytics', 'CRO'],
    achievement: '3× Average ROAS',
  },
  {
    year: '2019 — 2021',
    title: 'AI Automation Specialist',
    company: 'Innovate Solutions',
    type: 'AI & Automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    description:
      'Integrated OpenAI and LangChain pipelines into enterprise workflows, automating repetitive tasks and boosting organizational efficiency by over 40%. Built custom GPT-powered tools and Zapier flows.',
    tags: ['OpenAI', 'LangChain', 'Python', 'Zapier', 'Make.com'],
    achievement: '40% Efficiency Gain',
  },
  {
    year: '2017 — 2019',
    title: 'Content Creator & Video Editor',
    company: 'YouTube',
    type: 'Content & Growth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    description:
      'Grew multiple YouTube channels to 40K+ community members by producing cinematic video content, optimizing thumbnails and metadata, and dissecting audience retention for compounding growth.',
    tags: ['Video Editing', 'SEO', 'Thumbnails', 'Analytics', 'Scripting'],
    achievement: '40K+ Subscribers',
  },
];

/* ── Card Content ─────────────────────────────────────────── */
const CardContent = ({ item }) => (
  <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#f59e0b]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)] transition-all duration-400 group card-hover">
    {/* Header row */}
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#f59e0b] bg-[#f59e0b]/10 px-3 py-1 rounded-full border border-[#f59e0b]/20">
        {item.type}
      </span>
      <span className="text-[10px] font-black tracking-wider text-white/40 bg-white/5 px-3 py-1 rounded-full">
        {item.achievement}
      </span>
    </div>

    <h3 className="text-white font-black text-xl mb-1 group-hover:text-[#f59e0b] transition-colors duration-300 tracking-tight">
      {item.title}
    </h3>
    <p className="text-gray-500 text-sm font-bold mb-4 tracking-wide">{item.company}</p>

    <div className="w-8 h-[1px] bg-[#f59e0b]/40 mb-4 group-hover:w-16 transition-all duration-500" />

    <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.description}</p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2">
      {item.tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-black/60 text-gray-400 text-xs font-semibold rounded-full border border-white/5 hover:border-[#f59e0b]/50 hover:text-white transition-all duration-300"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* ── Timeline Card ─────────────────────────────────────────── */
const TimelineCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center gap-0 mb-0">

      {/* Desktop LEFT */}
      <div className="hidden md:flex flex-1 justify-end pr-12">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full max-w-[380px]"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Center: dot + connector */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative w-12 h-12 rounded-full bg-[#f59e0b]/10 border-2 border-[#f59e0b] flex items-center justify-center z-10 text-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.4)]"
        >
          {item.icon}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-2 text-[9px] font-black tracking-widest uppercase text-[#f59e0b] text-center whitespace-nowrap"
        >
          {item.year}
        </motion.p>
      </div>

      {/* Desktop RIGHT */}
      <div className="hidden md:flex flex-1 justify-start pl-12">
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full max-w-[380px]"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Mobile: always show below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:hidden ml-16 w-full mt-4"
      >
        <CardContent item={item} />
      </motion.div>
    </div>
  );
};

/* ── Main ─────────────────────────────────────────────────── */
const AboutTimeline = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 w-full bg-[#0a0a0a] overflow-hidden border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#f59e0b]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Career Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight"
          >
            Professional{' '}
            <span className="text-gradient-orange">Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 mt-4 max-w-xl mx-auto text-lg font-medium"
          >
            A decade of building, marketing, automating, and growing.
          </motion.p>
        </div>

        {/* Timeline track */}
        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px timeline-line" />

          <div className="flex flex-col gap-12">
            {timelineData.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>

          {/* Bottom cap */}
          <div className="hidden md:flex justify-center mt-10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ff6b6b] shadow-[0_0_20px_rgba(245,158,11,0.5)] border-4 border-[#0a0a0a]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;

