import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Code2, Megaphone, Palette, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

const MarketProofSection = ({ onOpenCheckout, onOpenScholarship }) => {
  return (
    <section id="market-proof" className="py-24 px-6 md:px-12 bg-slate-50/80 text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* User-facing Header Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>VERIFIED DEPLOYED PROOF & PLACEMENTS</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Real Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600">Deployed Output across All 3 Domains</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl font-medium leading-relaxed">
            Our members don't just study theory. Whether they choose <span className="text-indigo-600 font-bold">Web Dev</span>, <span className="text-sky-600 font-bold">Growth Digital Marketing</span>, or <span className="text-emerald-600 font-bold">Graphic Design</span>, they build live production output, pass senior practitioner audits, and land high-paying roles or client contracts.
          </p>
        </motion.div>

        {/* 3 Track Output Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-mono text-xs font-bold mb-2">
              <Code2 className="w-4 h-4" />
              <span>WEB & SOFTWARE SPRINT</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Deployed Production Code</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Full-stack React/Node/Next.js apps deployed to AWS/Vercel with verified Git commit graphs.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm">
            <div className="flex items-center gap-2 text-sky-700 font-mono text-xs font-bold mb-2">
              <Megaphone className="w-4 h-4" />
              <span>DIGITAL MARKETING SPRINT</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Live ROAS & Ad Dashboards</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Verified Meta & Google ad campaigns, funnel conversions, pixel analytics, and lead hooks.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold mb-2">
              <Palette className="w-4 h-4" />
              <span>GRAPHIC & UI/UX SPRINT</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Figma Systems & Ad Creatives</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Conversion UI design systems, brand identity kits, high-CTR social ad graphics, and Behance portfolios.</p>
          </div>
        </div>

        {/* Membership & Enrollment Box */}
        <div className="bg-white border-2 border-indigo-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold mb-4">
              NO UPFRONT LAKHS • CANCEL ANYTIME
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
              Join the NatureXpress Practitioner Sprint Lab
            </h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
              Transparent monthly membership for Web Development, Growth Digital Marketing, and Graphic Design. Practice 2 hours daily with company leads until you land your target job or client.
            </p>

            {/* Pricing Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-500 font-bold block mb-1">STANDARD MEMBERSHIP</span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-slate-900">₹3,999</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">Full access to 2 hrs/day live sprints across any track + verified company experience letter.</p>
                </div>

                <button
                  onClick={() => onOpenCheckout && onOpenCheckout('web', false)}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer text-center"
                >
                  Enroll Standard Tier • ₹3,999 →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/80 to-white border-2 border-amber-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-amber-900 font-bold">MERIT PERFORMANCE REFUND TIER</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold">50% Cashback</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-amber-950">₹3,999</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                    Pay ₹3,999 upfront. Complete your 90-day sprint milestones to <strong>Earn 50% Cashback (₹2,000 Refunded)</strong> directly back to your account!
                  </p>
                </div>

                <button
                  onClick={() => onOpenScholarship && onOpenScholarship()}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer text-center"
                >
                  Apply For Merit Refund Eligibility →
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Risk-Free Guarantee • Cancel Anytime with 1-Click</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketProofSection;
