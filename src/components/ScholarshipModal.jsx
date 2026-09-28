import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackScholarshipApplication } from '../lib/analytics';
import { sendScholarshipToGoogleSheets } from '../lib/webhook';

const ScholarshipModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [track, setTrack] = useState('web');
  const [status, setStatus] = useState('student');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const scholarshipData = {
      name,
      phone,
      track,
      status,
      reason,
      appliedAt: new Date().toISOString()
    };

    console.log('⚡ New Merit Scholarship Application:', scholarshipData);
    trackScholarshipApplication(scholarshipData);
    sendScholarshipToGoogleSheets(scholarshipData);

    const existingApps = JSON.parse(localStorage.getItem('nx_scholarships') || '[]');
    existingApps.push(scholarshipData);
    localStorage.setItem('nx_scholarships', JSON.stringify(existingApps));

    setIsSubmitted(true);

    const message = `Hi Chetan & HR Lead! I'm applying for one of the *5 Monthly Merit Scholarship Seats* (50% Cashback / ₹2,000 Refund).\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🚀 *Track:* ${track.toUpperCase()}\n💼 *Status:* ${status}\n📝 *Reason:* ${reason || 'Dedicated to working 2 hrs/day on live sprints'}\n\nPlease review my application for the 50% Merit Refund eligibility!`;
    const whatsappUrl = `https://wa.me/918077170715?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl text-slate-900 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold"
          >
            ✕
          </button>

          {/* Badge & Title */}
          <div className="text-center mb-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              🔥 Limited to 2 Merit Seats / Month
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Apply For <span className="text-indigo-600">50% Merit Scholarship</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Selected merit candidates enroll at ₹3,999 and receive <strong>50% Cashback (₹2,000 Refunded)</strong> directly back to their account upon completing 14 days of sprint participation!
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Domain Track *</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold outline-none focus:border-indigo-600"
                >
                  <option value="web">💻 Web & Software Dev (IT Team + HR)</option>
                  <option value="marketing">📈 Digital Growth & Ads (Growth Head + HR)</option>
                  <option value="design">🎨 Graphic Design & UI/UX (Design Lead + HR)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Status *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-indigo-600"
                >
                  <option value="student">Final Year / Recent Graduate</option>
                  <option value="fresher">Fresher Looking for First Job</option>
                  <option value="working">Working Professional Switching Career</option>
                  <option value="freelancer">Freelancer Scaling Retainer Income</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Why do you deserve 1 of the 2 Merit Seats? *</label>
                <textarea
                  rows="3"
                  placeholder="Share your dedication to working 2 hrs/day on live company projects..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer text-center"
              >
                Submit Application for 1 of 2 Merit Seats →
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto">
                ✓
              </div>
              <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Redirecting to WhatsApp to verify your eligibility for 1 of the 2 monthly Merit Cashback seats...
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScholarshipModal;
