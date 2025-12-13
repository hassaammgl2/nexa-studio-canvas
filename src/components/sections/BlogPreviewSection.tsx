import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowRight, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { TiltCard } from '../animations/GlowingCard';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2025',
    excerpt: 'Explore the cutting-edge design trends that will shape the digital landscape this year.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
    category: 'Design',
    date: 'Dec 1, 2024',
    readTime: '5 min read',
    color: '#FF4800',
  },
  {
    id: 2,
    title: 'Why Your Business Needs a 3D Website Experience',
    excerpt: 'Discover how immersive 3D elements can transform user engagement and conversions.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    category: 'Technology',
    date: 'Nov 28, 2024',
    readTime: '7 min read',
    color: '#3B82F6',
  },
  {
    id: 3,
    title: 'Maximizing E-Commerce Conversions with UX Design',
    excerpt: 'Learn proven strategies to optimize your online store for maximum sales.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    category: 'E-Commerce',
    date: 'Nov 25, 2024',
    readTime: '6 min read',
    color: '#10B981',
  },
];

export const BlogPreviewSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="section-padding bg-card/30 relative overflow-hidden">
      {/* Animated SVG Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <motion.rect 
          width="100%" 
          height="100%" 
          fill="url(#grid)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </svg>

      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-wider inline-block"
            >
              Our Blog
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4"
            >
              Latest{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px hsl(var(--primary) / 0)",
                    "0 0 40px hsl(var(--primary) / 0.3)",
                    "0 0 20px hsl(var(--primary) / 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Insights
              </motion.span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/blog">
              <motion.button 
                className="btn-secondary inline-flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Posts
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
        
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring" }}
            >
              <Link to={`/blog/${post.id}`} className="block group">
                <TiltCard className="h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-6">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                    />
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span 
                        className="px-4 py-1.5 rounded-full text-xs font-semibold text-foreground backdrop-blur-md"
                        style={{ backgroundColor: `${post.color}30`, borderColor: post.color }}
                      >
                        {post.category}
                      </span>
                    </motion.div>
                    
                    {/* Arrow on hover */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center"
                      initial={{ opacity: 0, x: 20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    className="flex items-center gap-4 text-muted-foreground text-sm mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {post.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    {post.excerpt}
                  </motion.p>
                  
                  {/* Read more link */}
                  <motion.div 
                    className="mt-4 flex items-center gap-2 text-primary font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    <span>Read More</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.div>
                </TiltCard>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
