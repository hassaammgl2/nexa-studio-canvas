import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const clients = [
  { name: 'Google', logo: 'G' },
  { name: 'Meta', logo: 'M' },
  { name: 'Apple', logo: '⌘' },
  { name: 'Amazon', logo: 'A' },
  { name: 'Netflix', logo: 'N' },
  { name: 'Spotify', logo: 'S' },
  { name: 'Stripe', logo: '⋔' },
  { name: 'Shopify', logo: '⌂' },
  { name: 'Figma', logo: 'F' },
  { name: 'Notion', logo: 'N' },
  { name: 'Slack', logo: '#' },
  { name: 'Vercel', logo: '▲' },
];

export const ClientMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-25%', '0%']);

  return (
    <section 
      ref={containerRef}
      className="py-24 overflow-hidden relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      
      <div className="container-wide mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium"
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>
      
      {/* First Row - moves left on scroll */}
      <motion.div 
        ref={row1Ref}
        style={{ x: x1 }}
        className="flex gap-16 mb-8"
      >
        {[...clients, ...clients, ...clients].map((client, index) => (
          <div
            key={`row1-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl border border-transparent hover:border-border/50 hover:bg-card/30 transition-all duration-500">
              <span className="text-4xl font-bold text-primary/30 group-hover:text-primary transition-colors duration-300">
                {client.logo}
              </span>
              <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Second Row - moves right on scroll */}
      <motion.div 
        ref={row2Ref}
        style={{ x: x2 }}
        className="flex gap-16"
      >
        {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
          <div
            key={`row2-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl border border-transparent hover:border-border/50 hover:bg-card/30 transition-all duration-500">
              <span className="text-4xl font-bold text-primary/30 group-hover:text-primary transition-colors duration-300">
                {client.logo}
              </span>
              <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
