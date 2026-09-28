import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const testimonialsData = [
  {
    name: "Aman Verma",
    role: "Full-Stack Engineer Sprint",
    outcome: "Hired at Tech Unicorn • ₹9.5 LPA",
    beforeAfter: "0 Deployed Apps ➔ 4 Production Apps Deployed",
    avatarBg: "bg-indigo-600",
    initials: "AV",
    quote: "The 8-week sprint changed everything. Instead of just learning syntax, I deployed 4 live production apps with real user authentication and databases. In interviews, I just shared my live links!",
    rating: 5,
    tag: "Full-Stack Track"
  },
  {
    name: "Priya Sharma",
    role: "UI/UX & Frontend Sprint",
    outcome: "Landed 3 US Freelance Retainers ($2.4k/mo)",
    beforeAfter: "₹5k Local Freelancing ➔ $2.4k Recurring Retainers",
    avatarBg: "bg-amber-600",
    initials: "PS",
    quote: "I used to struggle getting clients on Upwork. The audit revealed my portfolio lacked case studies and live proof. Within 4 weeks of fixing my pitch and proof gallery, I signed 3 retainer clients!",
    rating: 5,
    tag: "Freelance Track"
  },
  {
    name: "Rohan Kulkarni",
    role: "AI & Full-Stack Sprint",
    outcome: "Senior Developer Promo • 80% Hike",
    beforeAfter: "Stuck in Basic Coding ➔ Built AI SaaS Automation",
    avatarBg: "bg-emerald-600",
    initials: "RK",
    quote: "The hands-on mentor code reviews made all the difference. My code quality went from junior level to production grade. My company promoted me right after seeing my AI platform build.",
    rating: 5,
    tag: "AI App Track"
  },
  {
    name: "Sneha Patel",
    role: "Growth & Video Automation",
    outcome: "Full-Time Creator Lead at Agency",
    beforeAfter: "Theoretical Degree ➔ Managed 1.2M+ Reach Campaigns",
    avatarBg: "bg-purple-600",
    initials: "SP",
    quote: "NatureXpress doesn't sell outdated recorded courses. The live async sprints pushed me to build real growth funnels and video scripts that actually converted for real brands.",
    rating: 5,
    tag: "Growth Track"
  },
  {
    name: "Vikram Rathore",
    role: "Backend & Systems Sprint",
    outcome: "Off-Campus Placement • Top MNC",
    beforeAfter: "50+ Rejections ➔ Direct Callbacks After Portfolio Audit",
    avatarBg: "bg-blue-600",
    initials: "VR",
    quote: "The resume and skills audit gave me an honest score of 42/100 and showed me exactly why HRs were skipping my resume. Once I built verified proof apps, callbacks started coming in.",
    rating: 5,
    tag: "Placement Sprint"
  },
  {
    name: "Ananya Deshmukh",
    role: "Product Design Sprint",
    outcome: "Product Designer at Series A Startup",
    beforeAfter: "Figma Mockups Only ➔ Interactive React Code Proof",
    avatarBg: "bg-pink-600",
    initials: "AD",
    quote: "Designers who can code prototype apps are rare. NatureXpress taught me how to bridge design with working frontend code. That single skill set me apart from 200+ applicants.",
    rating: 5,
    tag: "UI/UX Track"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Wall of Love • Real Student Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            From Zero Proof to <span className="text-indigo-600">Dream Jobs & Clients</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            See how students transformed their profiles, built real production projects, and closed the employability gap in just 8 weeks.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between hover:border-indigo-300">
                <div>
                  {/* Top Bar: Tag & Stars */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {item.tag}
                    </span>
                    <div className="flex text-amber-400 text-sm">
                      {"★".repeat(item.rating)}
                    </div>
                  </div>

                  {/* Outcome Highlight Pill */}
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 mb-6">
                    <p className="text-xs font-bold text-indigo-900 mb-1">🎯 Outcome Achieved:</p>
                    <p className="text-sm font-extrabold text-indigo-700">{item.outcome}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.beforeAfter}</p>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-sm`}>
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <div className="text-left">
              <h4 className="text-base font-bold text-slate-900">Want to be our next success story?</h4>
              <p className="text-xs text-slate-500">Take the 3-minute market audit and upload your resume for free.</p>
            </div>
            <a
              href="#assessment"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100 whitespace-nowrap"
            >
              Start Free Audit →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
