import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Code, Palette, ShoppingCart, Box, Smartphone, Lightbulb, ArrowRight } from 'lucide-react';
import { TiltCard, FloatingElement } from '../animations/GlowingCard';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with Next.js, React, and TypeScript.',
    color: '#FF4800',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that creates memorable experiences.',
    color: '#3B82F6',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'High-converting online stores with Shopify & custom solutions.',
    color: '#10B981',
  },
  {
    icon: Box,
    title: '3D & Motion',
    description: 'Immersive 3D experiences and stunning animations.',
    color: '#8B5CF6',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications.',
    color: '#F59E0B',
  },
  {
    icon: Lightbulb,
    title: 'Consulting',
    description: 'Strategic guidance for digital transformation.',
    color: '#EC4899',
  },
];

interface ServiceSphereProps {
  position: [number, number, number];
  color: string;
  isHovered: boolean;
}

const ServiceSphere = ({ position, color, isHovered }: ServiceSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(isHovered ? 1.3 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
};

const CentralOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 2]} />
      <MeshDistortMaterial
        color="#FF4800"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ServicesOrbit = ({ hoveredIndex }: { hoveredIndex: number | null }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const positions: [number, number, number][] = [
    [2.5, 0, 0],
    [1.25, 2.17, 0],
    [-1.25, 2.17, 0],
    [-2.5, 0, 0],
    [-1.25, -2.17, 0],
    [1.25, -2.17, 0],
  ];

  return (
    <group ref={groupRef}>
      <CentralOrb />
      {services.map((service, i) => (
        <ServiceSphere
          key={service.title}
          position={positions[i]}
          color={service.color}
          isHovered={hoveredIndex === i}
        />
      ))}
    </group>
  );
};

export const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="section-padding bg-card/30 relative overflow-hidden">
      {/* Animated SVG Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="300"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="400"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          fill="none"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </svg>

      <motion.div 
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold uppercase tracking-wider inline-block"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6"
          >
            Services That{' '}
            <motion.span 
              className="gradient-text inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Drive Growth
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From strategy to execution, we provide end-to-end digital solutions
            that help businesses stand out and succeed in the digital landscape.
          </motion.p>
        </div>
        
        {/* 3D Globe & Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <TiltCard className="card-glass group cursor-pointer h-full">
                  <motion.div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ backgroundColor: `${service.color}20` }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${service.color}10 0%, transparent 70%)`,
                    }}
                  />
                </TiltCard>
              </motion.div>
            ))}
          </div>
          
          {/* 3D Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="order-1 lg:order-2 h-[500px]"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#FF4800" intensity={0.5} />
              <Suspense fallback={null}>
                <ServicesOrbit hoveredIndex={hoveredIndex} />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <motion.button
              className="btn-primary inline-flex items-center gap-2 group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(var(--primary) / 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Services
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
