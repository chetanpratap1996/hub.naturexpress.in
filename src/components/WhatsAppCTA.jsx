import { motion } from 'framer-motion';
import { trackWhatsAppContact } from '../lib/analytics';

const WhatsAppCTA = () => {
  const whatsappNumber = '918077170715';
  const message = "Hi Chetan, I found NatureXpress Hub and I'd like to discuss a project with you!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    trackWhatsAppContact('Footer_CTA');
  };

  return (
    <section className="bg-[#030303] py-24 px-6 md:px-12 relative overflow-hidden border-t border-white/[0.04]">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#25D366]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0c0c0c] border border-white/[0.08] rounded-[3rem] p-10 md:p-16 overflow-hidden text-center"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/8 rounded-bl-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f59e0b]/8 rounded-tr-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">

            {/* WhatsApp icon with pulse ring */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-20 h-20 mb-8"
            >
              {/* Pulse rings */}
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-[#25D366]/50"
              />
              <motion.div
                animate={{ scale: [1, 2.4], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-[#25D366]/30"
              />
              <div className="relative w-full h-full bg-[#25D366]/10 rounded-full flex items-center justify-center border border-[#25D366]/30">
                <svg className="w-10 h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
            </motion.div>

            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
              <span className="text-[#25D366] text-xs font-bold tracking-[0.2em] uppercase">Limited Slots — Responding Within 2 Hours</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Skip the back-and-forth.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#7ee8a2]">
                Chat directly with Chetan.
              </span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed">
              Get a free 15-minute strategy call. No forms, no waiting — just a direct conversation about your project goals with our founder.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(37,211,102,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-black text-base hover:bg-[#20bd5a] transition-all duration-300"
              >
                <span>Chat on WhatsApp Now</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white font-bold text-base hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                Send a Message Instead
              </motion.a>
            </div>

            {/* Trust micro-copy */}
            <p className="mt-8 text-gray-600 text-xs font-medium">
              🔒 No spam. No obligation. Just results-focused conversation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;

