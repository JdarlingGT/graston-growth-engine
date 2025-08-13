import { useEffect, useRef } from 'react';
import { useInView, animate, motion } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ from = 0, to, duration = 1.5, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <motion.span ref={ref} className={className} />;
};

export default AnimatedCounter;