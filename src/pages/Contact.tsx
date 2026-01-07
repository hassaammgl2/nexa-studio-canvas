import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, Suspense } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { TiltCard, GlowingCard, FloatingElement } from '@/components/animations/GlowingCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

// 3D Components
const ContactSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ff4800"
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff4800"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ContactScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <ContactSphere />
      <FloatingParticles />
      <Environment preset="night" />
    </>
  );
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@nexastudio.dev',
    link: 'mailto:hello@nexastudio.dev',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'San Francisco, CA',
    link: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Fri: 9am - 6pm PST',
    link: '#',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    }, 3000);
  };

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
              <ContactScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Animated connection lines */}
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={10 + i * 12}
                y1="100"
                x2={50}
                y2="50"
                stroke="hsl(var(--primary) / 0.1)"
                strokeWidth="0.1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: i * 0.1 }}
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
              Get in Touch
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Let's Build Something" className="block" />
              <span className="gradient-text">
                <AnimatedLetters text="Amazing" delay={0.5} />
              </span>
            </h1>
            
            <RevealText delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? We'd love to hear about it. Drop us a line 
                and we'll get back to you within 24 hours.
              </p>
            </RevealText>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full">
            <defs>
              <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary) / 0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Send us a <span className="gradient-text">message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@company.com"
                    />
                  </motion.div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Your Company"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select a range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  Contact <span className="gradient-text">Information</span>
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <GlowingCard key={info.title} glowColor="#ff4800">
                      <motion.a
                        href={info.link}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 card-glass p-4 group"
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <info.icon className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          <p className="text-muted-foreground group-hover:text-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </motion.a>
                    </GlowingCard>
                  ))}
                </div>
              </div>
              
              {/* Quick Links */}
              <TiltCard>
                <div className="card-glass p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    {['Schedule a Call', 'Download Our Portfolio', 'View Case Studies'].map((link, i) => (
                      <motion.a
                        key={link}
                        href="#"
                        className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span>{link}</span>
                        <motion.span
                          className="inline-block"
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </TiltCard>
              
              {/* Response Time */}
              <FloatingElement>
                <div className="card-glass p-6 border-primary/30 relative overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-sm text-green-500 font-medium">
                        Currently accepting new projects
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Average response time: under 4 hours during business hours
                    </p>
                  </div>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
