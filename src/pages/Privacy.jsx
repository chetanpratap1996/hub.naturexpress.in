const Privacy = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">Data Protection</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: September 28, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect personal details provided during registration and skill audits, including your name, email address, phone number, city, resume documents, and track preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Payment Processing</h2>
            <p>
              All online payments are securely processed by Razorpay Payments Private Limited. NatureXpress does not store sensitive payment credential data (card numbers, UPI PINs, CVVs) on our local servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. How We Use Your Data</h2>
            <p>
              Your information is used solely to facilitate your onboarding into live company work sprints, issue experience letters, process payments, and coordinate 1-on-1 career placement guidance with our HR team. We never sell your data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Data Inquiries & Contact</h2>
            <p>
              If you wish to update or remove your candidate details from our database, email us at <a href="mailto:support@naturexpress.in" className="text-indigo-600 underline font-bold">support@naturexpress.in</a>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
