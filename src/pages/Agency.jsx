import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Manifesto from '../components/Manifesto';
import PortfolioShowcase from '../components/PortfolioShowcase';
import Process from '../components/Process';
import SocialProof from '../components/SocialProof';
import AboutHero from '../components/AboutHero';
import AboutTimeline from '../components/AboutTimeline';
import AboutTechStack from '../components/AboutTechStack';
import WhatsAppCTA from '../components/WhatsAppCTA';

const Agency = () => {
  return (
    <main className="bg-black text-white w-full overflow-hidden pt-20">
      
      {/* Top B2B Banner */}
      <div className="bg-[#f59e0b]/10 border-b border-[#f59e0b]/20 py-2.5 px-4 text-center">
        <p className="text-xs font-semibold text-[#f59e0b]">
          💼 NatureXpress Enterprise Agency — Building Custom Web Apps, AI Automation & Growth Engines for Businesses.{' '}
          <Link to="/" className="underline font-bold text-white hover:text-[#f59e0b] ml-1">
            Looking for Skills Hub & Student Programs? Click Here →
          </Link>
        </p>
      </div>

      <Hero />
      <Manifesto />
      <Services />
      <PortfolioShowcase />
      <Process />
      <SocialProof />
      
      {/* Integrated About Section */}
      <div id="about">
        <AboutHero />
        <AboutTimeline />
        <AboutTechStack />
      </div>

      <Contact />
      <WhatsAppCTA />
    </main>
  );
};

export default Agency;
