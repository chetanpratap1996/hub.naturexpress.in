import { motion } from 'framer-motion';

export const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-900 ${className}`}
      style={{
        backgroundSize: '200% auto',
      }}
      animate={
        disabled
          ? {}
          : {
              backgroundPosition: ['0% center', '200% center'],
            }
      }
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
