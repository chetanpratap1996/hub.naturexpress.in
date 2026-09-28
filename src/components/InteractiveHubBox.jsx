import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InteractiveHubBox — Light SaaS Style Tabbed Sandbox
 */

const tabs = [
  {
    id: 'code',
    icon: '💻',
    label: 'Web Dev Sprint',
    headline: 'Write Real Production Code. Daily.',
    sub: 'Alongside our IT & Engineering Team',
    color: '#4f46e5',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    content: (
      <div className="font-mono text-xs space-y-1.5 text-left bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
        <div className="text-slate-500">// Sprint #14 — doctor.naturexpress.in</div>
        <div className="text-slate-400"><span className="text-violet-400">import</span> {'{ useState, useEffect }'} <span className="text-violet-400">from</span> <span className="text-emerald-400">'react'</span>;</div>
        <div className="text-slate-400"><span className="text-violet-400">import</span> {'{ supabase }'} <span className="text-violet-400">from</span> <span className="text-emerald-400">'../lib/supabase'</span>;</div>
        <div className="mt-2" />
        <div className="text-slate-400"><span className="text-violet-400">export default function</span> <span className="text-sky-400">DoctorDashboard</span>() {'{'}</div>
        <div className="text-slate-400 pl-4"><span className="text-violet-400">const</span> [patients, setPatients] = <span className="text-sky-400">useState</span>([]);</div>
        <div className="text-slate-400 pl-4 text-emerald-400/90">// ✓ Real-time patient queue — pushed to prod 4 min ago</div>
        <div className="text-slate-400 pl-4"><span className="text-violet-400">return</span> &lt;<span className="text-amber-400">PatientList</span> data={'{patients}'} /&gt;</div>
        <div className="text-slate-400">{'}'}</div>
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-2 text-slate-500">
          <span className="text-indigo-400">$</span>
          <span>vercel deploy <span className="text-emerald-400">✓ Live on doctor.naturexpress.in</span></span>
          <span className="animate-pulse">▊</span>
        </div>
      </div>
    ),
  },
  {
    id: 'ads',
    icon: '📈',
    label: 'Marketing Sprint',
    headline: 'Manage Real Ad Campaigns. Daily.',
    sub: 'Alongside our Marketing Head',
    color: '#d97706',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    content: (
      <div className="text-xs space-y-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-slate-800 font-bold">Meta Ads Campaign #A12</span>
          <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">4.2x ROAS ✓</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-slate-800 font-bold">Google Search — Kisan Brand</span>
          <span className="text-amber-800 font-black bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">₹18.50 CPA</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-slate-800 font-bold">Retargeting Funnel — Week 3</span>
          <span className="text-indigo-700 font-black bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">38% CVR ↑</span>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80">
          <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wide mb-1">Marketing Head's Feedback</p>
          <p className="text-xs text-slate-700 font-medium">"Great audience segmentation. Let's A/B test headline hooks next."</p>
        </div>
      </div>
    ),
  },
  {
    id: 'design',
    icon: '🎨',
    label: 'Design Sprint',
    headline: 'Create Brand Creatives. Daily.',
    sub: 'Alongside our Social Media Design Team',
    color: '#7e22ce',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    content: (
      <div className="text-xs space-y-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          {['Instagram Carousel', 'YouTube Thumbnail', 'Brand Guidelines'].map((label, i) => (
            <div key={i} className="aspect-square rounded-xl bg-purple-50/70 border border-purple-200/70 flex items-center justify-center p-2 text-center">
              <div>
                <div className="text-2xl mb-1">{['📱', '▶️', '✨'][i]}</div>
                <p className="text-[10px] text-purple-900 font-bold leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <span className="text-slate-800 font-bold">Figma UI System v2.0</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Approved ✓</span>
        </div>
      </div>
    ),
  },
  {
    id: 'career',
    icon: '👔',
    label: 'Career Sprint',
    headline: 'Your Resume, Built by HR.',
    sub: 'Alongside our HR & Talent Lead',
    color: '#047857',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    content: (
      <div className="text-xs space-y-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">ATS Resume Compatibility</span>
            <span className="font-black text-emerald-700 text-sm">87/100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '87%' }} />
          </div>
        </div>
        <div className="space-y-1.5 font-medium text-slate-700">
          {['Keywords matched: React, Node.js, REST API', 'LinkedIn profile optimized for recruiter search', '1-on-1 Mock Interview: Scheduled for Friday'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const InteractiveHubBox = ({ onOpenCheckout }) => {
  const [activeTab, setActiveTab] = useState('code');
  const tab = tabs.find((t) => t.id === activeTab);

  return (
    <section className="py-24 px-6 md:px-10 bg-slate-50/50 relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            🎯 Interactive Daily Sprint Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            This Is What{' '}
            <span className="text-indigo-600">2 Hours/Day</span>{' '}
            Looks Like.
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Switch between tracks to see exact work sprints executed directly with our company practitioners.
          </p>
        </motion.div>

        {/* Sandbox Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center gap-2 p-4 border-b border-slate-200 bg-slate-50/80 overflow-x-auto">
            <div className="flex items-center gap-1.5 mr-4 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === t.id
                    ? `border ${t.badgeColor} shadow-sm bg-white`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{tab.headline}</h3>
                    <p className="text-xs font-bold text-slate-500">{tab.sub}</p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${tab.badgeColor}`}>
                    2 Hrs/Day Live Sprint
                  </span>
                </div>

                <div className="mb-6">
                  {tab.content}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">
                    Next onboarding starts next working day after payment.
                  </p>
                  <button
                    onClick={() => onOpenCheckout(activeTab === 'code' ? 'web' : activeTab === 'ads' ? 'marketing' : activeTab === 'career' ? 'hr' : 'design', false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer text-center"
                  >
                    Enroll in Track • ₹3,999/mo →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default InteractiveHubBox;
