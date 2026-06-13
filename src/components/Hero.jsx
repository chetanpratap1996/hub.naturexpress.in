import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  return (
    <section className="relative w-full bg-black flex justify-center items-center pt-24 md:pt-[100px]" id="home">
      <img
        src="/hero-bg.png"
        alt="Hero Section"
        className="w-full h-auto object-contain"
      />
    </section>
  );
};

export default Hero;
