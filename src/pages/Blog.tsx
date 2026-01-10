import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Sparkles, BookOpen, Send } from 'lucide-react';
import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TiltCard, FloatingElement } from '@/components/animations/GlowingCard';

// 3D Scene for Blog page
const BlogScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const secondMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (secondMeshRef.current) {
      secondMeshRef.current.rotation.x = -state.clock.elapsedTime * 0.08;
      secondMeshRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} color="#FF4800" intensity={1} />
      <Environment preset="night" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[-2, 0, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#FF4800"
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={secondMeshRef} position={[2, 1, -1]}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color="#FF4800"
            metalness={0.6}
            roughness={0.3}
            distort={0.3}
            speed={1.5}
            wireframe
          />
        </mesh>
      </Float>

      <BlogParticles />
    </>
  );
};

const BlogParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#FF4800" transparent opacity={0.6} />
    </points>
  );
};

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2025',
    excerpt: 'Explore the cutting-edge design trends that will shape the digital landscape this year.',
    content: `<p>The web design landscape is evolving faster than ever. As we move into 2025, several key trends are emerging that will define how we create and experience digital products.</p>
      <h2>1. AI-Powered Personalization</h2>
      <p>Artificial intelligence is no longer just a buzzword—it's becoming an integral part of web design. From dynamic content that adapts to user behavior to AI-generated layouts that optimize for conversion, the future is personalized.</p>
      <h2>2. Immersive 3D Experiences</h2>
      <p>With WebGL and Three.js becoming more accessible, we're seeing a surge in immersive 3D web experiences. From product configurators to interactive portfolios, 3D is no longer reserved for gaming.</p>
      <h2>3. Micro-Interactions & Motion Design</h2>
      <p>Subtle animations and micro-interactions are becoming essential for creating engaging user experiences. They provide feedback, guide users, and add personality to interfaces.</p>
      <h2>4. Dark Mode as Default</h2>
      <p>Dark mode has evolved from a nice-to-have feature to an expected standard. Many designers are now starting with dark mode and adapting to light.</p>
      <h2>Conclusion</h2>
      <p>The future of web design is exciting, challenging, and full of possibilities. By staying ahead of these trends, designers can create experiences that provide real value to users.</p>`,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
    category: 'Design',
    date: 'Dec 1, 2024',
    readTime: '5 min read',
    author: { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    featured: true,
  },
  {
    id: 2,
    title: 'Why Your Business Needs a 3D Website Experience',
    excerpt: 'Discover how immersive 3D elements can transform user engagement and conversions.',
    content: `<p>In an increasingly competitive digital landscape, standing out is more important than ever. 3D web experiences offer a unique opportunity to capture attention.</p>
      <h2>The Power of 3D on the Web</h2>
      <p>3D experiences engage users on a deeper level than traditional 2D interfaces. They create a sense of presence and immersion that flat designs cannot match.</p>
      <h2>Real Business Impact</h2>
      <p>Our clients have seen remarkable results: 35% increase in time on site, 50% higher engagement rates, and 25% improvement in conversion rates.</p>
      <h2>When to Use 3D</h2>
      <p>3D works best for product showcases, brand experiences, portfolios, and interactive storytelling.</p>`,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    category: 'Technology',
    date: 'Nov 28, 2024',
    readTime: '7 min read',
    author: { name: 'Marcus Johnson', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    featured: false,
  },
  {
    id: 3,
    title: 'Maximizing E-Commerce Conversions with UX Design',
    excerpt: 'Learn proven strategies to optimize your online store for maximum sales.',
    content: `<p>E-commerce success isn't just about having great products—it's about creating an experience that makes buying effortless and enjoyable.</p>
      <h2>The Psychology of Online Shopping</h2>
      <p>Understanding how users think and behave online is crucial. From the paradox of choice to social proof, psychology plays a key role in conversion optimization.</p>
      <h2>Key UX Principles</h2>
      <p>Simplified navigation, clear product photography, streamlined checkout, and trust signals consistently drive results.</p>`,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    category: 'E-Commerce',
    date: 'Nov 25, 2024',
    readTime: '6 min read',
    author: { name: 'Emily Watson', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    featured: false,
  },
  {
    id: 4,
    title: 'Building Accessible Websites: A Complete Guide',
    excerpt: 'Why accessibility matters and how to ensure your website is usable by everyone.',
    content: `<p>Web accessibility isn't just a legal requirement—it's a moral imperative and good business practice.</p>
      <h2>Understanding WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines provide a framework for creating accessible content.</p>
      <h2>Key Accessibility Features</h2>
      <p>Keyboard navigation, screen reader compatibility, sufficient color contrast, alternative text for images, and clear focus indicators are essential.</p>`,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
    category: 'Development',
    date: 'Nov 20, 2024',
    readTime: '8 min read',
    author: { name: 'Alex Rivera', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    featured: false,
  },
  {
    id: 5,
    title: 'The Psychology of Color in Web Design',
    excerpt: 'How color choices impact user behavior and brand perception online.',
    content: `<p>Color is one of the most powerful tools in a designer's arsenal. It influences emotions, guides attention, and shapes brand perception.</p>
      <h2>Color and Emotion</h2>
      <p>Different colors evoke different emotional responses. Understanding these associations helps create designs that resonate with users.</p>
      <h2>Brand Color Strategy</h2>
      <p>Choosing brand colors requires balancing industry conventions, target audience preferences, and competitive differentiation.</p>`,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=500&fit=crop',
    category: 'Design',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    author: { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    featured: false,
  },
  {
    id: 6,
    title: 'Performance Optimization: Making Websites Blazing Fast',
    excerpt: 'Technical strategies to improve your website speed and user experience.',
    content: `<p>Website performance directly impacts user experience, SEO rankings, and conversion rates.</p>
      <h2>Core Web Vitals</h2>
      <p>Google's Core Web Vitals—LCP, FID, and CLS—provide measurable metrics for performance.</p>
      <h2>Optimization Strategies</h2>
      <p>Image optimization, code splitting, caching strategies, CDN implementation, and server-side rendering all contribute to faster sites.</p>`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    category: 'Development',
    date: 'Nov 10, 2024',
    readTime: '10 min read',
    author: { name: 'Marcus Johnson', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    featured: false,
  },
];

const BlogPost = ({ post }: { post: typeof blogPosts[0] }) => {
  const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
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
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="pb-12 relative overflow-hidden">
        {/* Animated SVG Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1200 400">
          <motion.path
            d="M 0 200 Q 300 100 600 200 T 1200 200"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>

        <div className="container-wide max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <BookOpen className="w-4 h-4" />
              {post.category}
            </motion.span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <AnimatedLetters text={post.title} delay={0.05} />
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-3">
                <motion.img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className="text-foreground font-medium">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-2 glass px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                {post.date}
              </span>
              <span className="flex items-center gap-2 glass px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                {post.readTime}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Hero Image with Parallax */}
      <section className="pb-12" ref={heroRef}>
        <div className="container-wide max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="rounded-3xl overflow-hidden aspect-video relative"
            style={{ y: heroY }}
          >
            <motion.img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              style={{ scale: heroScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="pb-16">
        <div className="container-wide max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className="prose prose-invert prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {/* Share Section */}
      <section className="pb-16">
        <div className="container-wide max-w-3xl">
          <TiltCard>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <span className="text-foreground font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Share this article
              </span>
              <div className="flex gap-3">
                {[
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Share2, label: 'Share' }
                ].map(({ Icon, label }) => (
                  <MagneticButton key={label}>
                    <motion.button 
                      className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-card/30 relative overflow-hidden">
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-20">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <BlogScene />
              </Suspense>
            </Canvas>
          </div>

          <div className="container-wide relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-8"
            >
              Related <span className="gradient-text">Articles</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <TiltCard key={relatedPost.id}>
                  <motion.article 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${relatedPost.id}`} className="block group">
                      <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                        <motion.img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                      <p className="text-muted-foreground text-sm">{relatedPost.excerpt}</p>
                    </Link>
                  </motion.article>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const BlogList = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
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
              <BlogScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600">
          <motion.path
            d="M 0 300 Q 200 100 400 300 T 800 300 T 1200 300"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.circle
            cx="600"
            cy="300"
            r="150"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.3"
            initial={{ scale: 0.9, opacity: 0.3 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </svg>

        <motion.div className="container-wide relative z-10" style={{ y: heroY }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <BookOpen className="w-4 h-4" />
              Our Blog
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <AnimatedLetters text="Insights & Ideas" delay={0.1} />
            </h1>
            <RevealText delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground">
                Thoughts on design, development, and building products that matter.
              </p>
            </RevealText>
          </div>
        </motion.div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-12 relative z-10">
          <div className="container-wide">
            <TiltCard>
              <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link to={`/blog/${featuredPost.id}`} className="block group">
                  <div className="grid lg:grid-cols-2 gap-8 items-center card-glass p-4 md:p-8">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                      <motion.img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4">
                        <motion.span 
                          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </motion.span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <motion.span 
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-primary text-sm font-semibold uppercase tracking-wider mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        {featuredPost.category}
                      </motion.span>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                      <p className="text-muted-foreground mb-6 text-lg">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center gap-2 glass px-3 py-1 rounded-full">
                          <Calendar className="w-4 h-4 text-primary" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-2 glass px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-primary" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </TiltCard>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-card/30 relative">
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
          <defs>
            <pattern id="blog-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-grid)" />
        </svg>

        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <TiltCard key={post.id}>
                <motion.article 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                      <motion.img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute top-4 left-4">
                        <motion.span 
                          className="glass px-3 py-1 rounded-full text-xs font-medium text-foreground"
                          whileHover={{ scale: 1.05 }}
                        >
                          {post.category}
                        </motion.span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                  </Link>
                </motion.article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding relative">
        <FloatingElement className="absolute top-10 right-10 w-24 h-24 opacity-20">
          <Send className="w-full h-full text-primary" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-10 left-10 w-16 h-16 opacity-20">
          <Sparkles className="w-full h-full text-primary" />
        </FloatingElement>

        <div className="container-wide">
          <TiltCard>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)), transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Send className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  className="text-2xl md:text-4xl font-bold text-foreground mb-4"
                >
                  Subscribe to Our <span className="gradient-text">Newsletter</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.1 }} 
                  className="text-muted-foreground mb-8 text-lg"
                >
                  Get the latest insights delivered to your inbox. No spam, just value.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.2 }} 
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-4 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" 
                  />
                  <MagneticButton>
                    <motion.button 
                      className="btn-primary whitespace-nowrap px-8 py-4" 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                    </motion.button>
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

const Blog = () => {
  const { id } = useParams();
  if (id) {
    const post = blogPosts.find(p => p.id === parseInt(id));
    if (post) return <BlogPost post={post} />;
  }
  return <BlogList />;
};

export default Blog;
