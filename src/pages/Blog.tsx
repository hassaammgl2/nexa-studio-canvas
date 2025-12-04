import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin } from 'lucide-react';

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
  
  return (
    <div className="pt-32">
      <div className="container-wide py-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <header className="pb-12">
        <div className="container-wide max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-foreground font-medium">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="pb-12">
        <div className="container-wide max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl overflow-hidden aspect-video">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <article className="pb-16">
        <div className="container-wide max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-invert prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      <section className="pb-16">
        <div className="container-wide max-w-3xl">
          <div className="card-glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-foreground font-medium">Share this article</span>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Share2].map((Icon, i) => (
                <motion.button key={i} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article key={relatedPost.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Link to={`/blog/${relatedPost.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                      <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                    <p className="text-muted-foreground text-sm">{relatedPost.excerpt}</p>
                  </Link>
                </motion.article>
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

  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-sm font-semibold uppercase tracking-wider">Our Blog</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
              Insights & <span className="gradient-text">Ideas</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground">
              Thoughts on design, development, and building products that matter.
            </motion.p>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="pb-12">
          <div className="container-wide">
            <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link to={`/blog/${featuredPost.id}`} className="block group">
                <div className="grid lg:grid-cols-2 gap-8 items-center card-glass p-4 md:p-8">
                  <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Featured</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">{featuredPost.category}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featuredPost.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={`/blog/${post.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className="glass px-3 py-1 rounded-full text-xs font-medium text-foreground">{post.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="card-glass p-12 text-center max-w-2xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground mb-6">
              Get the latest insights delivered to your inbox. No spam, just value.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <motion.button className="btn-primary whitespace-nowrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Subscribe</motion.button>
            </motion.div>
          </div>
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
