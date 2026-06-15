import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate toward end
        const increment = prev < 70 ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    const doneTimer = setTimeout(() => {}, 1800);
    const hideTimer = setTimeout(() => setIsLoading(false), 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(doneTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-[100dvh] z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d0d0d 100%)' }}
        >
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

          {/* Ambient glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f59e0b]/10 rounded-full blur-[120px]" />
          </motion.div>

          {/* Center content */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-10"
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              className="flex flex-col items-center gap-2"
            >
              {/* NX monogram */}
              <div className="relative w-16 h-16 mb-2">
                <div className="absolute inset-0 rounded-2xl bg-[#f59e0b] opacity-20 blur-lg scale-125" />
                <div className="relative w-16 h-16 rounded-2xl bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center">
                  <span className="text-[#f59e0b] font-black text-2xl tracking-tighter">NX</span>
                </div>
              </div>

              {/* Brand text */}
              <div className="relative overflow-hidden">
                <motion.p
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  className="text-white text-3xl md:text-4xl font-black tracking-tight"
                >
                  NatureXpress<span className="text-[#f59e0b]">Hub</span>
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-[10px] font-black tracking-[0.35em] text-zinc-500 uppercase"
              >
                Digital Agency
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 md:w-64 flex flex-col items-center gap-3">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] font-black tracking-[0.3em] text-zinc-600 tabular-nums"
              >
                {Math.min(Math.floor(progress), 100)}%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

