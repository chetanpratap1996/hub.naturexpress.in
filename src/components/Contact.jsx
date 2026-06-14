import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ─── Contact Links ─── */
const contactLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+91 8077170715',
    href: 'https://wa.me/918077170715',
    hoverClass: 'hover:text-green-400 hover:border-green-400/30 hover:bg-green-400/5',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: 'Email',
    value: 'chetan.pratap@naturexpress.in',
    href: 'mailto:chetan.pratap@naturexpress.in',
    hoverClass: 'hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/chetanpratap',
    href: 'https://linkedin.com/in/chetanpratap',
    hoverClass: 'hover:text-sky-400 hover:border-sky-400/30 hover:bg-sky-400/5',
  },
];

const BUDGET_OPTIONS = ['< ₹25K', '₹25K–₹1L', '₹1L–₹5L', '₹5L+', 'Let\'s Discuss'];
const SERVICE_TAGS = ['Web Dev', 'App Dev', 'Marketing', 'AI Automation', 'YouTube Growth'];

/* ─── Floating Label Input ─── */
const FloatingInput = ({ id, name, type = 'text', label, required }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative">
      <input
        id={id} name={name} type={type} required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value !== ''); }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        className="peer w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 pt-6 pb-3 text-white text-base font-medium outline-none focus:border-[#f59e0b]/70 focus:bg-white/[0.06] hover:border-white/20 transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 font-semibold text-sm transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'top-2.5 text-[10px] tracking-widest uppercase text-[#f59e0b]'
            : 'top-1/2 -translate-y-1/2 text-gray-500'
        }`}
      >
        {label}
      </label>
      {focused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: '0 0 0 2px rgba(245,158,11,0.25)' }}
        />
      )}
    </div>
  );
};

/* ─── Floating Label Textarea ─── */
const FloatingTextarea = ({ id, name, label, required }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative">
      <textarea
        id={id} name={name} required={required} rows={5}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value !== ''); }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        className="peer w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 pt-8 pb-4 text-white text-base font-medium outline-none resize-none focus:border-[#f59e0b]/70 focus:bg-white/[0.06] hover:border-white/20 transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 font-semibold text-sm transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'top-3 text-[10px] tracking-widest uppercase text-[#f59e0b]'
            : 'top-5 text-gray-500'
        }`}
      >
        {label}
      </label>
      {focused && (
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: '0 0 0 2px rgba(245,158,11,0.25)' }} />
      )}
    </div>
  );
};

/* ─── Main Component ─── */
const Contact = () => {
  const sectionRef = useRef(null);
  const [result, setResult] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('sending');
    const formData = new FormData(event.target);
    formData.append('access_key', '1de2f4c1-4e93-4437-8886-916c9444816e');
    if (selectedBudget) formData.append('Budget', selectedBudget);

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setResult('success');
        setIsSuccess(true);
        event.target.reset();
        setSelectedBudget('');
        setTimeout(() => setResult(''), 5000);
      } else {
        setResult('error');
        setTimeout(() => setResult(''), 4000);
      }
    } catch {
      setResult('error');
      setTimeout(() => setResult(''), 4000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#020202] w-full py-32 px-6 md:px-12 overflow-hidden font-sans border-t border-white/[0.04]"
    >
      {/* Animated background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#f59e0b]/[0.07] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/[0.05] rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6"
          >
            Let's Build{' '}
            <span className="text-gradient-orange">Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto font-medium"
          >
            Have a project in mind? Let's talk. I typically respond within 24 hours.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">

          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* Availability */}
            <div className="inline-flex items-center gap-3 w-fit">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-green-400 font-bold text-sm">Currently Accepting New Clients</span>
            </div>

            {/* Blockquote */}
            <div className="relative pl-6 border-l-2 border-[#f59e0b]/50">
              <p className="text-gray-300 text-xl md:text-2xl font-medium leading-relaxed max-w-md italic">
                "Whether you need a full-stack app, a marketing overhaul, or an AI-powered system — NatureXpress Hub is here to make it happen."
              </p>
              <p className="text-[#f59e0b] font-black mt-4 not-italic text-sm tracking-wide">— Chetan Pratap Singh, Founder</p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-600 mb-2">Reach Me On</p>
              {contactLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-gray-400 ${link.hoverClass} transition-all duration-300 group`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{link.label}</p>
                    <p className="text-xs mt-0.5 font-medium truncate">{link.value}</p>
                  </div>
                  <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Trust strip */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#f59e0b]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">100% Private & Secure</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Your information is never shared. Direct line to Chetan — <span className="text-white/50">hub.naturexpress.in</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-3xl blur-xl opacity-60" />

            <div className="relative bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">

              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-white font-black text-xl">Send a Message</h3>
                  <p className="text-gray-600 text-xs mt-1 font-medium">I'll reply within 24 hours</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#f59e0b]">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-4xl mb-6">✅</div>
                    <h4 className="text-white font-black text-2xl mb-2">Message Sent!</h4>
                    <p className="text-gray-500 font-medium">I'll get back to you very soon. Thank you!</p>
                    <button
                      onClick={() => { setIsSuccess(false); setResult(''); }}
                      className="mt-8 px-6 py-2.5 bg-white/5 border border-white/10 text-gray-400 text-sm font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4">
                      <FloatingInput id="firstName" name="First Name" label="First Name" required />
                      <FloatingInput id="lastName"  name="Last Name"  label="Last Name"  required />
                    </div>

                    <FloatingInput id="email"   name="Email"   type="email" label="Email Address"        required />
                    <FloatingInput id="subject" name="Subject"              label="Project Type / Subject" />
                    <FloatingTextarea id="message" name="Message" label="Tell me about your project..." required />

                    {/* Service tags */}
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 mb-3">I'm interested in</p>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_TAGS.map((tag) => (
                          <label key={tag} className="cursor-pointer">
                            <input type="checkbox" name="services" value={tag} className="sr-only peer" />
                            <span className="px-3 py-1.5 text-xs font-bold rounded-full border border-white/10 text-gray-500 peer-checked:bg-[#f59e0b]/15 peer-checked:border-[#f59e0b]/50 peer-checked:text-[#f59e0b] hover:border-white/20 hover:text-gray-300 transition-all duration-200 select-none block">
                              {tag}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Budget selector */}
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 mb-3">Estimated Budget</p>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedBudget(selectedBudget === opt ? '' : opt)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 select-none ${
                              selectedBudget === opt
                                ? 'bg-white/10 border-white/40 text-white'
                                : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={result === 'sending'}
                      whileHover={{ scale: result === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full mt-2 py-4 bg-[#f59e0b] text-white font-black rounded-2xl text-base tracking-wide overflow-hidden hover:shadow-[0_15px_40px_rgba(245,158,11,0.45)] disabled:opacity-60 disabled:cursor-not-allowed transition-shadow duration-300"
                    >
                      {result === 'sending' ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-3">
                          Send Message
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                    </motion.button>

                    <AnimatePresence>
                      {result === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-center text-amber-400 text-sm font-bold"
                        >
                          ⚠️ Something went wrong. Please try again or WhatsApp me directly.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

