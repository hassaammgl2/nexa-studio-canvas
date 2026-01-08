import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Palette, Code, Rocket, BarChart, ArrowRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TiltCard, FloatingElement } from '@/components/animations/GlowingCard';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'We start by understanding your business, goals, audience, and competitive landscape through comprehensive research and stakeholder interviews.',
    deliverables: ['Stakeholder Interviews', 'Competitive Analysis', 'User Research', 'Technical Audit'],
    duration: '1-2 weeks',
    color: '#FF4800',
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Armed with insights, we craft a comprehensive digital strategy that aligns with your business objectives and sets clear KPIs.',
    deliverables: ['Strategy Document', 'Information Architecture', 'Content Strategy', 'Technical Specifications'],
    duration: '1-2 weeks',
    color: '#FF6B35',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Our designers create stunning, user-centered designs that bring your brand to life and optimize for conversion.',
    deliverables: ['Wireframes', 'Visual Design', 'Design System', 'Interactive Prototypes'],
    duration: '2-4 weeks',
    color: '#FF8F6B',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Our developers build your solution using cutting-edge technologies, ensuring performance, scalability, and maintainability.',
    deliverables: ['Frontend Development', 'Backend Development', 'API Integration', 'Quality Assurance'],
    duration: '4-8 weeks',
    color: '#FFB399',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'We deploy with precision, ensuring a smooth launch with comprehensive testing, monitoring, and support.',
    deliverables: ['Deployment', 'Performance Testing', 'Security Audit', 'Team Training'],
    duration: '1 week',
    color: '#FF4800',
  },
  {
    icon: BarChart,
    title: 'Growth',
    description: 'Post-launch, we continue to optimize and scale your digital presence based on real user data and business metrics.',
    deliverables: ['Analytics Setup', 'A/B Testing', 'Conversion Optimization', 'Ongoing Support'],
    duration: 'Ongoing',
    color: '#FF6B35',
  },
];

// 3D Process Scene Component
const ProcessScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} color="#FF4800" intensity={0.5} />
        <Suspense fallback={null}>
          <ProcessGeometry />
          <FloatingSteps />
        </Suspense>
      </Canvas>
    </div>
  );
};

const ProcessGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[-3, 2, -2]}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color="#FF4800"
            transparent
            opacity={0.3}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[4, -1, -3]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <MeshDistortMaterial
            color="#FF6B35"
            transparent
            opacity={0.4}
            distort={0.4}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[3, 3, -4]}>
          <octahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial
            color="#FF8F6B"
            transparent
            opacity={0.35}
            distort={0.35}
            speed={2.5}
            roughness={0.25}
            metalness={0.75}
          />
        </mesh>
      </Float>
    </group>
  );
};

const FloatingSteps = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FF4800" transparent opacity={0.6} />
    </points>
  );
};

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="pt-32 relative overflow-hidden">
      {/* 3D Background */}
      <ProcessScene />
      
      {/* Animated SVG Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Animated connecting lines */}
          <motion.path
            d="M0,400 Q360,200 720,400 T1440,400"
            stroke="url(#processGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          
          {/* Decorative circles */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={240 * (i + 1) - 120}
              cy={400 + Math.sin(i) * 100}
              r={20}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity={0.3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      {/* Hero */}
      <section className="section-padding relative">
        <div className="container-wide">
          <motion.div 
            style={{ y: heroY }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <FloatingElement>
                Our Process
              </FloatingElement>
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="How We " />
              <span className="gradient-text">
                <AnimatedLetters text="Make It Happen" delay={0.3} />
              </span>
            </h1>
            
            <RevealText delay={0.5}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our proven 6-step process ensures every project is delivered on time, 
                on budget, and exceeds expectations.
              </p>
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding relative">
        <div className="container-wide">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Number Bubble */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-8 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: index * 0.1 }}
                >
                  <span className="text-2xl font-bold gradient-text">{index + 1}</span>
                </motion.div>
                
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}>
                  <motion.div 
                    className={index % 2 === 1 ? 'lg:order-2' : ''}
                    whileHover={{ x: index % 2 === 1 ? -10 : 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                          animate={{ 
                            x: ["-100%", "100%"],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <step.icon className="w-10 h-10 text-primary relative z-10" />
                      </motion.div>
                      <div>
                        <span className="text-primary text-sm font-semibold tracking-wider">
                          STEP {index + 1}
                        </span>
                        <h3 className="text-3xl font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    
                    <RevealText delay={0.2}>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                    </RevealText>
                    
                    <motion.div 
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">
                        Duration: <span className="text-foreground font-medium">{step.duration}</span>
                      </span>
                    </motion.div>
                  </motion.div>
                  
                  <TiltCard className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="card-glass p-8 h-full relative overflow-hidden group">
                      {/* Animated border gradient */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                        }}
                      />
                      
                      <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-primary" />
                        Key Deliverables
                      </h4>
                      
                      <ul className="space-y-4">
                        {step.deliverables.map((deliverable, dIndex) => (
                          <motion.li 
                            key={deliverable} 
                            className="flex items-center gap-4 text-muted-foreground group/item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * dIndex }}
                          >
                            <motion.div 
                              className="w-3 h-3 rounded-full bg-primary/50 group-hover/item:bg-primary transition-colors"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="group-hover/item:text-foreground transition-colors">
                              {deliverable}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Ready to Get Started?" />
            </h2>
            
            <RevealText delay={0.2}>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Let's discuss your project and see how our process can deliver results for your business.
              </p>
            </RevealText>
            
            <Link to="/contact">
              <MagneticButton>
                <motion.button
                  className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Process;
