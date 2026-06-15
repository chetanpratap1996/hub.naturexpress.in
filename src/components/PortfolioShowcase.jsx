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
    statLabel: 'YoY Growth',
    desc: 'End-to-end full-stack e-commerce platform with custom checkout, inventory management, and real-time analytics dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/ecommerce_mockup.png',
    accentColor: '#6366f1',
    year: '2026',
  },
  {
    id: 2,
    title: 'Viral Marketing Campaign',
    category: 'Marketing',
    label: 'Digital Marketing',
    stat: '12M+ Views',
    statLabel: 'Organic Reach',
    desc: 'Multi-channel paid + organic growth campaign across Meta, Google, and YouTube that scaled a D2C brand to ₹1Cr+ revenue in 90 days.',
    tags: ['Meta Ads', 'Google Ads', 'SEO', 'CRO'],
    image: '/marketing_mockup.png',
    accentColor: '#f43f5e',
    year: '2026',
  },
  {
    id: 3,
    title: 'AI Customer Support Bot',
    category: 'AI/Automation',
    label: 'AI Automation',
    stat: '40% Drop',
    statLabel: 'Support Costs',
    desc: 'Custom LLM-powered support agent with product knowledge base, CRM integration, and multilingual capability deployed on WhatsApp & web.',
    tags: ['OpenAI', 'LangChain', 'Python', 'Zapier'],
    image: '/ai_mockup.png',
    accentColor: '#10b981',
    year: '2025',
  },
  {
    id: 4,
    title: 'YouTube Channel Scaling',
    category: 'YouTube',
    label: 'YouTube Growth',
    stat: '40K+ Subs',
    statLabel: 'In 6 Months',
    desc: 'Full channel management — scripting, editing, thumbnail optimization, SEO, and monetization strategy that turned a zero-subscriber channel into a community asset.',
    tags: ['Video Editing', 'SEO', 'Analytics', 'Strategy'],
    image: '/youtube_mockup.png',
    accentColor: '#ec4899',
    year: '2025',
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
      className={`group flex flex-col rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] card-hover hover:border-white/20 ${index % 2 === 1 ? 'md:mt-16' : ''}`}
    >
      {/* Top Visual Area (Mockup) */}
      <div className="relative aspect-video overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
        <motion.img 
          src={project.image} 
          alt={project.title}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Category Label Overlay */}
        <div className="absolute top-6 left-6 z-20">
           <span
            className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md"
            style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: `${project.accentColor}15` }}
          >
            {project.label}
          </span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="flex-1 flex flex-col p-6 md:p-8 relative z-20 -mt-8">
        
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-white transition-colors duration-300" style={{ textShadow: hovered ? `0 0 20px ${project.accentColor}40` : 'none' }}>
            {project.title}
          </h3>
          <span className="text-white/30 text-sm font-bold">{project.year}</span>
        </div>
        
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 flex-1">
          {project.desc}
        </p>

        {/* Metrics Block */}
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-white">{project.stat}</p>
            <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase mt-0.5">{project.statLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10" style={{ color: project.accentColor }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        {/* Tags & Action */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0,2).map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                +{project.tags.length - 2}
              </span>
            )}
          </div>

          {/* View Case Study Link */}
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: project.accentColor }}>
            <span className="hidden sm:block">View Project</span>
            <span className="sm:hidden">View</span>
            <motion.svg 
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
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
                  className={`px-4 py-2.5 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300 min-h-[40px] ${
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10"
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

