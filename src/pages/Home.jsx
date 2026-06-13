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

const Home = () => {
  return (
    <main className="bg-black text-white w-full overflow-hidden">
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

export default Home;
