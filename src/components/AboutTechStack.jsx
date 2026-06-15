import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

/* ─── Skill Tag ─── */
const SkillTag = ({ skill, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="relative group cursor-default"
    >
      <div className="px-4 py-2.5 bg-[#050505]/80 border border-white/[0.05] rounded-xl text-sm font-medium text-gray-400 flex items-center gap-3 hover:border-[#f59e0b]/40 hover:text-white hover:-translate-y-0.5 hover:bg-[#f59e0b]/10 hover:shadow-[0_8px_20px_rgba(245,158,11,0.1)] transition-all duration-300 backdrop-blur-md">
        {skill.domain && (
          <div className="relative flex items-center justify-center w-5 h-5">
            <img 
              src={`https://icon.horse/icon/${skill.domain}`} 
              alt={skill.name} 
              loading="lazy"
              className={`w-5 h-5 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 rounded-sm drop-shadow-md ${skill.invert ? 'invert brightness-0 dark:brightness-100' : ''}`}
              onError={(e) => { 
                e.target.style.display = 'none'; 
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback dot if image fails to load */}
            <span className="hidden w-2 h-2 rounded-full bg-[#f59e0b]/40 group-hover:bg-[#f59e0b] transition-colors absolute" />
          </div>
        )}
        <span className="tracking-wide font-semibold">{skill.name}</span>
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
      className="relative bg-[#0a0a0a]/80 border border-white/[0.05] rounded-3xl p-8 overflow-hidden hover:border-[#f59e0b]/20 transition-all duration-500 group card-hover backdrop-blur-xl"
    >
      {/* Corner gradient accent */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-[80px] -z-10`} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#f59e0b]/5 border border-[#f59e0b]/10 flex items-center justify-center text-gray-400 group-hover:bg-[#f59e0b]/10 group-hover:text-[#f59e0b] group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-500">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-black text-2xl tracking-tight">{title}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#f59e0b]/60 to-transparent rounded-full mt-3 group-hover:w-full transition-all duration-700" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <SkillTag key={i} skill={skill} delay={delay + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── SVG Icons ─── */
const IconFrontend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);
const IconDevOps = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/>
  </svg>
);

/* ─── Marquee (using CSS animation from index.css) ─── */
const MarqueeStrip = () => {
  const items = [
    { name: 'React', domain: 'reactjs.org' },
    { name: 'Next.js', domain: 'nextjs.org' },
    { name: 'Node.js', domain: 'nodejs.org' },
    { name: 'AWS', domain: 'aws.amazon.com' },
    { name: 'Docker', domain: 'docker.com' },
    { name: 'PostgreSQL', domain: 'postgresql.org' },
    { name: 'MongoDB', domain: 'mongodb.com' },
    { name: 'Redis', domain: 'redis.io' },
    { name: 'TypeScript', domain: 'typescriptlang.org' },
    { name: 'Figma', domain: 'figma.com' },
    { name: 'Vercel', domain: 'vercel.com' },
    { name: 'OpenAI', domain: 'openai.com' },
    { name: 'Tailwind', domain: 'tailwindcss.com' },
    { name: 'GraphQL', domain: 'graphql.org' }
  ];
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-10 border-y border-white/[0.03] bg-gradient-to-r from-transparent via-white/[0.01] to-transparent">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div className="flex gap-12 whitespace-nowrap marquee-left">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-default"
          >
            <img 
              src={`https://icon.horse/icon/${item.domain}`} 
              alt={item.name} 
              loading="lazy"
              className={`w-7 h-7 object-contain drop-shadow-md ${item.invert ? 'invert brightness-0 dark:brightness-100' : ''}`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-xl font-bold text-white/90 tracking-wide">{item.name}</span>
          </div>
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
      title: 'Frontend Architecture',
      gradient: 'bg-blue-500/20',
      delay: 0.1,
      skills: [
        { name: 'React', domain: 'reactjs.org' },
        { name: 'Next.js', domain: 'nextjs.org' },
        { name: 'TypeScript', domain: 'typescriptlang.org' },
        { name: 'Tailwind CSS', domain: 'tailwindcss.com' },
        { name: 'Framer Motion', domain: 'framer.com', invert: true },
        { name: 'Redux', domain: 'redux.js.org' },
        { name: 'Vite', domain: 'vitejs.dev' }
      ],
    },
    {
      icon: <IconCloud />,
      title: 'Cloud & Infrastructure',
      gradient: 'bg-green-500/20',
      delay: 0.2,
      skills: [
        { name: 'Node.js', domain: 'nodejs.org' },
        { name: 'AWS', domain: 'aws.amazon.com' },
        { name: 'Docker', domain: 'docker.com' },
        { name: 'Kubernetes', domain: 'kubernetes.io' },
        { name: 'PostgreSQL', domain: 'postgresql.org' },
        { name: 'MongoDB', domain: 'mongodb.com' },
        { name: 'Redis', domain: 'redis.io' }
      ],
    },
    {
      icon: <IconDevOps />,
      title: 'DevOps & Tooling',
      gradient: 'bg-yellow-500/20',
      delay: 0.3,
      skills: [
        { name: 'GitHub Actions', domain: 'github.com' },
        { name: 'Vercel', domain: 'vercel.com' },
        { name: 'Jest', domain: 'jestjs.io' },
        { name: 'Cypress', domain: 'cypress.io' },
        { name: 'Jira', domain: 'atlassian.com' },
        { name: 'Figma', domain: 'figma.com' }
      ],
    },
    {
      icon: <IconAI />,
      title: 'AI & Data Integration',
      gradient: 'bg-purple-500/20',
      delay: 0.4,
      skills: [
        { name: 'OpenAI API', domain: 'openai.com' },
        { name: 'Python', domain: 'python.org' },
        { name: 'LangChain', domain: 'langchain.com' },
        { name: 'TensorFlow', domain: 'tensorflow.org' },
        { name: 'Zapier', domain: 'zapier.com' },
        { name: 'Make', domain: 'make.com' }
      ],
    },
  ];

  return (
    <section className="relative py-32 px-6 md:px-12 w-full bg-[#050505] border-t border-white/[0.02] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#f59e0b]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full px-5 py-2.5 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Core Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6"
          >
            Enterprise{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ea580c]">
              Architecture
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            Engineered with battle-tested technologies and scalable frameworks to deliver robust, high-performance digital ecosystems.
          </motion.p>
        </div>

        {/* Marquee */}
        <div className="mb-24">
          <MarqueeStrip />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          className="mt-24 relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-[#f59e0b]/30 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/[0.03] rounded-full blur-[120px] group-hover:bg-[#f59e0b]/[0.08] transition-colors duration-700 pointer-events-none -z-10" />
          
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-4">Looking to scale your infrastructure?</h3>
            <p className="text-gray-400 text-lg md:text-xl">Let's discuss how we can architect a robust foundation for your next ambitious project.</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-10 py-5 bg-white text-black font-black text-lg rounded-full hover:scale-105 hover:bg-[#f59e0b] hover:text-white hover:shadow-[0_10px_40px_rgba(245,158,11,0.3)] transition-all duration-300 flex items-center gap-3 group/btn"
          >
            Initiate Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTechStack;

