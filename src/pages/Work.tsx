import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useRef, Suspense, useMemo } from 'react';
import { ArrowUpRight, ArrowLeft, Quote } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TiltCard, FloatingElement } from '@/components/animations/GlowingCard';

const categories = ['All', 'Web Development', 'E-Commerce', 'UI/UX Design', '3D & Motion'];

// 3D Scene for Work page
const WorkScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} color="#FF4800" intensity={1} />
      <Environment preset="night" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <MeshDistortMaterial
            color="#FF4800"
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} position={[0, 0, -2]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#FF4800" emissive="#FF4800" emissiveIntensity={0.5} />
      </mesh>

      <Particles />
    </>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
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
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FF4800" transparent opacity={0.6} />
    </points>
  );
};

const projects = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop',
    description: 'A comprehensive financial analytics platform for enterprise clients.',
    fullDescription: 'We partnered with a leading fintech company to create a powerful analytics dashboard that processes millions of transactions daily. The platform provides real-time insights, custom reporting, and predictive analytics.',
    tags: ['React', 'TypeScript', 'D3.js'],
    color: '#FF4800',
    client: 'TechFlow Finance',
    year: '2024',
    duration: '4 months',
    services: ['Web Development', 'UI/UX Design', 'Data Visualization'],
    results: [
      { metric: '300%', label: 'Increase in data processing speed' },
      { metric: '85%', label: 'Reduction in manual reporting' },
      { metric: '$2M+', label: 'Cost savings in first year' },
    ],
    testimonial: { quote: 'NEXA transformed our data infrastructure. The dashboard they built is now the backbone of our operations.', author: 'Sarah Chen', role: 'CTO, TechFlow Finance' },
  },
  {
    id: 2,
    title: 'StyleHub E-Commerce',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop',
    description: 'Luxury fashion marketplace with AR try-on features.',
    fullDescription: 'StyleHub needed a complete digital transformation to compete in the luxury fashion space. We built a headless e-commerce platform with AR try-on capabilities and personalized recommendations.',
    tags: ['Shopify', 'Next.js', 'AR.js'],
    color: '#3B82F6',
    client: 'StyleHub',
    year: '2024',
    duration: '6 months',
    services: ['E-Commerce Development', 'AR Integration', 'UI/UX Design'],
    results: [
      { metric: '200%', label: 'Increase in online revenue' },
      { metric: '45%', label: 'Higher conversion rate' },
      { metric: '60%', label: 'Reduction in returns' },
    ],
    testimonial: { quote: 'The AR try-on feature has been a game-changer for our business.', author: 'Michael Roberts', role: 'CEO, StyleHub' },
  },
  {
    id: 3,
    title: 'HealthCare App',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&h=900&fit=crop',
    description: 'Patient management system with intuitive interface.',
    fullDescription: 'We redesigned the entire patient experience for a major healthcare provider. The new system streamlines appointment booking, medical records access, and telehealth consultations.',
    tags: ['Figma', 'React Native', 'Node.js'],
    color: '#10B981',
    client: 'MedCare Solutions',
    year: '2023',
    duration: '5 months',
    services: ['UI/UX Design', 'Mobile Development', 'Backend Development'],
    results: [
      { metric: '92%', label: 'Patient satisfaction score' },
      { metric: '40%', label: 'Reduction in wait times' },
      { metric: '3x', label: 'Increase in telehealth adoption' },
    ],
    testimonial: { quote: 'The new app has revolutionized how our patients interact with our services.', author: 'Dr. Emily Watson', role: 'Medical Director, MedCare' },
  },
  {
    id: 4,
    title: 'Auto Showcase',
    category: '3D & Motion',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&h=900&fit=crop',
    description: 'Interactive 3D car configurator with real-time rendering.',
    fullDescription: 'An immersive 3D car configurator that allows customers to customize every detail of their vehicle in real-time with photorealistic rendering.',
    tags: ['Three.js', 'WebGL', 'GSAP'],
    color: '#8B5CF6',
    client: 'LuxeAuto',
    year: '2024',
    duration: '3 months',
    services: ['3D Development', 'WebGL', 'UI Design'],
    results: [
      { metric: '5x', label: 'Longer session duration' },
      { metric: '35%', label: 'Increase in custom orders' },
      { metric: '50%', label: 'Reduction in showroom visits' },
    ],
    testimonial: { quote: 'Customers can now experience our vehicles from anywhere.', author: 'David Park', role: 'VP Sales, LuxeAuto' },
  },
  {
    id: 5,
    title: 'SaaS Landing Page',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&h=900&fit=crop',
    description: 'High-converting landing page for B2B SaaS product.',
    fullDescription: 'A conversion-focused landing page designed to maximize signups for a B2B SaaS platform with scroll-triggered animations and interactive demos.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    color: '#F59E0B',
    client: 'CloudSync',
    year: '2024',
    duration: '6 weeks',
    services: ['Web Development', 'Conversion Optimization', 'Animation'],
    results: [
      { metric: '150%', label: 'Increase in demo requests' },
      { metric: '4.2%', label: 'Conversion rate' },
      { metric: '65%', label: 'Reduction in bounce rate' },
    ],
    testimonial: { quote: 'Our conversion rate doubled after launch.', author: 'Alex Rivera', role: 'CMO, CloudSync' },
  },
  {
    id: 6,
    title: 'Organic Market',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop',
    description: 'Farm-to-table delivery platform with subscription model.',
    fullDescription: 'A complete e-commerce solution for a farm-to-table delivery service with subscription management and route optimization.',
    tags: ['Shopify Plus', 'React', 'Stripe'],
    color: '#22C55E',
    client: 'Green Harvest',
    year: '2023',
    duration: '4 months',
    services: ['E-Commerce', 'Subscription System', 'Logistics Integration'],
    results: [
      { metric: '10,000+', label: 'Active subscribers' },
      { metric: '25%', label: 'Month-over-month growth' },
      { metric: '98%', label: 'On-time delivery rate' },
    ],
    testimonial: { quote: 'NEXA built exactly what we envisioned.', author: 'Maria Santos', role: 'Founder, Green Harvest' },
  },
];

