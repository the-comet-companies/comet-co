"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function LoadingParticles() {
    const ref = useRef<THREE.Points>(null);
    const count = 500;

    // Create particles in a sphere shape
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 2 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
            ref.current.rotation.x += 0.002;
            // Pulsate
            const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            ref.current.scale.set(s, s, s);
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#000000"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    );
}

export default function Preloader({ onFinish }: { onFinish?: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Minimum load time of 2 seconds for the experience
        const timer = setTimeout(() => {
            // Signal parent that loading phase is essentially done (starting exit)
            if (onFinish) onFinish();

            // Fade out
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => setIsLoading(false),
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!isLoading) return null;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fafafa]"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px]">
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <LoadingParticles />
                    </Canvas>
                </div>
            </div>
            <div className="absolute bottom-10 left-0 w-full text-center">
                <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase animate-pulse">
                    THE COMET COMPANIES
                </p>
            </div>
        </div>
    );
}
