import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  return (
    <section className="relative w-full bg-black flex justify-center items-center pt-24 md:pt-[100px]" id="home">
      <h1 className="sr-only">NatureXpress Hub - Enterprise Web Apps, AI Automation & Growth Systems</h1>
      <img
        src="/hero-bg.png"
        alt="Hero Section"
        className="w-full h-auto object-contain"
      />
    </section>
  );
};

export default Hero;
