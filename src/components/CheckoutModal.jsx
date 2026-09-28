import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initiateRazorpayCheckout } from '../lib/razorpay';

const CheckoutModal = ({ isOpen, onClose, initialTrack = 'web', isScholarshipTier = false, onSuccessPayment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [track, setTrack] = useState(initialTrack);
  const [tier, setTier] = useState(isScholarshipTier ? 'scholarship' : 'standard');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Uniform upfront fee is ₹3,999 (with 50% Cashback refund terms on Merit tier)
  const currentPrice = 3999;

  const trackLabels = {
    web: 'Web & App Development Sprint (with IT Team)',
    marketing: 'Digital Growth & Ads Sprint (with Marketing Head)',
    design: 'Graphic & UI/UX Design Sprint (with Product Lead)'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    setIsProcessing(true);

    initiateRazorpayCheckout({
      amount: currentPrice,
      trackName: trackLabels[track] || 'Web Development Sprint',
      userDetails: { name, email, phone, city },
      onSuccess: (paymentData) => {
        setIsProcessing(false);
        onClose();
        if (onSuccessPayment) {
          onSuccessPayment(paymentData);
        }
      },
      onFailure: (err) => {
        setIsProcessing(false);
        console.log('Payment checkout cancelled or failed:', err);
      }
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl text-slate-900 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              ⚡ Next Working Day Onboarding
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Join <span className="text-indigo-600">NatureXpress Live Sprint</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Work 2 Hours/Day directly with active company leads. Flexible monthly subscription, cancel anytime.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Select Track */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Sprint Track *</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:border-indigo-600 outline-none"
              >
                <option value="web">💻 Web & App Dev (with IT Team + HR)</option>
                <option value="marketing">📈 Digital Growth & Ads (with Marketing Head + HR)</option>
                <option value="design">🎨 Graphic Design & UI/UX (with UI Lead + HR)</option>
              </select>
            </div>

            {/* Pricing Tier Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTier('standard')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tier === 'standard'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold text-slate-900">Standard Plan</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <p className="text-lg font-black text-indigo-700">₹3,999<span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-[10px] text-slate-500 mt-0.5">Flexible monthly subscription</p>
              </button>

              <button
                type="button"
                onClick={() => setTier('scholarship')}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  tier === 'scholarship'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  50% Cashback
                </span>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold text-slate-900">Merit Refund</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
                <p className="text-lg font-black text-amber-700">₹3,999<span className="text-xs font-normal text-slate-500">/mo</span></p>
                <p className="text-[10px] text-amber-800 font-bold mt-0.5">Earn 50% (₹2,000) Cashback</p>
              </button>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
              <input
                type="text"
                placeholder="e.g. Indore / Remote"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer text-center mt-2 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Onboarding...' : `Proceed to Secure Checkout • ₹3,999 →`}
            </button>

            <p className="text-[11px] text-center text-slate-500 font-medium">
              🔒 256-Bit SSL Encrypted Payment via Razorpay • 100% Risk-Free Guarantee
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
