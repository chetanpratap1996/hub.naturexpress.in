import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Track active section
      const sections = ['contact', 'about', 'portfolio', 'services', 'manifesto'];
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
  }, []);

  const navLinks = [
    { name: 'Home',      path: '/',           section: 'home',      isRouterLink: true },
    { name: 'Services',  path: '/#services',  section: 'services',  isRouterLink: false },
    { name: 'Portfolio', path: '/#portfolio', section: 'portfolio', isRouterLink: false },
    { name: 'About',     path: '/#about',     section: 'about',     isRouterLink: false },
    { name: 'Contact',   path: '/#contact',   section: 'contact',   isRouterLink: false },
  ];

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 2.4, staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 glass border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 2.4 }}
        >
          <Link to="/" className="flex items-center gap-1.5 group">
            {/* NX badge */}
            <div className="w-7 h-7 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center mr-1 group-hover:bg-[#f59e0b]/25 transition-colors duration-300">
              <span className="text-[#f59e0b] text-[10px] font-black">NX</span>
            </div>
            <span className="text-white text-lg md:text-xl font-black tracking-tight leading-none">NatureXress</span>
            <span className="text-[#f59e0b] text-lg md:text-xl font-black tracking-tight leading-none">Hub</span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <motion.div
          className="hidden md:flex space-x-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            const linkClass = `relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              isActive
                ? 'text-white bg-white/8'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`;
            return (
              <motion.div key={link.name} variants={itemVariants}>
                {link.isRouterLink ? (
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f59e0b] rounded-full"
                      />
                    )}
                  </Link>
                ) : (
                  <a href={link.path} className={linkClass}>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f59e0b] rounded-full"
                      />
                    )}
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA + Hamburger */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 2.6 }}
        >
          {/* Desktop CTA */}
          <a
            href="/#contact"
            className="relative hidden md:flex overflow-hidden items-center gap-2 px-5 py-2.5 rounded-full bg-[#f59e0b] border border-[#f59e0b] text-white text-sm font-black hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300"
          >
            <span className="relative z-10">Start Free Growth Audit</span>
            <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full glass border-b border-white/[0.06] shadow-2xl py-6"
          >
            <div className="flex flex-col px-6 gap-1">
              {navLinks.map((link) =>
                link.isRouterLink ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white font-semibold text-lg px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white font-semibold text-lg px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                )
              )}
              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <a
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#f59e0b] text-white font-black hover:bg-[#d97706] transition-colors"
                >
                  Start Free Growth Audit →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

