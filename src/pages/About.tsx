import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Target, Heart, ArrowRight } from 'lucide-react';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { TiltCard, FloatingElement } from '@/components/animations/GlowingCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

const values = [
  {
    icon: Target,
    title: 'Result-Driven',
    description: 'Every decision we make is guided by measurable outcomes and real business impact.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We genuinely love what we do, and it shows in every pixel and line of code.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as an extension of your team, not just another vendor.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We refuse to compromise on quality, pushing boundaries on every project.',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: '15+ years crafting digital experiences for Fortune 500 companies.',
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Award-winning designer with a passion for user-centered solutions.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Full-stack expert specializing in React, Next.js, and 3D web experiences.',
  },
  {
    name: 'Emily Watson',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Orchestrates seamless project delivery with military precision.',
  },
];

// 3D Scene Components
const FloatingIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#ff4800"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const WireframeRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={3} position={[0, 0, -2]}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#ff4800" transparent opacity={0.5} />
    </mesh>
  );
};

const AboutScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <FloatingIcosahedron />
      <WireframeRing />
      <Environment preset="night" />
    </>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="pt-32">
      {/* Hero with 3D */}
      <section className="section-padding relative min-h-[70vh] flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <AboutScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r={10 + i * 8}
                fill="none"
                stroke="hsl(var(--primary) / 0.05)"
                strokeWidth="0.1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}
          </svg>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-wide relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4"
            >
              About Us
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="We're a Team of" className="block" />
              <span className="gradient-text">
                <AnimatedLetters text="Digital Craftspeople" delay={0.5} />
              </span>
            </h1>
            
            <RevealText delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Founded in 2014, NEXA Studio has grown from a two-person startup 
                to an award-winning digital agency with a global client base.
              </p>
            </RevealText>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Animated grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{ top: `${(i + 1) * 16}%`, left: 0, right: 0 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                From Garage to <span className="gradient-text">Global</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  What started as a passion project between two college friends has evolved 
                  into one of the most sought-after digital agencies in the industry.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Today, we've helped over 150 clients across 20+ industries transform their 
                  digital presence. From startups to Fortune 500 companies.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  What drives us is the thrill of solving complex problems, the satisfaction 
                  of exceeding expectations, and the relationships we build along the way.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <MagneticButton>
                  <button className="btn-primary inline-flex items-center gap-2">
                    Our Process
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <FloatingElement>
                <div className="aspect-square rounded-3xl overflow-hidden relative">
                  <motion.img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
                    alt="NEXA Studio team working"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </FloatingElement>
              
              <motion.div 
                className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <div className="text-4xl font-bold gradient-text mb-1">10+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </motion.div>

              <motion.div 
                className="absolute -top-4 -right-4 glass p-4 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <div className="text-2xl font-bold gradient-text">150+</div>
                <div className="text-muted-foreground text-sm">Projects</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding relative overflow-hidden">
        {/* SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="absolute w-full h-full">
            <pattern id="grid-about" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Values
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
              <AnimatedLetters text="What We Stand For" />
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <TiltCard key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="card-glass text-center h-full"
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <value.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider"
            >
              Our Team
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
              Meet the <span className="gradient-text">Creators</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group"
              >
                <TiltCard>
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </motion.div>
                  </div>
                </TiltCard>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
