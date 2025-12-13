import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, Suspense } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TiltCard } from '../animations/GlowingCard';

const testimonials = [
  {
    quote: "NEXA Studio transformed our digital presence completely. The website they built not only looks stunning but converts at 3x our previous rate.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    company: "TechFlow",
  },
  {
    quote: "Working with NEXA was an absolute pleasure. Their attention to detail and commitment to excellence is unmatched in the industry.",
    author: "Michael Roberts",
    role: "Founder, InnovateCo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    company: "InnovateCo",
  },
  {
    quote: "The 3D animations and interactive elements they created elevated our brand to a whole new level. Highly recommended!",
    author: "Emily Watson",
    role: "Marketing Director, Luxe Brand",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    company: "Luxe Brand",
  },
  {
    quote: "Our e-commerce revenue increased by 200% within 3 months of launching the new platform. NEXA delivers results.",
    author: "David Park",
    role: "COO, StyleHub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    company: "StyleHub",
  },
];

const FloatingQuote = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <MeshDistortMaterial
          color="#FF4800"
          distort={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#FF4800" intensity={1} />
          <Suspense fallback={null}>
            <FloatingQuote />
          </Suspense>
        </Canvas>
      </div>

      {/* SVG Decorations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.circle
          cx="10%"
          cy="20%"
          r="100"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1"
          fill="none"
          style={{ rotate }}
        />
        <motion.circle
          cx="90%"
          cy="80%"
          r="150"
          stroke="hsl(var(--primary) / 0.1)"
          strokeWidth="1"
          fill="none"
          style={{ rotate }}
        />
      </svg>
      
      {/* Background Glow */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" 
      />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold uppercase tracking-wider"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4"
          >
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>
        
        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <TiltCard className="card-glass text-center p-8 md:p-12">
                {/* Stars */}
                <motion.div 
                  className="flex justify-center gap-1 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quote Icon */}
                <motion.div 
                  className="w-16 h-16 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote className="w-8 h-8 text-primary" />
                </motion.div>
                
                {/* Quote Text */}
                <motion.p 
                  className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonials[currentIndex].quote}"
                </motion.p>
                
                {/* Author */}
                <motion.div 
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))" }}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-lg">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <motion.button
              onClick={prev}
              className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-card hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            <motion.button
              onClick={next}
              className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-card hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
