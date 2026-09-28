import { motion } from 'framer-motion';

export const BorderBeam = ({
  className = '',
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#6366f1',
  colorTo = '#a855f7',
  delay = 0,
}) => {
  return (
    <div
      style={{
        '--size': size,
        '--duration': `${duration}s`,
        '--anchor': `${anchor}%`,
        '--border-width': `${borderWidth}px`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': `-${delay}s`,
      }}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
    >
      <motion.div
        className="absolute aspect-square w-[calc(var(--size)*1px)] animate-border-beam bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          offsetPath: `rect(0 auto auto 0 round calc(var(--size)*1px))`,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay,
        }}
      />
    </div>
  );
};

export default BorderBeam;
