import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { RevealText } from '../animations/AnimatedText';
import { ParallaxImage } from '../animations/ParallaxImage';

const projects = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    color: '#FF4800',
    year: '2024',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Shopify Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    color: '#3B82F6',
    year: '2024',
  },
  {
    id: 3,
    title: 'SaaS Landing Page',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
    color: '#10B981',
    year: '2023',
  },
  {
    id: 4,
    title: 'Healthcare App',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop',
    color: '#8B5CF6',
    year: '2023',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: index % 2 === 0 ? y : undefined }}
    >
      <motion.div style={{ scale, opacity }}>
        <Link to={`/work/${project.id}`} className="block group">
          <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6">
            {/* Image with Parallax */}
            <ParallaxImage
              src={project.image}
              alt={project.title}
              className="absolute inset-0"
              speed={0.3}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />
            
            {/* Color Overlay on Hover */}
            <motion.div
              className="absolute inset-0 mix-blend-overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              style={{ backgroundColor: project.color }}
            />
            
            {/* Arrow Button */}
            <motion.div 
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center border border-foreground/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-6 h-6 text-foreground" />
            </motion.div>
            
            {/* Year Badge */}
            <div className="absolute bottom-6 left-6">
              <span className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground">
                {project.year}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.h3 
                className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
              >
                {project.title}
              </motion.h3>
              <p className="text-muted-foreground mt-1">{project.category}</p>
            </div>
            <motion.div
              className="w-4 h-4 rounded-full flex-shrink-0 mt-2"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.5 }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const FeaturedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="section-padding relative">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4 block"
            >
              Selected Work
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
              <RevealText>Projects that</RevealText>
              <RevealText delay={0.2}>
                <span className="gradient-text">speak volumes</span>
              </RevealText>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/work" 
              className="group inline-flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              <span>View All Projects</span>
              <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowUpRight className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
              </span>
            </Link>
          </motion.div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
