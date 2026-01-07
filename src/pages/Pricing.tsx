import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';
import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { TiltCard, GlowingCard } from '@/components/animations/GlowingCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    description: 'Perfect for startups and small businesses',
    price: '$5,000',
    priceNote: 'starting at',
    features: [
      '5-10 page website',
      'Responsive design',
      'Basic animations',
      'SEO optimization',
      'Contact form',
      '2 rounds of revisions',
      '1 month support',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    name: 'Professional',
    icon: Sparkles,
    description: 'For growing businesses that need more',
    price: '$15,000',
    priceNote: 'starting at',
    features: [
      '10-20 page website',
      'Custom design system',
      'Advanced animations',
      'CMS integration',
      '3D elements',
      'E-commerce ready',
      'Unlimited revisions',
      '3 months support',
    ],
    cta: 'Get Started',
    popular: true,
    gradient: 'from-primary/30 to-orange-500/20',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    description: 'For large-scale digital transformations',
    price: 'Custom',
    priceNote: 'contact us',
    features: [
      'Unlimited pages',
      'Full design system',
      'Complex animations',
      'Custom development',
      'Full 3D experiences',
      'API integrations',
      'Dedicated team',
      '12 months support',
      'Priority support',
    ],
    cta: 'Contact Us',
    popular: false,
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A typical website takes 6-12 weeks from kickoff to launch, while more complex applications may take 3-6 months.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically require 50% upfront to begin work, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone-based payments.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes! All our packages include post-launch support. We also offer retainer agreements for clients who need ongoing development, maintenance, and optimization.',
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely. We frequently collaborate with in-house teams and other agencies. We can adapt our workflow to fit your existing processes.',
  },
];

// 3D Components
const PricingGem = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <MeshDistortMaterial
          color="#ff4800"
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const FloatingRings = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 3 + i * 0.3, 0, i * 0.5]} scale={2 + i * 0.5}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ff4800" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
};

const PricingScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <PricingGem position={[0, 0, 0]} scale={1.5} />
      <FloatingRings />
      <Environment preset="night" />
    </>
  );
};

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
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
              <PricingScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1="0"
                y1={20 + i * 15}
                x2="100"
                y2={20 + i * 15}
                stroke="hsl(var(--primary) / 0.05)"
                strokeWidth="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
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
              Pricing
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Transparent" className="block" />
              <span className="gradient-text">
                <AnimatedLetters text="Pricing" delay={0.4} />
              </span>
            </h1>
            
            <RevealText delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the package that fits your needs. All projects include our 
                signature attention to detail and commitment to excellence.
              </p>
            </RevealText>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [-50, 50, -50],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}
              >
                <TiltCard>
                  <div
                    className={`relative card-glass p-8 h-full flex flex-col ${
                      plan.popular ? 'border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]' : ''
                    }`}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-50`} />
                    
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                      >
                        <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                          <Sparkles className="w-4 h-4" />
                          Most Popular
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <motion.div
                          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <plan.icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {plan.description}
                        </p>
                        <div className="mb-2">
                          <span className="text-4xl font-bold text-foreground">
                            {plan.price}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {plan.priceNote}
                        </span>
                      </div>
                      
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <motion.li 
                            key={feature} 
                            className="flex items-center gap-2 text-muted-foreground"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.03 }}
                          >
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <Link to="/contact" className="block">
                        <MagneticButton className="w-full">
                          <button
                            className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                          >
                            {plan.cta}
                          </button>
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full">
            <defs>
              <pattern id="faq-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="hsl(var(--primary) / 0.1)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#faq-dots)" />
          </svg>
        </div>

        <div className="container-wide max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingCard glowColor="#ff4800">
                  <motion.div
                    className="card-glass cursor-pointer overflow-hidden"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary"
                      >
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/30 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container-wide text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Not Sure Which <span className="gradient-text">Package</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Let's have a conversation about your specific needs and find the perfect solution.
          </motion.p>
          <Link to="/contact">
            <MagneticButton>
              <button className="btn-primary inline-flex items-center gap-2">
                Schedule a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
