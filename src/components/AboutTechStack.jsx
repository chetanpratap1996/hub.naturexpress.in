import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

/* ─── Skill Tag ─── */
const SkillTag = ({ name, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="relative group cursor-default"
    >
      <div className="px-4 py-2.5 bg-black/60 border border-white/[0.08] rounded-xl text-sm font-semibold text-gray-400 flex items-center gap-2.5 hover:border-[#f59e0b]/60 hover:text-white hover:-translate-y-0.5 hover:bg-[#f59e0b]/8 hover:shadow-[0_8px_20px_rgba(245,158,11,0.15)] transition-all duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] opacity-60 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 6px rgba(245,158,11,0.6)' }} />
        {name}
      </div>
    </motion.div>
  );
};

/* ─── Category Card ─── */
const CategoryCard = ({ icon, title, skills, gradient, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-8 overflow-hidden hover:border-[#f59e0b]/30 transition-all duration-500 group card-hover"
    >
      {/* Corner gradient accent */}
      <div className={`absolute top-0 right-0 w-40 h-40 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full blur-2xl`} />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#f59e0b]/20 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>

      <h3 className="text-white font-black text-xl mb-2 tracking-tight">{title}</h3>
      <div className="w-10 h-0.5 bg-[#f59e0b] rounded-full mb-6 group-hover:w-20 transition-all duration-500" />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <SkillTag key={i} name={skill} delay={delay + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── SVG Icons ─── */
const IconFrontend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);
const IconMarketing = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
    <circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/>
  </svg>
);

/* ─── Marquee (using CSS animation from index.css) ─── */
const MarqueeStrip = () => {
  const items = [
    { name: 'React.js', domain: 'reactjs.org' },
    { name: 'Next.js', domain: 'nextjs.org' },
    { name: 'Node.js', domain: 'nodejs.org' },
    { name: 'MongoDB', domain: 'mongodb.com' },
    { name: 'PostgreSQL', domain: 'postgresql.org' },
    { name: 'AWS', domain: 'aws.amazon.com' },
    { name: 'Python', domain: 'python.org' },
    { name: 'OpenAI', domain: 'openai.com' },
    { name: 'LangChain', domain: 'langchain.com' },
    { name: 'Tailwind CSS', domain: 'tailwindcss.com' },
    { name: 'Framer', domain: 'framer.com' },
    { name: 'TypeScript', domain: 'typescriptlang.org' },
    { name: 'Docker', domain: 'docker.com' },
    { name: 'Firebase', domain: 'firebase.google.com' },
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-6 mb-16 border-y border-white/[0.05]">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div className="flex gap-6 whitespace-nowrap marquee-left">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm font-bold text-gray-400 shrink-0 hover:border-[#f59e0b]/40 hover:text-white transition-colors duration-300 cursor-default group"
          >
            <img 
              src={`https://logo.clearbit.com/${item.domain}`} 
              alt={item.name} 
              className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const AboutTechStack = () => {
  const categories = [
    {
      icon: <IconFrontend />,
      title: 'Frontend Engineering',
      gradient: 'bg-blue-500/20',
      delay: 0.1,
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux', 'TypeScript', 'Vite'],
    },
    {
      icon: <IconCloud />,
      title: 'Backend & Cloud',
      gradient: 'bg-green-500/20',
      delay: 0.2,
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Firebase', 'Docker'],
    },
    {
      icon: <IconMarketing />,
      title: 'Digital Marketing',
      gradient: 'bg-yellow-500/20',
      delay: 0.3,
      skills: ['SEO / SEM', 'Google Analytics', 'Meta Ads', 'Email Marketing', 'CRO', 'A/B Testing'],
    },
    {
      icon: <IconAI />,
      title: 'AI & Automation',
      gradient: 'bg-purple-500/20',
      delay: 0.4,
      skills: ['OpenAI API', 'LangChain', 'Zapier', 'Make.com', 'Python Scripting', 'Custom GPTs'],
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 w-full bg-[#050505] border-t border-white/[0.04] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Tech Stack</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4"
          >
            Enterprise{' '}
            <span className="text-gradient-orange">Architecture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-lg font-medium"
          >
            Battle-tested tools and frameworks powering real-world, production-grade systems.
          </motion.p>
        </div>

        {/* Marquee */}
        <MarqueeStrip />

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-3xl border border-[#f59e0b]/20 bg-gradient-to-br from-[#f59e0b]/8 to-transparent px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-black text-xl">Want to see this stack in action?</p>
            <p className="text-gray-500 mt-1 text-sm font-medium">Explore my portfolio or reach out to discuss your project.</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-8 py-3.5 bg-[#f59e0b] text-white font-black rounded-full hover:scale-105 hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all duration-300 tracking-wide"
          >
            Start a Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTechStack;

