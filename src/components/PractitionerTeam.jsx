import { useRef, useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Tilt Card System — Light SaaS Style
 */
const MouseEnterContext = createContext(undefined);

const CardContainer = ({ children, className = '', containerClassName = '' }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={`flex items-center justify-center ${containerClassName}`} style={{ perspective: '1000px' }}>
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative transition-all duration-200 ease-linear ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardItem = ({ as: Tag = 'div', children, className = '', translateZ = 0, ...rest }) => {
  const ref = useRef(null);
  const [isMouseEntered] = useContext(MouseEnterContext) || [false];

  return (
    <Tag
      ref={ref}
      className={`transition duration-200 ease-linear ${className}`}
      style={{
        transform: isMouseEntered ? `translateZ(${translateZ}px)` : 'translateZ(0px)',
        transformStyle: 'preserve-3d',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const domainMembers = [
  {
    id: 'engineering',
    badge: 'Track 1: Web Dev',
    title: 'IT & Software Team',
    name: 'NatureXpress Software Leads',
    tagline: 'Active Software Engineers & Full-Stack Leads',
    description: 'Code directly alongside our active engineering team. Write production code, push GitHub commits, and deploy live web/mobile apps.',
    outcomes: [
      'Build 3+ live production apps on Vercel/AWS',
      'Master Cursor, Claude 3.5 & modern AI coding tools',
      'API design, Supabase backend & Razorpay checkout',
    ],
    accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20',
    emoji: '💻',
    track: 'web',
  },
  {
    id: 'marketing',
    badge: 'Track 2: Growth Marketing',
    title: 'Marketing Head',
    name: 'Growth & Performance Team',
    tagline: 'Performance Marketers & Media Buyers',
    description: 'Stop learning marketing from theorists who never spent real ad budget. Manage live Meta CBO campaigns & Google Ads ROAS.',
    outcomes: [
      'Manage real Meta & Google Ads Manager campaign ad spend',
      'Build high-converting landing page funnels with offer hooks',
      'Structure proposal decks to close high-ticket clients',
    ],
    accentBg: 'bg-amber-50 border-amber-200 text-amber-800',
    buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20',
    emoji: '📈',
    track: 'marketing',
  },
  {
    id: 'design',
    badge: 'Track 3: UI/UX Design',
    title: 'Social Media Design Team',
    name: 'Visual Content & Brand Designers',
    tagline: 'Active Visual Content & Brand Designers',
    description: 'Learn graphic design directly from our active design team. Create viral Instagram carousels, ad graphics & Figma UI systems.',
    outcomes: [
      'Design high-converting social media ad creatives & carousels',
      'Create full Figma UI/UX design systems & prototypes',
      'Build client pitch decks & brand identity guidelines',
    ],
    accentBg: 'bg-purple-50 border-purple-200 text-purple-800',
    buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20',
    emoji: '🎨',
    track: 'design',
  },
];

const PractitionerTeam = ({ onOpenEnrollment }) => {
  return (
    <section id="practitioners" className="py-24 px-6 md:px-10 bg-white relative overflow-hidden">
      
      {/* Background radial soft gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs"
          >
            👥 ACTIVE INDUSTRY PRACTITIONERS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4"
          >
            Learn From Engineers, Marketers & Designers{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600">
              Who Ship Code & Ads Daily
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 text-base md:text-lg font-medium leading-relaxed"
          >
            No full-time academic teachers with zero company experience. Practice 2 hours daily directly alongside active company leads.
          </motion.p>
        </div>

        {/* 3 Main Sprint Track Practitioner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {domainMembers.map((member) => (
            <CardContainer key={member.id} className="w-full h-full">
              <div className="h-full rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group relative">
                
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <CardItem translateZ={20}>
                      <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold border ${member.accentBg}`}>
                        {member.badge}
                      </span>
                    </CardItem>
                    <CardItem translateZ={30}>
                      <span className="text-2xl p-2 rounded-2xl bg-slate-100">{member.emoji}</span>
                    </CardItem>
                  </div>

                  {/* Title & Name */}
                  <CardItem translateZ={25} className="mb-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{member.title}</h3>
                    <p className="text-xs text-indigo-600 font-bold">{member.tagline}</p>
                  </CardItem>

                  {/* Description */}
                  <CardItem translateZ={15} className="mb-6">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {member.description}
                    </p>
                  </CardItem>

                  {/* Deliverable Outcomes */}
                  <CardItem translateZ={20} className="space-y-2.5 mb-8">
                    {member.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <span className="text-emerald-600 font-bold text-sm shrink-0">✓</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </CardItem>
                </div>

                {/* Enrollment Button */}
                <CardItem translateZ={30} className="w-full">
                  <button
                    onClick={() => onOpenEnrollment && onOpenEnrollment(member.track)}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all cursor-pointer text-center ${member.buttonBg}`}
                  >
                    Join {member.badge} →
                  </button>
                </CardItem>

              </div>
            </CardContainer>
          ))}
        </div>

        {/* UNIVERSAL HR & TALENT LEAD INTEGRATION BANNER (INCLUDED IN ALL 3 TRACKS) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white p-8 md:p-10 shadow-xl relative overflow-hidden border border-emerald-500/30"
        >
          <div className="absolute top-0 right-0 px-5 py-1.5 bg-emerald-500 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-bl-2xl">
            Included in All 3 Tracks
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                👔 UNIVERSAL HR & PLACEMENT BACKING
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                HR & Talent Lead Mentorship <span className="text-emerald-400">Is Built Into Every Track</span>
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                You don't need a separate placement or HR course. Whether you enroll in <strong className="text-white">Web Dev</strong>, <strong className="text-white">Growth Marketing</strong>, or <strong className="text-white">UI/UX Design</strong>, our HR & Talent Lead works with you 1-on-1 on:
              </p>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-medium">
                  <span className="text-emerald-400 font-bold block mb-0.5">📄 ATS Resume Rewrite</span>
                  <span>Screening filter optimization</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-medium">
                  <span className="text-emerald-400 font-bold block mb-0.5">🎙️ 1-on-1 Mock Interviews</span>
                  <span>Technical & HR round prep</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-medium">
                  <span className="text-emerald-400 font-bold block mb-0.5">🚀 Direct Referrals</span>
                  <span>Hiring partner & client intros</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 text-center md:text-right">
              <div className="inline-block p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-center">
                <span className="text-3xl font-black text-emerald-400 block mb-1">100% Free</span>
                <span className="text-xs text-slate-300 font-mono block">Included With Every Sprint</span>
                <span className="text-[10px] text-slate-400 block mt-2">No extra fees or hidden charges</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PractitionerTeam;
