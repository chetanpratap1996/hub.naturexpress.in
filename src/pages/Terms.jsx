const Terms = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">Legal Agreement</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: September 28, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Overview & Agreement</h2>
            <p>
              Welcome to NatureXpress Skills Hub ("Company", "we", "us", or "our"). By enrolling in our training programs, live company work sprints, or accessing our platforms at hub.naturexpress.in, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Educational & Work Sprint Model</h2>
            <p>
              NatureXpress provides live 2-hour daily practical training and work sprints guided by active industry engineers, marketing leads, and recruitment professionals. Enrolled candidates receive experience certifications upon successful completion of sprint milestones and code/campaign deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Subscription & Fee Structure</h2>
            <p>
              Tuition for NatureXpress Live Sprints operates on a flexible monthly subscription model (standard rate of ₹3,999/month or ₹1,999/month for verified merit scholarship recipients). Payments are processed securely via Razorpay. Subscriptions grant active access to live sprint sessions, mentor code reviews, and career placement resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Code of Conduct & Intellectual Property</h2>
            <p>
              Students retain ownership of their personal portfolio code. Proprietary company tools, internal client assets, and trade secrets disclosed during sprints remain the exclusive property of NatureXpress. Unprofessional conduct or unauthorized distribution of proprietary materials may result in termination of enrollment without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">5. Contact Information</h2>
            <p>
              For any legal questions regarding these terms, please contact our support team at <a href="mailto:support@naturexpress.in" className="text-indigo-600 underline font-bold">support@naturexpress.in</a> or visit our registered office in Indore, MP.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Terms;
