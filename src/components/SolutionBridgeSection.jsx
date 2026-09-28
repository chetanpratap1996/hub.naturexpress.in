import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Megaphone, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';

const SolutionBridgeSection = ({ onOpenCheckout }) => {
  const [activeDomain, setActiveDomain] = useState('web'); // 'web' | 'marketing' | 'design'

  const domains = {
    web: {
      title: "Web & Software Engineering Sprint Engine",
      icon: Code2,
      tag: "Full-Stack Code Sprint",
      color: "border-indigo-200 bg-indigo-50/40 text-indigo-700",
      btnColor: "bg-indigo-600 hover:bg-indigo-700 text-white",
      description: "Work 2 hours daily with senior company IT leads to build, audit, and deploy production web and mobile applications.",
      deliverables: [
        "Deploy 3+ full-stack production apps to Vercel/AWS",
        "Active 90-day green GitHub commit graph with PR reviews",
        "Integrate Auth, Razorpay/Stripe payments & REST APIs",
        "Verified Experience Letter from NatureXpress Labs"
      ]
    },
    marketing: {
      title: "Growth Digital Marketing Sprint Engine",
      icon: Megaphone,
      tag: "Performance Marketing Sprint",
      color: "border-sky-200 bg-sky-50/40 text-sky-700",
      btnColor: "bg-sky-600 hover:bg-sky-700 text-white",
      description: "Run live Meta and Google ad campaigns, optimize ROAS/CAC analytics, and build direct-response landing page funnels.",
      deliverables: [
        "Manage active ad campaign budgets with verified ROAS proof",
        "Build high-converting landing page funnels and lead hooks",
        "Master pixel tracking, custom audiences, and A/B ad split testing",
        "Verified Experience Letter & Performance Marketing Audit"
      ]
    },
    design: {
      title: "Graphic & UI/UX Design Sprint Engine",
      icon: Palette,
      tag: "Conversion UI/UX Design Sprint",
      color: "border-emerald-200 bg-emerald-50/40 text-emerald-700",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      description: "Design Figma UI component systems, social media ad creatives, and complete brand identity kits with active art directors.",
      deliverables: [
        "Build live Behance/Figma prototypes & mobile responsive design systems",
        "Design high-CTR social media ad graphics, carousels, and banners",
        "Master typography rules, color tokens, and developer handoff specs",
        "Verified Experience Letter & Design Portfolio Audit"
      ]
    }
  };

  return (
    <section id="solution-bridge" className="py-24 px-6 md:px-12 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* User-facing Header Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>THE DAILY SPRINT ENGINE</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            How NatureXpress <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600">Plugs Your Employability Gaps</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl font-medium leading-relaxed">
            We don't sell another online course. We operate 3 active practitioner sprint tracks: <span className="text-indigo-600 font-bold">Web Dev</span>, <span className="text-sky-600 font-bold">Growth Digital Marketing</span>, and <span className="text-emerald-600 font-bold">Graphic & UI/UX Design</span>.
          </p>
        </motion.div>

        {/* 3 Domain Sprint Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.keys(domains).map((key) => {
            const item = domains[key];
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={key}
                whileHover={{ y: -4 }}
                onClick={() => setActiveDomain(key)}
                className={`p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeDomain === key
                    ? 'bg-white border-indigo-400 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-400/20'
                    : 'bg-slate-50/80 border-slate-200/90 hover:bg-white hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${item.color}`}>
                      {item.tag}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium">{item.description}</p>

                  <div className="space-y-2.5 mb-8">
                    {item.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCheckout && onOpenCheckout(key, false);
                  }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${item.btnColor}`}
                >
                  <span>Explore Track Sprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SolutionBridgeSection;
