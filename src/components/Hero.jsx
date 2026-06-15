import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  return (
    <section
      className="relative w-full bg-black flex justify-center items-start pt-10 md:pt-12 min-h-[45vh] sm:min-h-[60vh] md:min-h-screen"
      id="home"
    >
      <h1 className="sr-only">NatureXpress Hub — Enterprise Web Development, AI Automation &amp; Digital Growth Agency in India</h1>
      <img
        src="/hero-bg.png"
        className="w-full h-auto object-contain"
        alt="NatureXpress Hub — Enterprise Digital Agency Hero"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
    </section>
  );
};

export default Hero;
