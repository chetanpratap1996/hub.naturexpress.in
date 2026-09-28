import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isAgency = location.pathname === '/agency';
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section
      const sections = isAgency 
        ? ['contact', 'about', 'portfolio', 'services', 'manifesto']
        : ['testimonials', 'tracks', 'assessment', 'gap'];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAgency]);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const agencyNavLinks = [
    { name: 'Home',      path: '/agency',           section: 'home',      isRouterLink: true },
    { name: 'Services',  path: '/agency#services',  section: 'services',  isRouterLink: false },
    { name: 'Portfolio', path: '/agency#portfolio', section: 'portfolio', isRouterLink: false },
    { name: 'About',     path: '/agency#about',     section: 'about',     isRouterLink: false },
    { name: 'Contact',   path: '/agency#contact',   section: 'contact',   isRouterLink: false },
  ];

  const skillsHubNavLinks = [
    { name: 'Home',           path: '/',             section: 'home',         isRouterLink: true },
    { name: 'Audit & Resume', path: '/#assessment', section: 'assessment',   isRouterLink: false },
    { name: 'Tracks',         path: '/#tracks',       section: 'tracks',       isRouterLink: false },
    { name: 'Proof',          path: '/#proof',        section: 'proof',        isRouterLink: false },
    { name: 'Wall of Love',   path: '/#testimonials', section: 'testimonials', isRouterLink: false },
  ];

  const navLinks = isAgency ? agencyNavLinks : skillsHubNavLinks;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
          : 'py-5 bg-white/60 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      {/* Top Scroll Progress Line */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to={isAgency ? "/agency" : "/"} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              NX
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-base leading-none tracking-tight">
                NatureXpress <span className="text-indigo-600 font-extrabold">{isAgency ? 'Agency' : 'Hub'}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                {isAgency ? 'B2B Digital Studio' : 'Developer & Growth Sprints'}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeSection === link.section
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Catchy Desktop CTA Button: Connect with HR Lead */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#assessment"
            className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Connect with HR Lead</span>
            <span className="text-sm">→</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-indigo-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-slate-800 font-bold text-sm hover:text-indigo-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#assessment"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-md"
              >
                Connect with HR Lead →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
