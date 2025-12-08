import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Environment,
  MeshTransmissionMaterial,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';

const MainSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Follow mouse
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouse.x * viewport.width * 0.1,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        mouse.y * viewport.height * 0.1,
        0.05
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.8, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FF4800"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  );
};

const GlassSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[0.6, 64, 64]} position={[2.5, 1, -1]}>
        <MeshDistortMaterial
          color="#FF6B35"
          distort={0.3}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-2.5, -0.5, -0.5]}>
        <torusGeometry args={[0.5, 0.2, 32, 64]} />
        <MeshDistortMaterial
          color="#FF4800"
          distort={0.2}
          speed={2}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
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
          count={500}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF4800"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} color="#FF4800" intensity={1} />
      <pointLight position={[5, 5, 5]} color="#FF6B35" intensity={0.5} />
      
      <MainSphere />
      <GlassSphere />
      <FloatingTorus />
      <Particles />
      
      <Environment preset="city" />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
