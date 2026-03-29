import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  ScrollControls, 
  Scroll, 
  useScroll,
  PerspectiveCamera,
  Environment,
  Text,
  ContactShadows,
  Stars,
  Sparkles,
  Center,
  Points,
  PointMaterial,
  Torus,
  Icosahedron,
  Octahedron,
  Box
} from '@react-three/drei';
import * as THREE from 'three';

const NeuralRibbon = () => {
  const scroll = useScroll();
  const ribbonRef = useRef<THREE.Mesh>(null);
  
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 300; i++) {
      p.push(new THREE.Vector3(
        Math.sin(i * 0.08) * 4,
        -i * 0.5,
        Math.cos(i * 0.08) * 4
      ));
    }
    return new THREE.CatmullRomCurve3(p);
  }, []);

  useFrame((state) => {
    if (!ribbonRef.current) return;
    const offset = scroll.offset;
    ribbonRef.current.rotation.y = offset * Math.PI * 6;
    ribbonRef.current.position.y = offset * 160;
    
    // Dynamic scale based on scroll
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    ribbonRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ribbonRef}>
      <tubeGeometry args={[points, 300, 0.12, 16, false]} />
      <MeshWobbleMaterial 
        color="#8ff5ff" 
        emissive="#8ff5ff" 
        emissiveIntensity={2} 
        speed={3} 
        factor={0.8} 
      />
    </mesh>
  );
};

const InteractiveParticles = () => {
  const scroll = useScroll();
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = -Math.random() * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const offset = scroll.offset;
    
    // Particles react to mouse and scroll
    pointsRef.current.rotation.y = t * 0.05 + offset * 2;
    pointsRef.current.position.x = Math.sin(t * 0.2) * 2;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8ff5ff"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingObject = ({ position, type, color, speed = 1 }: { position: [number, number, number], type: 'torus' | 'icosa' | 'octa' | 'box', color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.5 * speed;
    meshRef.current.rotation.y = t * 0.3 * speed;
    meshRef.current.position.y += Math.sin(t * speed) * 0.02;
  });

  return (
    <Float speed={speed * 3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {type === 'torus' && <torusGeometry args={[1, 0.3, 16, 100]} />}
        {type === 'icosa' && <icosahedronGeometry args={[1.2, 0]} />}
        {type === 'octa' && <octahedronGeometry args={[1, 0]} />}
        {type === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        <MeshDistortMaterial 
          color={color} 
          speed={speed * 2} 
          distort={0.4} 
          roughness={0.1} 
          metalness={0.9}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>
    </Float>
  );
};

const StoryText = ({ text, position, color, size = 1.5 }: { text: string, position: [number, number, number], color: string, size?: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Center position={position}>
        <Text
          font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
          fontSize={size}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={20}
          textAlign="center"
        >
          {text}
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </Text>
      </Center>
    </Float>
  );
};

const Vortex = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.01;
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
  });

  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <torusGeometry args={[5, 0.05, 16, 100]} />
      <meshStandardMaterial color="#d575ff" emissive="#d575ff" emissiveIntensity={5} transparent opacity={0.3} />
    </mesh>
  );
};

const Scene = () => {
  const { viewport } = useThree();
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset;
    // Cinematic camera path
    state.camera.position.y = -offset * 160;
    state.camera.position.x = Math.sin(offset * Math.PI * 2) * 5;
    state.camera.position.z = 15 + Math.cos(offset * Math.PI * 2) * 5;
    state.camera.lookAt(0, -offset * 160 - 10, 0);
    
    // Mouse influence
    state.camera.position.x += state.mouse.x * 3;
    state.camera.position.y += state.mouse.y * 3;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 20, 20]} intensity={2} color="#8ff5ff" />
      <pointLight position={[-20, -20, -20]} intensity={2} color="#d575ff" />
      <spotLight position={[0, 50, 0]} angle={0.3} penumbra={1} intensity={5} castShadow />

      <NeuralRibbon />
      <InteractiveParticles />
      <Vortex />

      {/* Chapter 1: The Origin */}
      <StoryText text="THE ORIGIN" position={[0, 5, -10]} color="#8ff5ff" size={4} />
      <FloatingObject position={[6, 0, -5]} type="icosa" color="#8ff5ff" speed={1.2} />
      <FloatingObject position={[-6, -5, -8]} type="torus" color="#d575ff" speed={0.8} />

      {/* Chapter 2: The Core */}
      <StoryText text="THE CORE" position={[0, -30, -10]} color="#d575ff" size={4} />
      <FloatingObject position={[8, -35, -5]} type="box" color="#d575ff" speed={1.5} />
      <FloatingObject position={[-8, -40, -8]} type="octa" color="#a7ffb3" speed={1.1} />

      {/* Chapter 3: The Lab */}
      <StoryText text="THE LAB" position={[0, -70, -10]} color="#a7ffb3" size={4} />
      <FloatingObject position={[10, -75, -5]} type="torus" color="#a7ffb3" speed={1.8} />
      <FloatingObject position={[-10, -80, -8]} type="icosa" color="#8ff5ff" speed={1.3} />

      {/* Chapter 4: The Signal */}
      <StoryText text="THE SIGNAL" position={[0, -110, -10]} color="#ff8f8f" size={4} />
      <FloatingObject position={[12, -115, -5]} type="octa" color="#ff8f8f" speed={2} />
      <FloatingObject position={[-12, -120, -8]} type="box" color="#d575ff" speed={1.4} />

      {/* Chapter 5: Certifications */}
      <StoryText text="CERTIFICATIONS" position={[0, -145, -10]} color="#a7ffb3" size={4} />
      <FloatingObject position={[14, -150, -5]} type="icosa" color="#a7ffb3" speed={2.2} />
      <FloatingObject position={[-14, -155, -8]} type="torus" color="#8ff5ff" speed={1.6} />

      {/* Global Ambience */}
      <Stars radius={150} depth={100} count={10000} factor={6} saturation={0} fade speed={2} />
      <Sparkles count={500} scale={50} size={3} speed={0.8} opacity={0.3} color="#8ff5ff" />

      <Environment preset="night" />
      <ContactShadows position={[0, -130, 0]} opacity={0.6} scale={60} blur={3} far={15} />
    </>
  );
};

export const NeuralCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
        <ScrollControls pages={16} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
};
