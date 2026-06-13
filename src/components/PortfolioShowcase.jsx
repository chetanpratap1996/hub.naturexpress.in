import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── Filter Categories ──────────────────────────────────────── */
const CATEGORIES = ['All', 'Web Dev', 'Marketing', 'AI/Automation', 'YouTube'];

/* ── Project Data ──────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: 'E-Commerce Web Platform',
    category: 'Web Dev',
    label: 'Web Development',
    stat: '3× Revenue Growth',
    desc: 'End-to-end full-stack e-commerce platform with custom checkout, inventory management, and real-time analytics dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    gradient: 'from-blue-600/40 to-violet-600/40',
    accentColor: '#6366f1',
    year: '2024',
  },
  {
    id: 2,
    title: 'Viral Marketing Campaign',
    category: 'Marketing',
    label: 'Digital Marketing',
    stat: '12M+ Impressions',
    desc: 'Multi-channel paid + organic growth campaign across Meta, Google, and YouTube that scaled a D2C brand to ₹1Cr+ revenue in 90 days.',
    tags: ['Meta Ads', 'Google Ads', 'SEO', 'CRO'],
    gradient: 'from-rose-500/40 to-orange-500/40',
    accentColor: '#f43f5e',
    year: '2024',
  },
  {
    id: 3,
    title: 'AI Customer Support Bot',
    category: 'AI/Automation',
    label: 'AI Automation',
    stat: '40% Cost Reduction',
    desc: 'Custom LLM-powered support agent with product knowledge base, CRM integration, and multilingual capability deployed on WhatsApp & web.',
    tags: ['OpenAI', 'LangChain', 'Python', 'Zapier'],
    gradient: 'from-emerald-500/40 to-cyan-500/40',
    accentColor: '#10b981',
    year: '2023',
  },
  {
    id: 4,
    title: 'YouTube Channel Scaling',
    category: 'YouTube',
    label: 'YouTube Growth',
    stat: '40K+ Subscribers',
    desc: 'Full channel management — scripting, editing, thumbnail optimization, SEO, and monetization strategy that turned a zero-subscriber channel into a community asset.',
    tags: ['Video Editing', 'SEO', 'Analytics', 'Strategy'],
    gradient: 'from-pink-500/40 to-rose-500/40',
    accentColor: '#ec4899',
    year: '2023',
  },
];

/* ── Project Card ──────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/8 bg-zinc-900 card-hover hover:border-white/20 ${index === 1 ? 'md:mt-16' : ''}`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-60'}`} />

      {/* Content overlay */}
      <div className="relative z-10 aspect-video flex flex-col justify-between p-6 md:p-8">

        {/* Top: year + category */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border"
            style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: `${project.accentColor}15` }}
          >
            {project.label}
          </span>
          <span className="text-white/40 text-xs font-bold">{project.year}</span>
        </div>

        {/* Middle: stat badge (shows on hover) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-center"
        >
          <p className="text-2xl font-black text-white mb-1">{project.stat}</p>
          <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Key Result</p>
        </motion.div>

        {/* Bottom: title + desc + tags */}
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl p-4 -mx-2">
          <h3 className="text-white font-black text-xl md:text-2xl mb-2 tracking-tight">{project.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────── */
const PortfolioShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="bg-[#050505] py-24 px-6 md:px-12 relative overflow-hidden" id="portfolio">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 w-fit"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Selected Work</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Projects That <span className="text-gradient-orange">Delivered</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium max-w-xl">
                Strategy met execution. Results speak louder than promises.
              </p>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-[#f59e0b] text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;

