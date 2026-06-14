import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── SVG Icons ─────────────────────────────────────────────────── */
const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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
const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const SERVICE_ICONS = [IconWeb, IconMarketing, IconAI, IconYouTube];

/* ── Service Data ─────────────────────────────────────────────── */
const services = [
  {
    id: '01',
    title: 'Web & App Development',
    tagline: 'Engineering that scales.',
    description:
      'I architect and build blazing-fast, pixel-perfect web and mobile applications — from landing pages that convert to full-stack SaaS platforms. Clean code, modular architecture, and zero compromise on performance.',
    capabilities: [
      'React / Next.js SPAs & SSR',
      'Node.js REST & GraphQL APIs',
      'React Native cross-platform apps',
      'CI/CD & Cloud Deployment (AWS, Vercel)',
      'Database architecture (SQL + NoSQL)',
    ],
    metric: { value: '120+', label: 'Projects Shipped' },
  },
  {
    id: '02',
    title: 'Digital Marketing',
    tagline: 'Growth that compounds.',
    description:
      'Data-first marketing strategies that move the needle. I manage end-to-end campaigns across paid, organic, and social channels — engineered to maximize ROI and build lasting brand authority.',
    capabilities: [
      'SEO / SEM Strategy & Execution',
      'Meta & Google Ads Management',
      'Conversion Rate Optimization',
      'Email Automation & Drip Sequences',
      'Analytics & Performance Dashboards',
    ],
    metric: { value: '3×', label: 'Average ROAS' },
  },
  {
    id: '03',
    title: 'AI Automation',
    tagline: 'Work smarter, infinitely.',
    description:
      'I integrate cutting-edge AI to eliminate bottlenecks and automate complex workflows. From custom GPT assistants to multi-step pipelines, I bring AI capabilities to your team without the overhead.',
    capabilities: [
      'Custom GPT & LLM Integration',
      'LangChain Agentic Pipelines',
      'Zapier / Make.com Orchestration',
      'AI-powered Content Workflows',
      'Data Extraction & Processing',
    ],
    metric: { value: '40%', label: 'Efficiency Gains' },
  },
  {
    id: '04',
    title: 'YouTube Growth',
    tagline: 'Audience as an asset.',
    description:
      'I manage and grow YouTube channels with a systems approach — from content strategy and scripting to thumbnail psychology, algorithm optimization, and community monetization.',
    capabilities: [
      'Channel Strategy & Positioning',
      'Thumbnail & Title Optimization',
      'SEO-first Script Writing',
      'Analytics & Retention Analysis',
      'Monetization & Sponsorship Strategy',
    ],
    metric: { value: '40K+', label: 'Community Built' },
  },
];

/* ── Capability Item ─────────────────────────────────────────── */
const Capability = ({ text, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35, delay: index * 0.06 }}
    className="flex items-center gap-3 text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-200"
  >
    <span
      className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full shrink-0"
      style={{ boxShadow: '0 0 6px rgba(245,158,11,0.8)' }}
    />
    {text}
  </motion.li>
);

/* ── Service Card ─────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const Icon = SERVICE_ICONS[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-hover relative rounded-3xl border border-white/8 overflow-hidden bg-[#0d0d0d] group cursor-default hover:border-[#f59e0b]/40"
    >
      {/* Hover glow bg */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/8 via-transparent to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : '30%' }}
        transition={{ duration: 0.5 }}
      />

      <div className="p-8 md:p-10 h-full flex flex-col">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span className="text-[11px] font-black tracking-[0.3em] text-gray-600 uppercase">{service.id}</span>
          <div className="text-right">
            <p className="text-2xl font-black text-[#f59e0b]">{service.metric.value}</p>
            <p className="text-[10px] text-gray-600 font-bold tracking-wider uppercase">{service.metric.label}</p>
          </div>
        </div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] mb-6 group-hover:bg-[#f59e0b]/20 group-hover:scale-110 transition-all duration-300">
          <Icon />
        </div>

        {/* Title + Tagline */}
        <h3 className="text-white font-black text-2xl md:text-3xl mb-2 tracking-tight">{service.title}</h3>
        <p className="text-[#f59e0b] text-sm font-bold tracking-widest uppercase mb-4">{service.tagline}</p>

        {/* Divider */}
        <div className="w-12 h-px bg-white/10 mb-6 group-hover:w-24 group-hover:bg-[#f59e0b]/50 transition-all duration-500" />

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{service.description}</p>

        {/* Capabilities */}
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 mb-4">Capabilities</p>
          <ul className="space-y-2.5 group">
            {service.capabilities.map((cap, i) => (
              <Capability key={i} text={cap} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Component ───────────────────────────────────────────── */
const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-[#050505] py-32 px-6 md:px-12 w-full overflow-hidden font-sans"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
              <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">What We Offer</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
            >
              Services That{' '}<br />
              <span className="text-gradient-orange">Drive Results</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed lg:text-right"
          >
            A comprehensive suite of digital services to build, market, automate, and scale your brand — from zero to enterprise.
          </motion.p>
        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#f59e0b]/10 via-[#f59e0b]/5 to-transparent border border-[#f59e0b]/20 rounded-3xl px-10 py-10"
        >
          <div>
            <p className="text-white font-black text-2xl md:text-3xl">Ready to launch something great?</p>
            <p className="text-gray-500 mt-2 font-medium">Let's discuss your project and craft the right growth strategy together.</p>
          </div>
          <div className="flex gap-4 shrink-0 flex-wrap">
            <a
              href="#contact"
              className="px-8 py-4 bg-[#f59e0b] text-white font-black rounded-full hover:scale-105 hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] transition-all duration-300 tracking-wide text-sm"
            >
              Get in Touch →
            </a>
            <a
              href={`https://wa.me/918077170715?text=${encodeURIComponent("Hi Chetan, I found NatureXpress Hub and I'd like to discuss a project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm"
            >
              WhatsApp Chetan
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

