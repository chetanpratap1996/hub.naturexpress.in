import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, ChevronDown, ChevronUp, Eye, DollarSign, Activity, ShieldCheck, Award, MessageSquare, Sparkles } from 'lucide-react';

const PresenterToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSalesCues, setShowSalesCues] = useState(false);

  const phases = [
    { id: 'market-reality', label: 'Phase 1: Insider Reality', icon: Eye, color: 'text-indigo-600' },
    { id: 'value-matrix', label: 'Phase 2: Pay Formula', icon: DollarSign, color: 'text-emerald-600' },
    { id: 'live-audit', label: 'Phase 3: 60s Audit', icon: Activity, color: 'text-blue-600' },
    { id: 'solution-bridge', label: 'Phase 4: Sprint Bridge', icon: ShieldCheck, color: 'text-sky-600' },
    { id: 'market-proof', label: 'Phase 5: Proof & Close', icon: Award, color: 'text-amber-600' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Presenter Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-2 text-slate-900">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Presentation className="w-4 h-4 text-indigo-100" />
              <span>Google Meet Sales Deck Navigator</span>
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowSalesCues(!showSalesCues)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showSalesCues 
                  ? 'bg-amber-100 border-amber-300 text-amber-900' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>{showSalesCues ? 'Hide Talk Cues' : 'Show Talk Cues'}</span>
            </button>
          </div>

          {/* Expanded Phase Jump Bar */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-slate-200 space-y-1.5"
              >
                {phases.map((phase) => {
                  const IconComp = phase.icon;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => scrollToSection(phase.id)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className={`w-3.5 h-3.5 ${phase.color}`} />
                        <span>{phase.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600">Jump →</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Floating Sales Cue Card Overlay */}
      {showSalesCues && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-6 z-40 max-w-sm bg-white/95 border border-amber-300 rounded-2xl p-4 text-slate-900 shadow-2xl backdrop-blur-md font-sans"
        >
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
            <span className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>LIVE CALL PRESENTER TALK TRACK</span>
            </span>
            <button 
              onClick={() => setShowSalesCues(false)}
              className="text-slate-400 hover:text-slate-700 text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-80 overflow-y-auto pr-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-indigo-700 block mb-1">PHASE 1: MARKET REALITY</span>
              <p className="text-slate-700">"98% of applicants get auto-rejected by ATS bots across Web Dev, Marketing, and Design. Let's look at where the top 15% of offers and client contracts are actually hiding..."</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-emerald-700 block mb-1">PHASE 2: PAY FORMULA</span>
              <p className="text-slate-700">"Companies don't pay for certificates. Salary is calculated by Execution Value ÷ Risk. Here is what separates a beginner from a production specialist."</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-blue-700 block mb-1">PHASE 3: LIVE AUDIT</span>
              <p className="text-slate-700">"Let's run a live 60-second check on your profile right now. Select your domain—Web Dev, Digital Marketing, or Graphic Design—and let's test your 5 screening pillars."</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-sky-700 block mb-1">PHASE 4: SPRINT ENGINE</span>
              <p className="text-slate-700">"Here is how we plug those exact gaps in 30 days—working 2 hours daily alongside active IT, Growth Marketing, and Design leads on production output."</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-amber-800 block mb-1">PHASE 5: CLOSE</span>
              <p className="text-slate-700">"Since we're on the call today, let's submit your merit scholarship application for the upcoming cohort."</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PresenterToolbar;
