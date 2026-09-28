import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, Code2, Palette, Megaphone, Zap } from 'lucide-react';

const MarketRealitySection = () => {
  const [activeTab, setActiveTab] = useState('hiring'); // hiring | filtering | clients

  return (
    <section id="market-reality" className="py-24 px-6 md:px-12 bg-slate-50/70 text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* User-facing Section Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span>2026 HIRING & CLIENT MARKET REALITY</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            What HR, Hiring Managers & Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600">Actually Look For</span> in 2026
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl font-medium leading-relaxed">
            Whether you are in <span className="text-indigo-600 font-bold">Web Development</span>, <span className="text-sky-600 font-bold">Growth Digital Marketing</span>, or <span className="text-emerald-600 font-bold">Graphic & UI/UX Design</span>, generic certificates get auto-filtered. Here is where the real high-paying opportunities hide.
          </p>
        </motion.div>

        {/* 3 Domain Pill Highlights */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">WEB DEVELOPMENT</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Live Deployed URLs, Git PRs, REST APIs</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 shrink-0">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider">DIGITAL MARKETING</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Meta/Google ROAS, Funnels, Ad Spend</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">GRAPHIC & UI/UX DESIGN</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Figma Systems, High-CTR Ad Creatives</p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Data Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-slate-200 pb-4">
          {[
            { id: 'hiring', label: 'Where the Jobs & Clients Actually Are', icon: TrendingUp },
            { id: 'filtering', label: 'The 6-Second HR Filter Trap', icon: AlertTriangle },
            { id: 'clients', label: 'What High-Paying Clients Look For', icon: ShieldCheck },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Where the jobs are */}
        <AnimatePresence mode="wait">
          {activeTab === 'hiring' && (
            <motion.div 
              key="hiring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-8 items-stretch"
            >
              {/* Left Box: The Public Job Trap */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-rose-600 font-mono text-xs font-bold uppercase tracking-wider">Public Portals & Job Boards</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">15% of Hiring • 98% Rejection</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
                    Thousands of applicants submit generic Canva resumes, course certificates, and copy-pasted projects. Automated ATS software filters out 98% within seconds.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5 text-slate-700 text-xs font-medium">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span><strong>Web Devs:</strong> Todo apps get flagged as tutorial copy-pastes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-700 text-xs font-medium">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span><strong>Marketers:</strong> Theoretical certificates with zero real ad spend proof</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-700 text-xs font-medium">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span><strong>Designers:</strong> Unstructured PNG layouts without Figma design systems</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-4 text-xs text-rose-800 font-mono font-bold">
                  💡 Result: 100+ applications sent ➔ Zero interview calls.
                </div>
              </div>

              {/* Right Box: The Proof of Work Network */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">The Hidden Proof-of-Work Market</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">85% of Offers • Direct Client Hires</h3>
                  <p className="text-indigo-100 text-sm mb-6 leading-relaxed font-medium">
                    Top companies & high-ticket clients hire through verified proof of execution across code, performance marketing metrics, and design systems.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5 text-indigo-50 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Web Devs:</strong> Live URLs + 90-day active green GitHub graph</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-indigo-50 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Marketers:</strong> Verified ROAS analytics & live ad campaign dashboards</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-indigo-50 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Designers:</strong> Live Behance/Figma prototypes & high-CTR ad creatives</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs text-white font-mono flex items-center justify-between">
                  <span>⚡ How NatureXpress positions you</span>
                  <span className="font-extrabold text-amber-300">Direct Proof Engine →</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: The 6-Second HR Filter */}
          {activeTab === 'filtering' && (
            <motion.div 
              key="filtering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-black text-slate-900 mb-6">What Hiring Leads Screen For in 6 Seconds</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                  <span className="text-indigo-600 text-xs font-mono font-bold block mb-2 uppercase">Web Dev Screening</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Is the code live & stable?</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    HR checks if your app is live on Vercel/AWS with a real DB schema and active Git commits.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                  <span className="text-sky-600 text-xs font-mono font-bold block mb-2 uppercase">Digital Marketing Screening</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Can you drive measurable ROAS?</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Growth leads check if you have built real ad campaigns, managed budgets, and tracked conversion pixels.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                  <span className="text-emerald-600 text-xs font-mono font-bold block mb-2 uppercase">Graphic Design Screening</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Is it a conversion-first design?</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Art directors check your Figma component systems, typography rules, and high-CTR ad creative variations.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: What Clients Look For */}
          {activeTab === 'clients' && (
            <motion.div 
              key="clients"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-black text-slate-900 mb-2">What High-Paying Clients & Agencies Pay Premium For</h3>
              <p className="text-slate-600 text-sm mb-6 font-medium">
                Clients don't care about degrees. They pay for **business ROI**, **speed**, and **zero-risk execution**.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <h4 className="text-sm font-bold text-indigo-900 mb-1">Web Developers</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Shipping full-stack web/mobile apps with authentication, payments, and databases fast.</p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <h4 className="text-sm font-bold text-sky-900 mb-1">Digital Marketers</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Lowering customer acquisition costs (CAC) and scaling Meta/Google ad spend profitably.</p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <h4 className="text-sm font-bold text-emerald-900 mb-1">Graphic Designers</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Designing high-converting ad creatives, UI/UX design systems, and brand identity kits.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default MarketRealitySection;
