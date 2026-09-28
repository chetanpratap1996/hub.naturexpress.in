import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Code2, Megaphone, Palette, Check, Sparkles } from 'lucide-react';

const ValueMatrixSection = () => {
  const [selectedDomain, setSelectedDomain] = useState('web'); // 'web' | 'marketing' | 'design'
  const [selectedTier, setSelectedTier] = useState(3); // 1 | 2 | 3

  const domainData = {
    web: {
      title: "Web & Software Engineering",
      icon: Code2,
      tiers: {
        1: {
          title: "Tier 1: Tutorial Coder",
          payRange: "₹2.5L – ₹4L / yr (or Auto-Rejected)",
          riskScore: "90% Hiring Risk",
          riskColor: "bg-rose-50 text-rose-700 border-rose-200",
          traits: [
            "Generic YouTube certificates & Todo apps",
            "No live URLs; code only exists on localhost",
            "Single commit Git history (bulk upload)",
            "Struggles to explain REST APIs or databases"
          ],
          hrVerdict: "❌ High Risk: Auto-rejected by ATS scanners."
        },
        2: {
          title: "Tier 2: Project Developer",
          payRange: "₹4.5L – ₹7L / yr",
          riskScore: "50% Hiring Risk",
          riskColor: "bg-amber-50 text-amber-800 border-amber-200",
          traits: [
            "Understands basic React/Node routes",
            "Deployed free apps, but prone to crashing",
            "Basic database connections without error handling",
            "Infrequent Git commits without branching"
          ],
          hrVerdict: "⚠️ Moderate Risk: Hirable for basic junior tasks."
        },
        3: {
          title: "Tier 3: Production Engineer",
          payRange: "₹8L – ₹18L+ / yr ($40–$80/hr Contracts)",
          riskScore: "5% Hiring Risk (Instant Hire)",
          riskColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          traits: [
            "Shipped live scalable web apps on Vercel/AWS",
            "Active 90-day GitHub commit graph with PR reviews",
            "Integrated Auth, Razorpay/Stripe payments & REST APIs",
            "Verified Experience Letter & Peer Code Review Audit"
          ],
          hrVerdict: "✅ Zero Risk: Plug-and-play engineer ready on Day 1."
        }
      }
    },
    marketing: {
      title: "Growth Digital Marketing",
      icon: Megaphone,
      tiers: {
        1: {
          title: "Tier 1: Social Media Beginner",
          payRange: "₹2L – ₹3.5L / yr (or Auto-Rejected)",
          riskScore: "90% Hiring Risk",
          riskColor: "bg-rose-50 text-rose-700 border-rose-200",
          traits: [
            "Posts random graphics without strategy or funnel",
            "No experience inside Meta/Google Ads Manager",
            "Cannot explain CAC, ROAS, or pixel tracking",
            "No copy testing or conversion analytics history"
          ],
          hrVerdict: "❌ High Risk: Wastes ad budget. Auto-rejected."
        },
        2: {
          title: "Tier 2: Ad Specialist",
          payRange: "₹4L – ₹6.5L / yr",
          riskScore: "50% Hiring Risk",
          riskColor: "bg-amber-50 text-amber-800 border-amber-200",
          traits: [
            "Can launch basic boosted posts & Meta ad sets",
            "Basic understanding of copy and audience targeting",
            "Struggles to scale ad spend without ROAS dropping",
            "Lacks custom landing page funnel build skills"
          ],
          hrVerdict: "⚠️ Moderate Risk: Good for basic account maintenance."
        },
        3: {
          title: "Tier 3: Performance Growth Lead",
          payRange: "₹7L – ₹15L+ / yr (High Retainer Clients)",
          riskScore: "5% Hiring Risk (Instant Hire)",
          riskColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          traits: [
            "Manages live Meta/Google ad budgets with 3x+ ROAS proof",
            "Builds full-funnel landing pages & direct-response copy",
            "A/B tests creative hooks, angles, and lead forms daily",
            "Verified Growth Campaign Case Studies & Client Letters"
          ],
          hrVerdict: "✅ Zero Risk: Directly drives revenue & business profit."
        }
      }
    },
    design: {
      title: "Graphic & UI/UX Design",
      icon: Palette,
      tiers: {
        1: {
          title: "Tier 1: Template Editor",
          payRange: "₹2L – ₹3.5L / yr (or Auto-Rejected)",
          riskScore: "90% Hiring Risk",
          riskColor: "bg-rose-50 text-rose-700 border-rose-200",
          traits: [
            "Edits basic Canva templates without brand systems",
            "No Figma auto-layout, components, or prototypes",
            "Doesn't understand design tokens, grid, or typography",
            "No conversion-driven ad creative variations"
          ],
          hrVerdict: "❌ High Risk: Low visual impact. Auto-rejected."
        },
        2: {
          title: "Tier 2: Visual Designer",
          payRange: "₹4L – ₹6.5L / yr",
          riskScore: "50% Hiring Risk",
          riskColor: "bg-amber-50 text-amber-800 border-amber-200",
          traits: [
            "Creates attractive static graphics & social posts",
            "Basic Figma design knowledge without full UI systems",
            "Lacks developer handoff and mobile responsiveness",
            "Inconsistent visual hierarchy across brand assets"
          ],
          hrVerdict: "⚠️ Moderate Risk: Good for basic asset creation."
        },
        3: {
          title: "Tier 3: Product UI/UX & Brand Lead",
          payRange: "₹7L – ₹16L+ / yr (High Retainer Clients)",
          riskScore: "5% Hiring Risk (Instant Hire)",
          riskColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          traits: [
            "Builds scalable Figma UI design systems with auto-layout",
            "Designs high-CTR social media ad creatives & carousels",
            "Delivers full developer-ready specs & prototype flows",
            "Verified UI/UX Portfolio Case Studies & Client Letters"
          ],
          hrVerdict: "✅ Zero Risk: Delivers conversion-first design assets."
        }
      }
    }
  };

  const currentDomain = domainData[selectedDomain];
  const currentTier = currentDomain.tiers[selectedTier];

  return (
    <section id="value-matrix" className="py-24 px-6 md:px-12 bg-white text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* User-facing Header Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>SKILL & COMPENSATION MATRIX</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            The Hiring Risk Matrix: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">Why Companies Pay 3x More</span> for Production Specialists
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl font-medium leading-relaxed">
            Whether you code, manage ads, or design graphics, salary and client retainers are calculated by <span className="text-slate-900 font-bold underline decoration-emerald-500">Execution Value ÷ Hiring Risk</span>.
          </p>
        </motion.div>

        {/* Domain Selection Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'web', label: 'Web Development', icon: Code2 },
            { id: 'marketing', label: 'Digital Marketing', icon: Megaphone },
            { id: 'design', label: 'Graphic & UI/UX Design', icon: Palette }
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDomain(item.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer border ${
                  selectedDomain === item.id
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Pyramid Tier Selector */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[1, 2, 3].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`p-6 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                selectedTier === tier
                  ? 'bg-gradient-to-b from-emerald-50/60 to-white border-emerald-400 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-400/30'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">LEVEL 0{tier}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${currentDomain.tiers[tier].riskColor}`}>
                  {currentDomain.tiers[tier].riskScore}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">{currentDomain.tiers[tier].title}</h3>
              <p className="text-xs text-emerald-700 font-mono font-bold">{currentDomain.tiers[tier].payRange}</p>
            </button>
          ))}
        </div>

        {/* Tier Details Display Box */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedDomain}-${selectedTier}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-sm relative"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  {currentDomain.title} • Candidate Level
                </span>
                <h3 className="text-2xl font-black text-slate-900">{currentTier.title}</h3>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-right shadow-sm">
                <span className="text-[11px] text-slate-500 font-mono font-bold block">Estimated Pay / Retainer</span>
                <span className="text-2xl font-black text-emerald-600">{currentTier.payRange}</span>
              </div>
            </div>

            {/* Traits List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">Candidate Output & Traits:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {currentTier.traits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className={`p-1 rounded-md shrink-0 mt-0.5 ${selectedTier === 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HR Verdict Callout */}
            <div className={`p-4 rounded-2xl font-mono text-xs border font-bold ${
              selectedTier === 3 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : selectedTier === 2 
                ? 'bg-amber-50 border-amber-200 text-amber-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {currentTier.hrVerdict}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ValueMatrixSection;
