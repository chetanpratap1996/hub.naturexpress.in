import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProofGallery — Light SaaS Style Live Production Proof Showcase
 */

const projects = [
  {
    id: 'doctor',
    title: 'Doctor Consultation Hub',
    category: 'web',
    url: 'https://doctor.naturexpress.in/',
    tag: 'Healthcare Tech',
    badge: 'Live Platform',
    metrics: 'Doctor Booking & Patient Records',
    stack: ['React', 'Node.js', 'Tailwind CSS', 'REST API'],
    description: 'Full-scale medical consultation & doctor booking platform with secure backend workflows. Engineered alongside our active software team.',
    proofHighlight: 'Built with NatureXpress IT Team',
  },
  {
    id: 'eudr',
    title: 'EUDR Traceability Platform',
    category: 'web',
    url: 'https://eudr.naturexpress.in/',
    tag: 'Enterprise SaaS',
    badge: 'EU Compliance',
    metrics: 'Global Deforestation Supply Chain Verification',
    stack: ['Full-Stack React', 'Geospatial Data', 'AI Verification'],
    description: 'Enterprise-grade supply chain tracking for EU deforestation regulation compliance and data verification.',
    proofHighlight: 'Enterprise architecture & API integration',
  },
  {
    id: 'kisan',
    title: 'Kisan Agri-Tech Marketplace',
    category: 'web',
    url: 'https://kisan.naturexpress.in/',
    tag: 'Agri-Tech',
    badge: 'Live Marketplace',
    metrics: 'Connecting 10,000+ Farmers to Direct Buyers',
    stack: ['React', 'Mobile First UI', 'Payment Gateway', 'Cloud'],
    description: 'Agricultural tech platform empowering farmers with advisory services, direct buyer pricing, and digital commerce.',
    proofHighlight: 'Real-world impact project',
  },
  {
    id: 'growth_funnel',
    title: 'D2C Brand Performance Growth Funnel',
    category: 'marketing',
    url: null,
    tag: 'Digital Growth & Ads',
    badge: '₹12L+ Managed',
    metrics: '4.2x ROAS across Meta & Google Ads',
    stack: ['Meta Ads Manager', 'Google Ads', 'Funnel Copy', 'GA4'],
    description: 'Complete performance marketing campaign setup including ad creatives, high-converting lander copy, and retargeting funnels.',
    proofHighlight: 'Executed by Marketing Head',
  },
  {
    id: 'ui_brand',
    title: 'FinTech App & Social Media Creative System',
    category: 'design',
    url: null,
    tag: 'Graphic & UI/UX',
    badge: 'Viral System',
    metrics: '50+ Ad Creatives & Figma UI Design Tokens',
    stack: ['Figma', 'Photoshop', 'Carousel Design', 'Brand Identity'],
    description: 'Viral Instagram carousels, YouTube thumbnails, client brand identity guidelines, and multi-screen Figma UI design systems.',
    proofHighlight: 'Created with Social Media Design Team',
  },
];

const FILTERS = [
  { id: 'all', label: 'All Live Proofs (5)' },
  { id: 'web', label: '💻 Web & App Dev' },
  { id: 'marketing', label: '📈 Growth & Ads' },
  { id: 'design', label: '🎨 Graphic & UI/UX' },
];

const ProofGallery = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="proof" className="py-24 px-6 md:px-10 bg-white relative overflow-hidden border-t border-slate-200/80">
      
      {/* Marquee Ticker Bar */}
      <div className="relative w-full overflow-hidden border-y border-slate-200/90 bg-slate-50 py-3 mb-16">
        <div
          className="flex items-center gap-12 whitespace-nowrap text-xs font-mono text-slate-600"
          style={{ animation: 'marqueeLeft 30s linear infinite', display: 'flex', width: 'max-content' }}
        >
          {[...Array(3)].flatMap(() => [
            { url: 'doctor.naturexpress.in', label: 'Live Doctor Consultation Platform' },
            { url: 'eudr.naturexpress.in', label: 'EU Deforestation Compliance System' },
            { url: 'kisan.naturexpress.in', label: 'Agri-Tech Farmer Marketplace' },
            { url: 'hub.naturexpress.in', label: 'Skills Hub Platform' },
          ]).map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 pr-12">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <a
                href={`https://${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                {item.url}
              </a>
              <span className="text-slate-500">— {item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            🔥 Live Production Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Proof Over Promises.{' '}
            <span className="text-indigo-600 block mt-1">Inspect Real Live Apps & Campaigns.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            No fake tutorial clones. Inspect live production platforms deployed under the NatureXpress domain network.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {FILTERS.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                filter === btn.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                      {project.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 mb-4 font-medium">
                    <span className="font-extrabold text-amber-800 block mb-0.5">⚡ Outcome:</span>
                    <span>{project.proofHighlight}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">{project.metrics}</span>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      <span>Inspect ↗</span>
                    </a>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">Verified Case Study</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};

export default ProofGallery;
