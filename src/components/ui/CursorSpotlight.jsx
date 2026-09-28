import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * AnimatedCursor — Smooth spring-physics follower ring cursor with click sparks.
 * Fully interactive and smooth on mouse movement & scroll.
 */
export const CursorSpotlight = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const sparksRef = useRef([]);
  const canvasRef = useRef(null);

  // Smooth springs for cursor position
  const cursorX = useSpring(-100, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 30 });
  
  // Outer ring spring (slower for trailing effect)
  const ringX = useSpring(-100, { stiffness: 180, damping: 22 });
  const ringY = useSpring(-100, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check if hovering over clickable element
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
         target.tagName === 'A' ||
         target.onclick ||
         target.closest('button') ||
         target.closest('a') ||
         target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = (e) => {
      setIsMouseDown(true);
      // Generate click sparks
      const now = performance.now();
      const count = 8;
      const newSparks = Array.from({ length: count }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / count,
        startTime: now,
      }));
      sparksRef.current.push(...newSparks);
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  // Click spark canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const duration = 400;

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) return false;
        const progress = elapsed / duration;
        const eased = progress * (2 - progress);

        const distance = eased * 24;
        const lineLen = 8 * (1 - progress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLen) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLen) * Math.sin(spark.angle);

        ctx.strokeStyle = `rgba(99, 102, 241, ${1 - progress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Click Spark Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
      />

      {/* Trailing Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-indigo-500/60 bg-indigo-500/10 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 54 : isMouseDown ? 28 : 40,
          height: isHovering ? 54 : isMouseDown ? 28 : 40,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
          borderColor: isHovering ? 'rgba(79, 70, 229, 0.9)' : 'rgba(99, 102, 241, 0.5)',
        }}
      />

      {/* Crisp Center Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-indigo-600 shadow-md shadow-indigo-500/50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 10 : isMouseDown ? 6 : 8,
          height: isHovering ? 10 : isMouseDown ? 6 : 8,
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </>
  );
};

export default CursorSpotlight;
