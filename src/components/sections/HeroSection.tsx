import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useRef, Suspense } from 'react';
import { HeroScene } from '../three/HeroScene';
import { SVGMorphBackground } from '../animations/SVGMorphBackground';
import { AnimatedLetters, RevealText } from '../animations/AnimatedText';
import { MagneticButton } from '../animations/MagneticButton';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* SVG Morphing Background */}
      <SVGMorphBackground />
      
      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-10" />
      
      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="container-wide relative z-20 pt-32"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-foreground/80 font-medium tracking-wide">
              Award-Winning Digital Agency
            </span>
          </motion.div>
          
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-8 tracking-tight">
            <RevealText delay={0.2}>
              <span className="text-foreground">We Build</span>
            </RevealText>
            <RevealText delay={0.4}>
              <span className="gradient-text block mt-2">Digital</span>
            </RevealText>
            <RevealText delay={0.6}>
              <span className="text-foreground">Experiences</span>
            </RevealText>
          </h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            High-performance, animated, conversion-driven websites 
            for ambitious companies ready to dominate their markets.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/contact">
              <MagneticButton className="btn-primary flex items-center gap-3 text-lg group px-10 py-5">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>
            
            <Link to="/work">
              <MagneticButton className="btn-secondary flex items-center gap-3 text-lg group px-10 py-5">
                <Play className="w-5 h-5" />
                <span>View Our Work</span>
              </MagneticButton>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-3 gap-8 md:gap-16 mt-24 pt-12 border-t border-border/30"
          >
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '$2M+', label: 'Revenue Generated' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
