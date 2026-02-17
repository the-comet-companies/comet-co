"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { philosophyContent } from "@/lib/data";

function StoryParticles({ activeIndex, scrollProgress }: { activeIndex: number; scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null);
  const particleData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        delay: Math.random() * 0.5,
      });
    }
    return temp;
  }, []);

  const generateSpherePositions = useCallback(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 1.5;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const generateRingPositions = useCallback(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + (Math.random() - 0.5) * 0.5;
      const wave = Math.sin(angle * 5) * 0.3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = wave;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  const generateGridPositions = useCallback(() => {
    const positions = new Float32Array(count * 3);
    const gridSize = Math.ceil(Math.cbrt(count));
    const spacing = 0.15;

    for (let i = 0; i < count; i++) {
      const x = (i % gridSize) - gridSize / 2;
      const y = (Math.floor(i / gridSize) % gridSize) - gridSize / 2;
      const z = (Math.floor(i / (gridSize * gridSize))) - gridSize / 2;

      const jitter = 0.03;
      positions[i * 3] = x * spacing + (Math.random() - 0.5) * jitter;
      positions[i * 3 + 1] = y * spacing + (Math.random() - 0.5) * jitter;
      positions[i * 3 + 2] = z * spacing + (Math.random() - 0.5) * jitter;
    }
    return positions;
  }, []);

  const generateSpiralPositions = useCallback(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8;
      const radius = t * 3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  const generateMobiusPositions = useCallback(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * 1.5; // Width of the strip
      const R = 3;

      // Mobius strip parametric equations
      positions[i * 3] = (R + v * Math.cos(u / 2)) * Math.cos(u);
      positions[i * 3 + 1] = (R + v * Math.cos(u / 2)) * Math.sin(u);
      positions[i * 3 + 2] = v * Math.sin(u / 2);
    }
    return positions;
  }, []);

  useEffect(() => {
    let newPositions: Float32Array;
    switch (activeIndex) {
      case 0: newPositions = generateSpherePositions(); break;
      case 1: newPositions = generateRingPositions(); break;
      case 2: newPositions = generateGridPositions(); break;
      case 3: newPositions = generateSpiralPositions(); break;
      case 4: newPositions = generateMobiusPositions(); break;
      default: newPositions = generateSpherePositions();
    }
    setTargetPositions(newPositions);
  }, [activeIndex, generateGridPositions, generateSpherePositions, generateRingPositions, generateSpiralPositions, generateMobiusPositions]);

  const initialPositions = useMemo(() => generateSpherePositions(), [generateSpherePositions]);

  useFrame(() => {
    if (!pointsRef.current || !targetPositions) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const morphProgress = scrollProgress;
    const morphSpeed = 0.15;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const particle = particleData[i];

      const targetX = targetPositions[idx];
      const targetY = targetPositions[idx + 1];
      const targetZ = targetPositions[idx + 2];

      const ease = Math.min(1, morphSpeed * (1 + particle.delay) * morphProgress);
      positions[idx] = positions[idx] + (targetX - positions[idx]) * ease;
      positions[idx + 1] = positions[idx + 1] + (targetY - positions[idx + 1]) * ease;
      positions[idx + 2] = positions[idx + 2] + (targetZ - positions[idx + 2]) * ease;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y = scrollProgress * Math.PI * 2 * activeIndex;
    pointsRef.current.rotation.x = scrollProgress * 0.5;
  });

  return (
    <Points ref={pointsRef} positions={initialPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={philosophyContent[activeIndex].color}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function Scene({ activeIndex, scrollProgress }: { activeIndex: number; scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8888ff" />
      <StoryParticles activeIndex={activeIndex} scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export default function Philosophy3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!section || !container || !canvasContainer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onEnter: () => setIsPinned(true),
          onLeave: () => setIsPinned(false),
          onEnterBack: () => setIsPinned(true),
          onLeaveBack: () => setIsPinned(false),
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);

            const totalItems = philosophyContent.length;
            const rawIndex = Math.floor(progress * totalItems);
            const newIndex = Math.min(rawIndex, totalItems - 1);

            setActiveIndex(newIndex);

            // Calculate sub-index for rotating words based on progress within the section
            const itemDuration = 1 / totalItems;
            const sectionStart = newIndex * itemDuration;
            const progressInItem = (progress - sectionStart) / itemDuration;
            // Clamp between 0 and 0.999 to avoid index out of bounds
            const safeProgress = Math.max(0, Math.min(0.999, progressInItem));

            const words = philosophyContent[newIndex].rotatingWords;
            const newSubIndex = Math.floor(safeProgress * words.length);
            setSubIndex(newSubIndex);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative h-screen w-full">
      <div ref={containerRef} className="absolute inset-0">
        <div ref={canvasContainerRef} className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
            style={{ opacity: isPinned ? 1 : 0, transition: "opacity 0.5s" }}
          >
            <color attach="background" args={["#fafafa"]} />
            <fog attach="fog" args={["#fafafa", 4, 12]} />
            <Scene activeIndex={activeIndex} scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-2xl px-6">
            <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 tracking-tight mb-4">
              {philosophyContent[activeIndex].statement}
            </h1>
            <span
              className="block text-lg md:text-xl font-medium tracking-[0.3em] uppercase mb-6"
              style={{ color: philosophyContent[activeIndex].color }}
            >
              {philosophyContent[activeIndex].rotatingWords[subIndex % philosophyContent[activeIndex].rotatingWords.length]}
            </span>
            <p className="text-lg md:text-xl text-neutral-500 max-w-lg mx-auto leading-relaxed">
              {philosophyContent[activeIndex].description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {philosophyContent.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-neutral-900 scale-125" : "bg-neutral-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
