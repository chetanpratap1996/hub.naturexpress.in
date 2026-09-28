const RefundPolicy = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">Razorpay Merchant Policy</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">Cancellation & Refund Policy</h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: September 28, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. 7-Day Money-Back Guarantee</h2>
            <p>
              We stand behind the quality of our live company work sprints. If you enroll in NatureXpress Skills Hub and feel the live 2-hour daily work sprints with our engineering or marketing leads are not suited for you, you are eligible for a 100% full refund within 7 days of your enrollment payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. How to Request a Refund</h2>
            <p>
              To initiate a refund request, send an email to <a href="mailto:support@naturexpress.in" className="text-indigo-600 underline font-bold">support@naturexpress.in</a> with your registered full name, phone number, and Razorpay Payment ID (`pay_xxxxxx`).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Processing & Credit Timeline</h2>
            <p>
              Once approved, refund requests are processed immediately. Funds will be credited back to your original payment source (UPI account, Bank Account, or Credit/Debit Card) within <strong>5 to 7 business days</strong> as per standard Razorpay processing timelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Subscription Cancellation</h2>
            <p>
              NatureXpress operates on a flexible monthly subscription model (₹3,999/month standard or ₹1,999/month scholarship tier). You can cancel your monthly subscription renewal at any time without penalty by contacting our support team prior to your next billing cycle.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
