import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Core Sections
import HeroSection from '../components/HeroSection';
import MarketRealitySection from '../components/MarketRealitySection';
import ValueMatrixSection from '../components/ValueMatrixSection';
import CandidateEmployabilityAudit from '../components/CandidateEmployabilityAudit'; // Unified Dual-Mode Audit Engine
import SolutionBridgeSection from '../components/SolutionBridgeSection';
import MarketProofSection from '../components/MarketProofSection';

import PractitionerTeam from '../components/PractitionerTeam';
import InteractiveHubBox from '../components/InteractiveHubBox';
import ProofGallery from '../components/ProofGallery';
import TrackDetails from '../components/TrackDetails';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

// Modals & Floating CTAs
import ScholarshipModal from '../components/ScholarshipModal';
import CheckoutModal from '../components/CheckoutModal';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import WhatsAppCTA from '../components/WhatsAppCTA';

const Home = () => {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);

  // Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTrack, setCheckoutTrack] = useState('web');
  const [isScholarshipTier, setIsScholarshipTier] = useState(false);
  const [paymentSuccessDetails, setPaymentSuccessDetails] = useState(null);

  const handleOpenCheckout = (track = 'web', isScholarship = false) => {
    setCheckoutTrack(track);
    setIsScholarshipTier(isScholarship);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentSuccessDetails(paymentData);
  };

  return (
    <main className="bg-white text-slate-900 w-full overflow-hidden relative selection:bg-indigo-600 selection:text-white">

      {/* ── 1. HERO SECTION: THE UNFILTERED HOOK ── */}
      <HeroSection />

      {/* ── 2. HIRING & CLIENT MARKET REALITY ── */}
      <MarketRealitySection />

      {/* ── 3. SKILL & COMPENSATION MATRIX ── */}
      <ValueMatrixSection />

      {/* ── 4. CANDIDATE EMPLOYABILITY AUDIT (DUAL-MODE RESUME SCAN & DIAGNOSTIC) ── */}
      <CandidateEmployabilityAudit onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* ── 5. THE DAILY SPRINT ENGINE ── */}
      <SolutionBridgeSection onOpenCheckout={handleOpenCheckout} />

      {/* Active Practitioner Team */}
      <PractitionerTeam onOpenEnrollment={(track) => handleOpenCheckout(track, false)} />

      {/* Daily Sprint Preview */}
      <InteractiveHubBox onOpenCheckout={handleOpenCheckout} />

      {/* Sprint Curriculum & Track Details */}
      <div className="bg-slate-50/50 border-t border-slate-200/80">
        <TrackDetails onOpenEnrollment={(track) => handleOpenCheckout(track, false)} />
      </div>

      {/* ── 6. VERIFIED DEPLOYED PROOF & MEMBERSHIP ── */}
      <MarketProofSection 
        onOpenCheckout={handleOpenCheckout} 
        onOpenScholarship={() => setIsScholarshipOpen(true)} 
      />

      {/* Proof Gallery */}
      <ProofGallery />

      {/* Wall of Love & Reviews */}
      <div className="bg-white">
        <Testimonials />
      </div>

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* B2B Agency Banner */}
      <section className="py-14 bg-slate-900 text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-300 text-sm font-medium mb-2">
            Are you a business looking for custom software, growth marketing, or AI automation?
          </p>
          <Link to="/agency" className="inline-flex items-center gap-2 text-indigo-400 font-extrabold text-sm hover:underline">
            <span>Visit NatureXpress B2B Digital Agency Services →</span>
          </Link>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppCTA />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialTrack={checkoutTrack}
        isScholarshipTier={isScholarshipTier}
        onSuccessPayment={handlePaymentSuccess}
      />

      <PaymentSuccessModal
        isOpen={!!paymentSuccessDetails}
        onClose={() => setPaymentSuccessDetails(null)}
        paymentDetails={paymentSuccessDetails}
      />

    </main>
  );
};

export default Home;
