import { motion } from 'framer-motion';

export const AnimatedGridPattern = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Background SVG Grid */}
      <svg
        className="absolute w-full h-full opacity-[0.04] stroke-slate-900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Floating Glowing Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-400/15 rounded-full blur-[140px]"
      />
    </div>
  );
};

export default AnimatedGridPattern;
