import { motion } from 'framer-motion';

export const ShinyButton = ({
  children,
  onClick,
  className = '',
  variant = 'indigo', // 'indigo', 'amber', 'emerald'
  ...props
}) => {
  const gradients = {
    indigo: 'from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-200/50',
    amber: 'from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-amber-200/50',
    emerald: 'from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200/50',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r ${gradients[variant] || gradients.indigo} text-white font-extrabold text-sm shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group ${className}`}
      {...props}
    >
      {/* Animated Light Sweep Overlay */}
      <motion.span
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
        initial={{ x: '-150%' }}
        animate={{ x: '250%' }}
        transition={{
          repeat: Infinity,
          repeatDelay: 2.5,
          duration: 1.2,
          ease: 'easeInOut',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default ShinyButton;
