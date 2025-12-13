import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const ScrollReveal = ({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), springConfig);
  
  const getTransform = () => {
    switch (direction) {
      case 'up': return useTransform(scrollYProgress, [0, 0.3], [100, 0]);
      case 'down': return useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
      case 'left': return useTransform(scrollYProgress, [0, 0.3], [100, 0]);
      case 'right': return useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
      default: return useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    }
  };

  const transform = useSpring(getTransform(), springConfig);
  const isHorizontal = direction === 'left' || direction === 'right';

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        x: isHorizontal ? transform : 0,
        y: !isHorizontal ? transform : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export const TextRevealByWord = ({ text, className = '', staggerDelay = 0.05 }: TextRevealProps) => {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const HorizontalScrollSection = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export const ScaleOnScroll = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
