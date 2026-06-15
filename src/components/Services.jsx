import { useRef, useState } from "react";
import { motion } from 'framer-motion';

/* ── Service Data ─────────────────────────────────────────────── */
const services = [
  { id: '01', image: '/services_images/web_dev.png' },
  { id: '02', image: '/services_images/Digital_marketing.png' },
  { id: '03', image: '/services_images/AI_Automation.png' },
  { id: '04', image: '/services_images/YouTube_Growth.png' },
];

/* ── 3D Tilt Card Component ───────────────────────────────────── */
const TiltCard = ({ service, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Calculate 3D rotation (max 6 degrees for smooth subtle effect)
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotX = ((y - centerY) / centerY) * -6; 
    const rotY = ((x - centerX) / centerX) * 6;
    
    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate glare position based on cursor
    setGlareX((x / box.width) * 100);
    setGlareY((y / box.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full relative z-10"
      style={{ perspective: "2000px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-crosshair group flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Glowing Border Behind Image */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(245,158,11,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* The Main Image */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="p-4 md:p-6 w-full">
          <img 
            src={service.image} 
            alt={`Service ${service.id}`} 
            className="w-full h-auto object-contain mix-blend-lighten pointer-events-none"
          />
        </div>

        {/* Dynamic Glare Effect over the card */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
        
        {/* Hover Outline */}
        <div className="absolute inset-0 border-2 border-[#f59e0b]/0 group-hover:border-[#f59e0b]/30 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-700 pointer-events-none z-30" />
      </motion.div>
    </motion.div>
  );
};

/* ── Main Component ───────────────────────────────────────────── */
const Services = () => {
  return (
    <div className="bg-[#030303] relative overflow-hidden" id="services">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-[20%] right-0 w-[800px] h-[800px] bg-[#f59e0b]/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* ── Cinematic Header ── */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[#f59e0b] text-xs font-bold tracking-[0.2em] uppercase">What We Offer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter"
          >
            Services That{' '}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">Drive Results</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mt-8 font-medium leading-relaxed"
          >
            A comprehensive suite of digital services designed to build, market, automate, and scale your brand to the next level.
          </motion.p>
        </div>
      </section>

      {/* ── 2x2 Grid Section ── */}
      <section className="relative px-6 md:px-12 pb-10 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <TiltCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#f59e0b]/10 via-[#f59e0b]/5 to-transparent border border-[#f59e0b]/20 rounded-3xl px-8 py-12 md:p-14 shadow-2xl"
        >
          <div>
            <p className="text-white font-black text-3xl md:text-4xl tracking-tight">Ready to launch something great?</p>
            <p className="text-gray-400 mt-3 font-medium text-lg">Let's discuss your project and craft the right growth strategy together.</p>
          </div>
          <div className="flex gap-4 shrink-0 flex-wrap">
            <a
              href="#contact"
              className="px-8 py-4 bg-[#f59e0b] text-white font-black rounded-full hover:scale-105 hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] transition-all duration-300 tracking-wide text-sm uppercase"
            >
              Get in Touch →
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Services;
