import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Palette, ShoppingCart, Box, Smartphone, 
  Lightbulb, ArrowRight, Check 
} from 'lucide-react';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { TiltCard, GlowingCard } from '@/components/animations/GlowingCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with Next.js, React, and TypeScript that scale with your business.',
    features: [
      'Custom Web Applications',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Performance Optimization',
      'CMS Implementation',
    ],
    price: 'From $15,000',
    color: '#ff4800',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that creates memorable experiences and drives conversions.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'Usability Testing',
      'Design Handoff',
    ],
    price: 'From $8,000',
    color: '#ff6a33',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'High-converting online stores with Shopify, custom solutions, and headless architecture.',
    features: [
      'Shopify Development',
      'Custom E-Commerce Platforms',
      'Payment Integration',
      'Inventory Management',
      'Conversion Optimization',
    ],
    price: 'From $12,000',
    color: '#ff8c5a',
  },
  {
    icon: Box,
    title: '3D & Motion Design',
    description: 'Immersive 3D experiences and stunning animations that captivate your audience.',
    features: [
      'Interactive 3D Websites',
      'WebGL Development',
      'Motion Graphics',
      'Product Visualization',
      'AR/VR Experiences',
    ],
    price: 'From $20,000',
    color: '#ff4800',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that users love.',
    features: [
      'iOS Development',
      'Android Development',
      'React Native Apps',
      'App Store Optimization',
      'Push Notifications',
    ],
    price: 'From $25,000',
    color: '#ff6a33',
  },
  {
    icon: Lightbulb,
    title: 'Digital Strategy',
    description: 'Strategic guidance for digital transformation and growth.',
    features: [
      'Digital Audits',
      'Growth Strategy',
      'Technology Consulting',
      'Team Training',
      'Ongoing Support',
    ],
    price: 'From $5,000',
    color: '#ff8c5a',
  },
];

// 3D Components
const ServiceSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[0.8]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const AnimatedTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current) return;
    torusRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    torusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <mesh ref={torusRef} position={[0, 0, -3]} scale={2.5}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#ff4800" transparent opacity={0.4} />
    </mesh>
  );
};

const ServicesScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <ServiceSphere position={[-3, 1, -2]} color="#ff4800" />
      <ServiceSphere position={[3, -1, -3]} color="#ff6a33" />
      <ServiceSphere position={[0, 2, -4]} color="#ff8c5a" />
      <AnimatedTorus />
      <Environment preset="night" />
    </>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="pt-32">
      {/* Hero */}
      <section className="section-padding relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ServicesScene />
            </Suspense>
          </Canvas>
        </div>

        {/* SVG Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${20 + i * 30},100 Q${35 + i * 30},${50 + i * 10} ${50 + i * 30},0`}
                fill="none"
                stroke="hsl(var(--primary) / 0.1)"
                strokeWidth="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
            ))}
          </svg>
        </div>

        <motion.div style={{ y: heroY }} className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4"
            >
              Our Services
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Services That" className="block" />
              <span className="gradient-text">
                <AnimatedLetters text="Drive Growth" delay={0.4} />
              </span>
            </h1>
            
            <RevealText delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                From strategy to execution, we provide end-to-end digital solutions 
                that help businesses stand out in the digital landscape.
              </p>
            </RevealText>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full">
            <defs>
              <pattern id="services-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <motion.rect
                  width="80"
                  height="80"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.05)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-grid)" />
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlowingCard key={service.title} glowColor={service.color}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="card-glass group h-full flex flex-col"
                >
                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <service.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, i) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                    <span className="text-primary font-semibold">{service.price}</span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors group/link"
                    >
                      Get Started
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Animated SVG Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.circle
              cx="80"
              cy="20"
              r="15"
              fill="hsl(var(--primary) / 0.05)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.circle
              cx="20"
              cy="80"
              r="20"
              fill="hsl(var(--primary) / 0.03)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <TiltCard>
            <div className="card-glass p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-foreground mb-4 relative z-10"
              >
                Need a <span className="gradient-text">Custom Solution</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10"
              >
                We understand that every business is unique. Let's discuss your specific 
                needs and create a tailored solution that fits your goals and budget.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <Link to="/contact">
                  <MagneticButton>
                    <button className="btn-primary inline-flex items-center gap-2">
                      Schedule a Consultation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

export default Services;
