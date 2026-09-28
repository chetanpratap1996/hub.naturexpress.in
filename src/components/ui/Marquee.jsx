import { motion } from 'framer-motion';

export const Marquee = ({
  children,
  speed = 25,
  direction = 'left',
  className = '',
}) => {
  return (
    <div className={`overflow-hidden flex w-full select-none ${className}`}>
      <motion.div
        className="flex shrink-0 gap-6 items-center min-w-full"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0 gap-6 items-center min-w-full"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
