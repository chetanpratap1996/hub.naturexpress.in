import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const faqItems = [
  {
    question: "Can I do this alongside college or a full-time job?",
    answer: "Yes, 100%! The sprint is engineered specifically for busy schedules, requiring just 2 hours per day (1 hour live workshop & co-building + 1 hour async task sprint). All live sessions are recorded in HD and accessible 24/7 so you never fall behind."
  },
  {
    question: "What if I don't have a computer science / technical background?",
    answer: "Over 45% of our successful alumni come from non-CS backgrounds (B.Com, BBA, Civil, Mechanical, or self-taught). We teach modern AI-assisted coding tools (Cursor, Claude 3.5, v0.dev) that bridge the gap fast, allowing you to deploy production apps 5x faster."
  },
  {
    question: "How does the NatureXpress Scholarship selection work?",
    answer: "Scholarships provide up to a 50% tuition subsidy, reducing the total 8-week sprint fee to ₹3,999 total. We grant 2 merit seats per month based on your assessment score, commitment level, and a brief 1-on-1 verification call with founder Chetan."
  },
  {
    question: "What if I miss a live workshop or get stuck on a coding task?",
    answer: "Every workshop is recorded and uploaded immediately to your student portal. You also get 1-on-1 code audits and daily async mentor support on Discord and WhatsApp, ensuring you get un-stuck within hours."
  },
  {
    question: "Do I get a verified experience letter and placement support?",
    answer: "Yes! Upon deploying your 4 production apps, you receive an official Experience & Internship Letter from NatureXpress Labs, plus direct referral pitching to our network of MNC tech partners and freelance agency clients."
  },
  {
    question: "What real production apps will I build during the sprint?",
    answer: "Depending on your track, you will build 4 live platforms—including doctor booking systems, AI SaaS apps, e-commerce market portals, or growth marketing funnels with custom deployed URLs."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-4">
            ❓ Got Questions? We've Got Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-medium">
            Everything you need to know about the 8-Week Build Sprint, daily schedule, and scholarship eligibility.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <SpotlightCard key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-extrabold text-slate-900">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-indigo-600 text-white rotate-180 shadow-md shadow-indigo-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-extrabold text-slate-900">Have a specific doubt not answered here?</h4>
            <p className="text-xs text-slate-600 font-medium mt-0.5">Chat directly with founder Chetan on WhatsApp for instant guidance.</p>
          </div>
          <a
            href="https://wa.me/918077170715?text=Hi%20Chetan!%20I%20have%20a%20question%20about%20the%20NatureXpress%20Skills%20Sprint."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-700 shrink-0 transition-colors shadow-md shadow-emerald-100"
          >
            Chat On WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
