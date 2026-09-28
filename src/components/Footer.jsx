import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── Social Icons ─── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  { icon: <LinkedInIcon />,  href: 'https://www.linkedin.com/in/chetan-pratap-singh-46430918b', label: 'LinkedIn' },
  { icon: <YouTubeIcon />,   href: '#',                                     label: 'YouTube' },
  { icon: <InstagramIcon />, href: '#',                                     label: 'Instagram' },
  { icon: <WhatsAppIcon />,  href: 'https://wa.me/918077170715',            label: 'WhatsApp' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] text-white overflow-hidden border-t border-white/[0.06]">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center">
                <span className="text-[#f59e0b] text-xs font-black">NX</span>
              </div>
              <span className="text-white text-xl font-black tracking-tight">NatureXpress</span>
              <span className="text-[#f59e0b] text-xl font-black tracking-tight">Hub</span>
            </div>

            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              Empowering students and job seekers with live company work sprints, active practitioner mentorship, and verified proof of work.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 1: Skills Hub */}
          <div className="flex flex-col gap-4">
            <p className="text-white font-black text-sm tracking-widest uppercase">Skills Hub</p>
            <div className="w-6 h-[1px] bg-[#f59e0b]/60" />
            <ul className="flex flex-col gap-2.5 text-sm text-gray-500 font-medium">
              <li><Link to="/#practitioners" className="hover:text-white transition-colors">Active Practitioners</Link></li>
              <li><Link to="/#tracks" className="hover:text-white transition-colors">Sprint Tracks</Link></li>
              <li><Link to="/#assessment" className="hover:text-white transition-colors">Resume & Skill Audit</Link></li>
              <li><Link to="/#proof" className="hover:text-white transition-colors">Live App Proofs</Link></li>
            </ul>
          </div>

          {/* Column 2: Legal & Merchant Policy */}
          <div className="flex flex-col gap-4">
            <p className="text-white font-black text-sm tracking-widest uppercase">Legal & Policy</p>
            <div className="w-6 h-[1px] bg-[#f59e0b]/60" />
            <ul className="flex flex-col gap-2.5 text-sm text-gray-500 font-medium">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Cancellation & Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-4">
            <p className="text-white font-black text-sm tracking-widest uppercase">Registered Office</p>
            <div className="w-6 h-[1px] bg-[#f59e0b]/60" />
            <p className="text-gray-400 text-xs font-medium leading-relaxed">
              NatureXpress Skills Hub<br />
              Vijay Nagar, Indore, MP - 452010<br />
              support@naturexpress.in
            </p>
            <a 
              href="https://wa.me/918077170715"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 font-bold text-xs bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-xl w-fit hover:bg-green-500/20 transition-all"
            >
              <span>Chat on WhatsApp (+91 8077170715)</span>
            </a>
          </div>

        </div>
      </div>

      {/* Big Wordmark */}
      <div className="relative w-full flex justify-center items-center py-12 md:py-16 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        <h2
          className="text-[12vw] md:text-[10vw] leading-none font-black tracking-tighter lowercase text-white/[0.04] w-full text-center"
          aria-hidden="true"
        >
          NatureXpress<span className="text-[#f59e0b]/10">hub</span>
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-medium">
            © {year} NatureXpress Hub. All rights reserved. Founded by{' '}
            <span className="text-gray-400 font-bold">Chetan Pratap Singh</span>.
          </p>
          <div className="flex items-center gap-4 text-gray-600 text-xs">
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-gray-400 transition-colors">Refund Policy</Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
