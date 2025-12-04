import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

const categories = ['All', 'Web Development', 'E-Commerce', 'UI/UX Design', '3D & Motion'];

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

const CaseStudy = ({ project }: { project: typeof projects[0] }) => (
  <div className="pt-32">
    <div className="container-wide py-8">
      <Link to="/work" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Work
      </Link>
    </div>

    <section className="pb-16">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">{project.category}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">{project.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">{project.fullDescription}</p>
        </motion.div>
      </div>
    </section>

    <section className="pb-16">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl overflow-hidden aspect-video">
          <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>

    <section className="pb-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
            { label: 'Duration', value: project.duration },
            { label: 'Services', value: project.services.join(', ') },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="card-glass">
              <span className="text-muted-foreground text-sm">{item.label}</span>
              <p className="text-foreground font-semibold mt-1">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          Project <span className="gradient-text">Results</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {project.results.map((result, index) => (
            <motion.div key={result.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">{result.metric}</div>
              <p className="text-muted-foreground">{result.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-glass p-8 md:p-12 text-center">
          <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">"{project.testimonial.quote}"</p>
          <p className="font-semibold text-foreground">{project.testimonial.author}</p>
          <p className="text-muted-foreground text-sm">{project.testimonial.role}</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-card/30">
      <div className="container-wide text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready for Similar Results?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Let's discuss how we can help transform your business.
        </motion.p>
        <Link to="/contact">
          <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Start Your Project</motion.button>
        </Link>
      </div>
    </section>
  </div>
);

const WorkList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-sm font-semibold uppercase tracking-wider">Our Work</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
              Selected <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground">
              Explore our portfolio of work spanning web development, e-commerce, design, and immersive 3D experiences.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ delay: index * 0.1 }}>
                <Link to={`/work/${project.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: project.color }} />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Want to See Your Project Here?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring your vision to life.
          </motion.p>
          <Link to="/contact">
            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Start a Project</motion.button>
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
