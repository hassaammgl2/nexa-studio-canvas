import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  gradient?: boolean;
}

export const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  as: Tag = 'span',
  gradient = false
}: AnimatedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className={`mr-2 md:mr-3 inline-block ${gradient ? 'gradient-text' : ''}`}
            variants={child}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedLetters = ({ text, className = '', delay = 0 }: AnimatedLettersProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealText = ({ children, className = '', delay = 0 }: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
