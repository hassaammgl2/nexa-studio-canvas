import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const blobPaths = [
  'M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,339Q39,271,64.5,192.5Q90,114,165,62Q240,10,340,36.5Q440,63,458,156.5Q476,250,440.5,320.5Z',
  'M411.5,313.5Q402,377,348.5,424Q295,471,226.5,450Q158,429,111.5,362.5Q65,296,76,222Q87,148,140,90.5Q193,33,270.5,52Q348,71,395.5,132Q443,193,424,253Q405,313,411.5,313.5Z',
  'M490,317Q479,384,418,419Q357,454,281.5,478Q206,502,145,447.5Q84,393,60.5,322Q37,251,70,182Q103,113,168.5,72.5Q234,32,310,45Q386,58,437,118.5Q488,179,492.5,239.5Q497,300,490,317Z',
  'M423.5,310.5Q395,371,347.5,424.5Q300,478,228,461Q156,444,107,382.5Q58,321,62.5,244.5Q67,168,117.5,102.5Q168,37,252.5,34Q337,31,390.5,96.5Q444,162,450,231Q456,300,423.5,310.5Z',
];

export const SVGMorphBackground = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    blobPaths.forEach((path, i) => {
      if (i === 0) return;
      tl.to(pathRef.current, {
        duration: 4,
        attr: { d: path },
        ease: 'power1.inOut',
      });
    });

    // Secondary blob with offset
    if (path2Ref.current) {
      const tl2 = gsap.timeline({ repeat: -1, yoyo: true, delay: 2 });
      [...blobPaths].reverse().forEach((path, i) => {
        if (i === 0) return;
        tl2.to(path2Ref.current, {
          duration: 5,
          attr: { d: path },
          ease: 'power1.inOut',
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Blob */}
      <svg
        viewBox="0 0 550 550"
        className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] opacity-30"
      >
        <defs>
          <linearGradient id="blobGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d={blobPaths[0]}
          fill="url(#blobGradient1)"
          filter="url(#glow)"
        />
      </svg>

      {/* Secondary Blob */}
      <svg
        viewBox="0 0 550 550"
        className="absolute -bottom-1/4 -left-1/4 w-[120%] h-[120%] opacity-20"
      >
        <defs>
          <linearGradient id="blobGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={path2Ref}
          d={blobPaths[2]}
          fill="url(#blobGradient2)"
          filter="url(#glow)"
        />
      </svg>

      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-float" />
    </div>
  );
};
