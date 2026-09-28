import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2">Contact NatureXpress</h1>
          <p className="text-sm text-slate-600 mt-3 font-medium">
            Have questions about our live company work sprints, enrollment, or business partnerships? Reach out directly to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Registered Business Details */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Registered Office</h2>
            
            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">🏢</span>
                <div>
                  <strong className="block font-bold text-slate-900">Entity Name:</strong>
                  <span>NatureXpress Skills Hub</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">📍</span>
                <div>
                  <strong className="block font-bold text-slate-900">Registered Office Address:</strong>
                  <span>Vijay Nagar, Indore, Madhya Pradesh - 452010, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">✉️</span>
                <div>
                  <strong className="block font-bold text-slate-900">Support Email:</strong>
                  <a href="mailto:support@naturexpress.in" className="text-indigo-600 font-bold underline">
                    support@naturexpress.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">📞</span>
                <div>
                  <strong className="block font-bold text-slate-900">Phone / WhatsApp Support:</strong>
                  <span>+91 80771 70715</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">⏰</span>
                <div>
                  <strong className="block font-bold text-slate-900">Working Hours:</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Send a Message</h2>
            
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                <p className="text-lg font-bold">Message Received! 🎉</p>
                <p className="text-xs">Our team will get back to you via WhatsApp or Email within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ankit Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-100 transition-all cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
