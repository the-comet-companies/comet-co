"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Simple shared scroll progress — updated via native scroll event
const scrollState = { progress: 0 };

function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

function ParticleNetwork() {
    const ref = useRef<THREE.Points>(null);

    // Create particles in a sphere shape
    const positions = useMemo(() => {
        const count = 1200;
        const pos = new Float32Array(count * 3);
        const distance = 4;

        for (let i = 0; i < count; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = distance * Math.sin(theta) * Math.cos(phi);
            const y = distance * Math.sin(theta) * Math.sin(phi);
            const z = distance * Math.cos(theta);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        return pos;
    }, []);

    // Read scroll progress every frame and apply transforms
    useFrame(() => {
        if (!ref.current) return;

        const p = scrollState.progress;

        // Rotation based on scroll
        ref.current.rotation.x = p * (-Math.PI / 3);
        ref.current.rotation.y = p * (-Math.PI / 3);

        // Position (move up as user scrolls down)
        ref.current.position.y = p * 1.5;

        // Scale (slight expansion)
        const s = 1 + p * 0.2;
        ref.current.scale.set(s, s, s);
    });

    if (!positions) return null;

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#1a1a1a"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
}

export default function Scene3D() {
    // Attach a native scroll listener — this lives in the normal React tree
    // and always works regardless of Next.js navigation
    useEffect(() => {
        // Calculate once on mount
        updateScrollProgress();

        const onScroll = () => updateScrollProgress();

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={["#fafafa", 2.5, 6]} />
                <ParticleNetwork />
            </Canvas>
        </div>
    );
}
