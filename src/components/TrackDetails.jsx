import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const trackData = {
  web: {
    id: 'web',
    title: 'Web & App Development Sprint',
    icon: '💻',
    subtitle: 'Full-Stack React + Node.js + Tailwind + AI Tools (Cursor, Claude)',
    mentorPillar: '⚡ Mentored Directly By: NatureXpress IT Engineering Leads + HR Talent Director',
    outcomes: [
      'Build 4 production web apps deployed on Vercel/Netlify with custom subdomains.',
      'Master AI-driven coding tools (Cursor, v0.dev, Claude 3.5 Sonnet) to code 5x faster.',
      'Integrate REST APIs, Database Authentication (Supabase/MongoDB), and Payment Gateways.',
      '1-on-1 HR Resume Rewrite, Mock Technical Interviews & Verified Experience Letter.'
    ],
    curriculum: [
      { week: 'Week 1-2', topic: 'Modern UI Architecture & AI Workflows', detail: 'Tailwind CSS, React 19 state management, component architecture, Cursor IDE setup.' },
      { week: 'Week 3-4', topic: 'Full-Stack Backend & Databases', detail: 'Node.js, Express, RESTful APIs, Supabase Auth, PostgreSQL schema modeling.' },
      { week: 'Week 5-6', topic: 'Live Ecosystem Platform Build', detail: 'Contributing features to production platforms (Doctor, EUDR, Kisan subdomains).' },
      { week: 'Week 7-8', topic: 'HR & Placement Sprint: ATS Resume & Mock Rounds', detail: '1-on-1 HR Lead mentorship: ATS resume overhaul, mock coding interviews, LinkedIn branding & direct referrals.' },
    ]
  },
  marketing: {
    id: 'marketing',
    title: 'Digital Growth & Performance Sprint',
    icon: '📈',
    subtitle: 'Meta Ads + Google Ads + SEO Engine + Conversion Funnels',
    mentorPillar: '⚡ Mentored Directly By: Head of Growth & Media Buyers + HR Talent Director',
    outcomes: [
      'Manage live ad campaigns on Meta & Google Ads Manager with real performance tracking.',
      'Build high-converting landing pages with psychological offer positioning.',
      'Master SEO site architecture, keyword intent, and content distribution engines.',
      '1-on-1 HR Portfolio Review, Client Pitch Decks & Direct Agency Referrals.'
    ],
    curriculum: [
      { week: 'Week 1-2', topic: 'High-Converting Offer & Copywriting', detail: 'Psychological triggers, customer avatars, landing page structure, offer hooks.' },
      { week: 'Week 3-4', topic: 'Meta & Instagram Ads Mastery', detail: 'Ad account setup, custom audiences, retargeting funnels, CBO scaling, ROAS math.' },
      { week: 'Week 5-6', topic: 'Google Ads & Technical SEO', detail: 'Search ads, keyword matching, landing page optimization, technical SEO audits.' },
      { week: 'Week 7-8', topic: 'HR & Client Sprint: Retainer Proposals & HR Coaching', detail: '1-on-1 HR Lead mentorship: Portfolio deck formatting, client outreach, retainer pitch prep & placement referrals.' },
    ]
  },
  design: {
    id: 'design',
    title: 'Graphic Design & UI/UX Sprint',
    icon: '🎨',
    subtitle: 'Social Media Creatives + Brand Identity + Figma UI Systems',
    mentorPillar: '⚡ Mentored Directly By: Social Media Design Leads + HR Talent Director',
    outcomes: [
      'Design viral Instagram carousels, YouTube thumbnails, and social media ad creatives.',
      'Build complete brand identity guidelines (typography, color science, logo design).',
      'Design multi-screen web & mobile UI design systems in Figma with interactive prototypes.',
      '1-on-1 HR Portfolio Review, Behance Presentation & Direct Recruiter Referrals.'
    ],
    curriculum: [
      { week: 'Week 1-2', topic: 'Visual Design & Social Media Creatives', detail: 'Color science, typography, viral carousel design, ad creative psychology, Photoshop/Figma.' },
      { week: 'Week 3-4', topic: 'UI/UX Research & Wireframing', detail: 'User journeys, information architecture, low-to-high fidelity wireframing, UX testing.' },
      { week: 'Week 5-6', topic: 'Production-Ready Design Systems', detail: 'Creating reusable UI libraries, responsive mobile screens, dark mode design systems.' },
      { week: 'Week 7-8', topic: 'HR & Design Sprint: Behance Case Studies & HR Reviews', detail: '1-on-1 HR Lead mentorship: Behance case study formatting, design portfolio reviews & direct recruiter intros.' },
    ]
  }
};

const TrackDetails = ({ onOpenEnrollment }) => {
  const [activeTab, setActiveTab] = useState('web');
  const currentTrack = trackData[activeTab];

  return (
    <section id="tracks" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            📅 Week-By-Week Operating Model
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Inside The <span className="text-indigo-600">8-Week Sprint System</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
            Select your domain to inspect the practitioner team mentorship, curriculum roadmap, and 1-on-1 HR placement backing.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'web', label: '💻 Web & App Dev (IT Team + HR)' },
            { id: 'marketing', label: '📈 Digital Growth (Growth Head + HR)' },
            { id: 'design', label: '🎨 Graphic & UI/UX (Design Team + HR)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 rounded-2xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-extrabold'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Track Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Outcomes & Mentor Pillar (Pristine Light Theme with 100% High Contrast) */}
            <div className="lg:col-span-5 space-y-6">
              <SpotlightCard className="p-8 rounded-3xl bg-white text-slate-900 border-2 border-indigo-100 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{currentTrack.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{currentTrack.title}</h3>
                    <p className="text-xs text-indigo-600 font-bold">{currentTrack.subtitle}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-mono font-bold mb-6">
                  {currentTrack.mentorPillar}
                </div>

                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Target Outcomes & Deliverables:
                </h4>

                <ul className="space-y-3.5 text-xs text-slate-800 font-bold mb-8">
                  {currentTrack.outcomes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold text-sm shrink-0">✓</span>
                      <span className="text-slate-800 font-bold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onOpenEnrollment(activeTab)}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer text-center shadow-lg shadow-indigo-600/20"
                >
                  Enroll in {currentTrack.title} →
                </button>
              </SpotlightCard>

              {/* HR & Placement Backing Callout */}
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-slate-900 space-y-2">
                <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-wider block">
                  👔 INCLUDED HR & TALENT LEAD MENTORSHIP
                </span>
                <h4 className="text-sm font-bold text-slate-900">1-on-1 ATS Resume & Placement Support</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-bold">
                  Every candidate receives 1-on-1 HR lead sessions for ATS resume formatting, mock technical interviews, LinkedIn profile branding, and direct recruiter referrals.
                </p>
              </div>
            </div>

            {/* Right Column: Week-by-Week Curriculum Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                8-Week Practitioner Curriculum Timeline:
              </h4>

              {currentTrack.curriculum.map((item, index) => (
                <SpotlightCard
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-mono font-bold">
                      {item.week}
                    </span>
                    <h5 className="text-base font-black text-slate-900">{item.topic}</h5>
                  </div>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed pl-1">
                    {item.detail}
                  </p>
                </SpotlightCard>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TrackDetails;
