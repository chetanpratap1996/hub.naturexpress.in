import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckSquare, Square, RefreshCw, Award, Code2, TrendingUp, Palette, Sparkles } from 'lucide-react';

const RecruiterAuditWidget = ({ onOpenScholarship }) => {
  const [candidateName, setCandidateName] = useState('');
  const [targetTrack, setTargetTrack] = useState('web'); // 'web' | 'marketing' | 'design'
  const [answers, setAnswers] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const trackChecklists = {
    web: {
      title: "Full-Stack Web & Software Engineering Audit",
      items: [
        { id: 'item1', title: 'Live Production Deployed URLs', desc: 'Do you have 2+ live web applications hosted on Vercel/AWS with SSL & real database schemas?' },
        { id: 'item2', title: '90-Day Active GitHub Commit History', desc: 'Is your GitHub commit graph active with continuous daily commits instead of bulk copy-pastes?' },
        { id: 'item3', title: 'Full-Stack Integrations (Auth + DB + Payments)', desc: 'Have you built apps with user auth, Razorpay/Stripe payments, and REST/GraphQL APIs?' },
        { id: 'item4', title: 'Peer-Reviewed Pull Requests (PRs)', desc: 'Do you have code review history or a verified developer experience letter from an active tech lab?' },
        { id: 'item5', title: 'System Architecture & State Management', desc: 'Can you confidently defend database indexing, state management, and API security in a live interview?' }
      ]
    },
    marketing: {
      title: "Growth & Performance Digital Marketing Audit",
      items: [
        { id: 'item1', title: 'Live Meta & Google Ads Campaign Manager', desc: 'Have you configured real ad sets, custom audiences, pixel tracking, and conversion events?' },
        { id: 'item2', title: 'ROAS & CAC Analytics Proof', desc: 'Do you have verified dashboard proof of Return on Ad Spend (ROAS) and Customer Acquisition Cost (CAC)?' },
        { id: 'item3', title: 'High-Converting Copy & Funnel Architecture', desc: 'Have you built complete landing page funnels with direct-response copywriting and lead hooks?' },
        { id: 'item4', title: 'A/B Testing & Creative Iteration Workflow', desc: 'Can you demonstrate data-driven creative testing (hook variations, angle testing, audience splits)?' },
        { id: 'item5', title: 'Verified Agency / Company Ad Spend', desc: 'Do you have experience managing active client/company ad budgets with verified experience letters?' }
      ]
    },
    design: {
      title: "UI/UX & Brand Graphic Design Audit",
      items: [
        { id: 'item1', title: 'Interactive Figma Prototype & Design System', desc: 'Do you have a live Behance/Figma portfolio with responsive mobile/desktop components and auto-layout?' },
        { id: 'item2', title: 'High-CTR Ad Creatives & Marketing Assets', desc: 'Have you designed social media ad creatives, carousels, and banners engineered for high CTR?' },
        { id: 'item3', title: 'Real Brand Guidelines & Typography Rules', desc: 'Can you present comprehensive brand identity kits (color tokens, font hierarchies, logo specs)?' },
        { id: 'item4', title: 'Client Handoff & Developer Design Specs', desc: 'Are your Figma files organized with proper layer names, design tokens, and export specs for developers?' },
        { id: 'item5', title: 'Live Visual Client Case Studies', desc: 'Do you have visual before-and-after redesign case studies with documented conversion impacts?' }
      ]
    }
  };

  const currentChecklist = trackChecklists[targetTrack];

  const toggleAnswer = (key) => {
    setAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    const trueCount = Object.values(answers).filter(Boolean).length;
    return Math.round((trueCount / 5) * 100);
  };

  const score = calculateScore();

  const getScoreVerdict = () => {
    if (score >= 80) return { level: "Tier 3: Production Ready Specialist", color: "bg-emerald-50 text-emerald-800 border-emerald-200", text: "High employability! Qualifies for Merit Scholarship & priority referral." };
    if (score >= 40) return { level: "Tier 2: Practitioner with Market Gaps", color: "bg-amber-50 text-amber-800 border-amber-200", text: "Solid basics, but lacks verified live portfolio proof and real client sprint history." };
    return { level: "Tier 1: High HR Risk (Beginner Phase)", color: "bg-rose-50 text-rose-800 border-rose-200", text: "High risk of automated filter rejection. Needs immediate 30-day sprint intervention." };
  };

  const handleTrackChange = (track) => {
    setTargetTrack(track);
    setAnswers({ item1: false, item2: false, item3: false, item4: false, item5: false });
  };

  const handleReset = () => {
    setAnswers({ item1: false, item2: false, item3: false, item4: false, item5: false });
  };

  return (
    <section id="live-audit" className="py-24 px-6 md:px-12 bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
        >
          <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>60-SECOND SKILL & EMPLOYABILITY AUDIT</span>
        </motion.div>

        {/* Title */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Employability Audit</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Evaluate your profile against the 5 critical hiring pillars used by top HR leads, tech directors, and agency clients.
          </p>
        </div>

        {/* Main Interactive Audit Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {/* Top Track Switcher Buttons */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <span className="block text-xs font-mono text-slate-500 font-bold mb-3 uppercase tracking-wider">SELECT DOMAIN FOR DIAGNOSTIC:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleTrackChange('web')}
                className={`p-4 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  targetTrack === 'web'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Web & Software Dev</span>
              </button>

              <button
                onClick={() => handleTrackChange('marketing')}
                className={`p-4 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  targetTrack === 'marketing'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Growth Digital Marketing</span>
              </button>

              <button
                onClick={() => handleTrackChange('design')}
                className={`p-4 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  targetTrack === 'design'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Graphic & UI/UX Design</span>
              </button>
            </div>
          </div>

          {/* Candidate Name Field */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-slate-500 font-bold mb-2">YOUR NAME (OPTIONAL)</label>
            <input 
              type="text" 
              placeholder="e.g. Alex Sharma" 
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Dynamic 5-Pillar Checklist */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-2">
              {currentChecklist.title}:
            </h3>

            {currentChecklist.items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleAnswer(item.id)}
                className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  answers[item.id]
                    ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {answers[item.id] ? (
                    <CheckSquare className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-0.5 ${answers[item.id] ? 'text-slate-900' : 'text-slate-700'}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Evaluation Status */}
          <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center shrink-0 shadow-inner">
                <span className="text-2xl font-black text-indigo-700">{score}%</span>
                <span className="text-[10px] font-mono text-indigo-500 uppercase font-bold">Score</span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 font-bold block">EVALUATION STATUS</span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mt-1 ${getScoreVerdict().color}`}>
                  {getScoreVerdict().level}
                </span>
                <p className="text-xs text-slate-500 mt-1 font-medium">{getScoreVerdict().text}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => onOpenScholarship && onOpenScholarship()}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-indigo-200" />
                <span>Apply For Sprint Cohort Bridge →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RecruiterAuditWidget;
