import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GapSection — Linear/Vercel-style comparison section.
 * Clean white aesthetic with subtle border accents and high-contrast typography.
 */

const problems = [
  {
    icon: '📚',
    title: 'Academic Trainers with Zero Company Experience',
    desc: 'Taught by trainers who never built a production app, never managed real ad spend, and never hired a team.',
  },
  {
    icon: '💸',
    title: 'Massive Upfront Loans or Locked-In Fees',
    desc: 'Institutes force ₹50,000 to ₹2,00,000 upfront non-refundable fees before proving any real-world result.',
  },
  {
    icon: '🗃️',
    title: 'Tutorial Clone Portfolios Recruiters Reject',
    desc: 'Copy-pasting YouTube code creates generic "To-Do app" portfolios that hiring managers dismiss instantly.',
  },
  {
    icon: '🎓',
    title: 'No Direct Company Onboarding or Resume Prep',
    desc: 'Zero guidance on ATS resume screening filters, real technical interview rounds, or LinkedIn optimization.',
  },
];

const solutions = [
  {
    icon: '⚡',
    title: 'Work 2 Hrs/Day With Active Company Leads',
    desc: 'Code with IT engineers, run campaigns with Marketing Head, design with Social Media team, prep with HR lead.',
    badge: 'Active Practitioners',
  },
  {
    icon: '💳',
    title: 'Pay ₹3,999/Month. Cancel Anytime.',
    desc: 'No upfront lakhs or lock-in contracts. Pay month-by-month, practice daily, stay until you land a job.',
    badge: 'Pay-As-You-Learn',
  },
  {
    icon: '🚀',
    title: 'Deploy 4 Live Production Apps on Real Subdomains',
    desc: 'Build real platforms deployed on live URLs (doctor.naturexpress.in, eudr.naturexpress.in) that recruiters inspect.',
    badge: 'Verified Proof',
  },
  {
    icon: '👔',
    title: 'Next Working Day Onboarding & HR Mentorship',
    desc: 'Enrollment starts next working day. 1-on-1 ATS resume rewrite and mock interviews with actual hiring managers.',
    badge: 'Instant Onboarding',
  },
];

const GapSection = () => {
  const [activeTab, setActiveTab] = useState('nx');

  return (
    <section id="gap" className="py-24 px-6 md:px-10 bg-slate-50/70 border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Background Accent Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            ⚠️ The Employability Gap
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Your Degree Shows What You Studied.{' '}
            <span className="text-indigo-600 block mt-1">Your Proof Shows What You Can Build.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Over 57% of fresh graduates are deemed unemployable by top tech companies due to zero practical execution proof.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/70 border border-slate-300/80 shadow-inner">
            <button
              onClick={() => setActiveTab('old')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'old'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ❌ Traditional Institutes
            </button>
            <button
              onClick={() => setActiveTab('nx')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'nx'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ NatureXpress Model
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">

          {/* Left: Traditional Institute Cards */}
          <div className={`space-y-4 transition-opacity duration-300 ${activeTab === 'nx' ? 'hidden md:block opacity-90' : 'block opacity-100'}`}>
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/80 flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-red-700 uppercase tracking-wider">
                Old Learning System
              </span>
              <span className="text-xs text-red-600 font-bold">Theory & Dummy Slides</span>
            </div>

            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-red-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: NatureXpress Practitioner Cards */}
          <div className={`space-y-4 transition-opacity duration-300 ${activeTab === 'old' ? 'hidden md:block opacity-90' : 'block opacity-100'}`}>
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider">
                ⚡ NatureXpress Active Model
              </span>
              <span className="text-xs text-indigo-700 font-extrabold">2 Hrs/Day Live Sprints</span>
            </div>

            {solutions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 rounded-2xl bg-white border-2 border-indigo-100 shadow-sm hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 relative overflow-hidden group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GapSection;
