import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense } from 'react';

// Particle system that assembles into NEXA logo
const ParticleSystem = ({ onComplete }: { onComplete: () => void }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [progress, setProgress] = useState(0);
  
  // Generate particles
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  const targetPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  // Create NEXA text shape positions
  const createTextPositions = () => {
    const letters = 'NEXA';
    const letterWidth = 1.2;
    const startX = -2.4;
    
    for (let i = 0; i < particleCount; i++) {
      const letterIndex = Math.floor((i / particleCount) * 4);
      const localX = (Math.random() - 0.5) * letterWidth;
      const localY = (Math.random() - 0.5) * 1.5;
      
      // Random start positions (scattered)
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Target positions (forming letters)
      targetPositions[i * 3] = startX + letterIndex * letterWidth + localX;
      targetPositions[i * 3 + 1] = localY;
      targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      // Orange color with slight variation
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.28 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0;
    }
    
    return { positions, targetPositions, colors };
  };
  
  const { positions: initPos, targetPositions: targetPos, colors: initColors } = createTextPositions();
  
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const posArray = geometry.attributes.position.array as Float32Array;
    
    const newProgress = Math.min(progress + delta * 0.4, 1);
    setProgress(newProgress);
    
    // Lerp particles towards target
    for (let i = 0; i < particleCount; i++) {
      const easeProgress = 1 - Math.pow(1 - newProgress, 3); // Ease out cubic
      posArray[i * 3] = THREE.MathUtils.lerp(initPos[i * 3], targetPos[i * 3], easeProgress);
      posArray[i * 3 + 1] = THREE.MathUtils.lerp(initPos[i * 3 + 1], targetPos[i * 3 + 1], easeProgress);
      posArray[i * 3 + 2] = THREE.MathUtils.lerp(initPos[i * 3 + 2], targetPos[i * 3 + 2], easeProgress);
    }
    
    geometry.attributes.position.needsUpdate = true;
    
    // Rotate slightly
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    
    if (newProgress >= 1) {
      setTimeout(onComplete, 800);
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={initPos}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={initColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Glowing orbs floating around
const GlowingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  
  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4 + Math.sin(i) * 1;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 0.5) * 2,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ff4800" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

const PreloaderScene = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <ParticleSystem onComplete={onComplete} />
      <GlowingOrbs />
    </>
  );
};

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <PreloaderScene onComplete={handleComplete} />
              </Suspense>
            </Canvas>
          </div>

          {/* SVG Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="hsl(var(--primary) / 0.1)"
                strokeWidth="0.5"
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 60, opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="0.3"
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 45, opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* Loading Bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Loading experience</span>
              <span>{Math.min(100, Math.round(loadingProgress))}%</span>
            </div>
            <div className="h-0.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, loadingProgress)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 text-sm text-muted-foreground"
          >
            Crafting digital excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