const CaseStudy = ({ project }: { project: typeof projects[0] }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="pt-32">
      {/* Back Link */}
      <div className="container-wide py-8">
        <Link to="/work" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pb-16 relative overflow-hidden">
        {/* Animated SVG Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1200 600">
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M 0 300 Q 300 200 600 300 T 1200 300"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>

        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold uppercase tracking-wider mb-6"
            >
              {project.category}
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text={project.title} delay={0.1} />
            </h1>
            <RevealText delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-3xl">{project.fullDescription}</p>
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* Hero Image with Parallax */}
      <section className="pb-16" ref={heroRef}>
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="rounded-3xl overflow-hidden aspect-video relative"
            style={{ y: heroY }}
          >
            <motion.img 
              src={project.heroImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
              style={{ scale: heroScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Project Info Cards */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: project.year },
              { label: 'Duration', value: project.duration },
              { label: 'Services', value: project.services.join(', ') },
            ].map((item, i) => (
              <TiltCard key={item.label}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.3 + i * 0.1 }} 
                  className="card-glass p-6 h-full"
                >
                  <span className="text-muted-foreground text-sm">{item.label}</span>
                  <p className="text-foreground font-semibold mt-2">{item.value}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with 3D Background */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <WorkScene />
            </Suspense>
          </Canvas>
        </div>

        <div className="container-wide relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center"
          >
            <AnimatedLetters text="Project Results" delay={0.1} />
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <TiltCard key={result.label}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.15 }} 
                  className="text-center p-8 glass rounded-2xl"
                >
                  <motion.div 
                    className="text-5xl md:text-7xl font-bold gradient-text mb-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                  >
                    {result.metric}
                  </motion.div>
                  <p className="text-muted-foreground text-lg">{result.label}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding relative">
        <FloatingElement className="absolute top-10 left-10 w-20 h-20 opacity-20">
          <Quote className="w-full h-full text-primary" />
        </FloatingElement>
        
        <div className="container-wide max-w-4xl">
          <TiltCard>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="card-glass p-8 md:p-12 text-center relative"
            >
              <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
              <p className="text-xl md:text-3xl text-foreground mb-8 leading-relaxed font-light italic">
                "{project.testimonial.quote}"
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
              <p className="font-semibold text-foreground text-lg">{project.testimonial.author}</p>
              <p className="text-muted-foreground">{project.testimonial.role}</p>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Ready for <span className="gradient-text">Similar Results</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          >
            Let's discuss how we can help transform your business.
          </motion.p>
          <Link to="/contact">
            <MagneticButton>
              <motion.button 
                className="btn-primary text-lg px-8 py-4" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </MagneticButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

const WorkList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="pt-32">
      {/* Hero Section with 3D */}
      <section className="section-padding relative overflow-hidden" ref={heroRef}>
        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <WorkScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600">
          <motion.circle
            cx="600"
            cy="300"
            r="200"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.circle
            cx="600"
            cy="300"
            r="280"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.3"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
          />
        </svg>

        <motion.div className="container-wide relative z-10" style={{ y: heroY }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold uppercase tracking-wider mb-6"
            >
              Our Work
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Selected Projects" delay={0.1} />
            </h1>
            <RevealText delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground">
                Explore our portfolio of work spanning web development, e-commerce, design, and immersive 3D experiences.
              </p>
            </RevealText>
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 relative z-10">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, i) => (
              <MagneticButton key={category}>
                <motion.button 
                  onClick={() => setActiveCategory(category)} 
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'glass text-muted-foreground hover:text-foreground'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              </MagneticButton>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-card/30 relative">
        {/* Grid Pattern SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
          <defs>
            <pattern id="work-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#work-grid)" />
        </svg>

        <div className="container-wide relative z-10">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                layout 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 30 }} 
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard>
                  <Link to={`/work/${project.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                        style={{ backgroundColor: project.color }} 
                      />
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        initial={{ x: 20, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: 45 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </motion.div>
                      
                      {/* Tech Tags on Hover */}
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                      >
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full glass text-xs text-foreground">
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <FloatingElement className="absolute top-20 right-20 w-32 h-32 opacity-20">
          <div className="w-full h-full rounded-full border border-primary/50" />
        </FloatingElement>

        <div className="container-wide text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Want to See Your <span className="gradient-text">Project Here</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          >
            Let's discuss how we can bring your vision to life.
          </motion.p>
          <Link to="/contact">
            <MagneticButton>
              <motion.button 
                className="btn-primary text-lg px-8 py-4" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
            </MagneticButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

const Work = () => {
  const { id } = useParams();
  if (id) {
    const project = projects.find(p => p.id === parseInt(id));
    if (project) return <CaseStudy project={project} />;
  }
  return <WorkList />;
};

export default Work;
