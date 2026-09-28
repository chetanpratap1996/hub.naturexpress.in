import { motion, AnimatePresence } from 'framer-motion';

const PaymentSuccessModal = ({ isOpen, onClose, paymentDetails }) => {
  if (!isOpen || !paymentDetails) return null;

  const { paymentId, amount, trackName, userDetails } = paymentDetails;
  const studentName = userDetails?.name || 'Student';

  const whatsappMsg = `Hi Chetan! I've successfully enrolled in NatureXpress *${trackName}* Sprint!\n\n💳 *Payment ID:* ${paymentId}\n💰 *Amount Paid:* ₹${amount}\n👤 *Name:* ${studentName}\n📞 *Phone:* ${userDetails?.phone || 'N/A'}\n\nPlease add me to the active company sprint cohort for Next Working Day Onboarding!`;
  const whatsappUrl = `https://wa.me/918077170715?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl text-slate-900 text-center overflow-hidden"
        >
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 animate-bounce">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            🎉 Enrollment Confirmed!
          </span>

          <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
            Welcome To NatureXpress, {studentName}!
          </h3>
          <p className="text-xs text-slate-600 mb-6">
            Your payment was processed successfully. You are officially enrolled in live company sprints.
          </p>

          {/* Receipt Breakdown Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2 mb-6">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Transaction ID:</span>
              <span className="font-mono font-extrabold text-slate-900">{paymentId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Selected Track:</span>
              <span className="font-bold text-indigo-600">{trackName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Amount Paid:</span>
              <span className="font-extrabold text-emerald-600">₹{amount} (Monthly Membership)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-500">Onboarding Schedule:</span>
              <span className="font-bold text-slate-900">Next Working Day (2 Hrs/Day Live)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💬 Join Active Cohort WhatsApp Group</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.514 0-9.997 4.484-9.997 9.998 0 2.155.684 4.15 1.847 5.782l-1.847 5.42 5.586-1.789c1.564 1.01 3.42 1.587 5.411 1.587 5.515 0 9.998-4.484 9.998-9.998 0-5.514-4.483-9.998-9.998-9.998z" />
              </svg>
            </a>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Close & Return to Dashboard
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default PaymentSuccessModal;
