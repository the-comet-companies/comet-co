"use client";

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

const scrollState = { progress: 0 };
const entranceState = { started: false, progress: 0 };

function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

function MousePosition() {
    const { camera } = useThree();
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(() => {
        targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.05;
        targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.05;

        camera.position.x = targetRef.current.x * 0.5;
        camera.position.y = targetRef.current.y * 0.3;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uPulse;
    
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    
    float snoise(vec3 v){ 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 ); 
        vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }
    
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        
        float noise = snoise(position * 2.0 + uTime * 0.5);
        float pulse = uPulse * 0.3;
        vec3 newPosition = position + normal * noise * (0.15 + pulse);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uPulse;
    
    void main() {
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diff = max(dot(vNormal, lightDir), 0.0);
        
        vec3 baseColor = vec3(0.05, 0.05, 0.1);
        vec3 highlightColor = vec3(0.2, 0.2, 0.35);
        
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
        
        vec3 finalColor = mix(baseColor, highlightColor, diff * 0.5 + fresnel * 0.4);
        finalColor += vec3(0.15, 0.15, 0.25) * fresnel;
        finalColor += vec3(0.3, 0.4, 0.6) * uPulse * 0.5;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

function GlowingOrb({ onClick }: { onClick: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [pulse, setPulse] = useState(0);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uPulse: { value: 0 }
    }), []);

    const handleClick = useCallback(() => {
        setPulse(1);
        gsap.to({ value: 1 }, {
            value: 0,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
                setPulse(this.targets()[0].value);
            }
        });
        onClick();
    }, [onClick]);

    useFrame(() => {
        const scrollTime = scrollState.progress * 20;
        if (meshRef.current) {
            meshRef.current.rotation.x = scrollTime * 0.1;
            meshRef.current.rotation.y = scrollTime * 0.15;

            // Hide orb near the end (Contact section)
            const hideStart = 0.85;
            const hideEnd = 0.95;
            if (scrollState.progress > hideStart) {
                const fade = 1 - Math.min((scrollState.progress - hideStart) / (hideEnd - hideStart), 1);
                meshRef.current.scale.setScalar(fade);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = scrollTime;
            materialRef.current.uniforms.uPulse.value = pulse;
        }
    });

    return (
        <Sphere
            ref={meshRef}
            args={[1.2, 64, 64]}
            position={[0, 0, 0]}
            onClick={handleClick}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
        >
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </Sphere>
    );
}

function OrbitingParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);
    const count = 800;

    const particleData = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 2 + Math.random() * 2;
            const speed = 0.2 + Math.random() * 0.3;
            const offset = Math.random() * Math.PI * 2;
            temp.push({ angle, radius, speed, offset, yOffset: (Math.random() - 0.5) * 2 });
        }
        return temp;
    }, []);

    const initialPositions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        particleData.forEach((p, i) => {
            pos[i * 3] = Math.cos(p.angle) * p.radius;
            pos[i * 3 + 1] = p.yOffset;
            pos[i * 3 + 2] = Math.sin(p.angle) * p.radius;
        });
        return pos;
    }, [particleData]);

    useEffect(() => {
        if (!pointsRef.current || entranceState.started) return;

        entranceState.started = true;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        particleData.forEach((p, i) => {
            const explodeRadius = 8 + Math.random() * 4;
            const explodeAngle = Math.random() * Math.PI * 2;
            const explodeY = (Math.random() - 0.5) * 10;

            positions[i * 3] = Math.cos(explodeAngle) * explodeRadius;
            positions[i * 3 + 1] = explodeY;
            positions[i * 3 + 2] = Math.sin(explodeAngle) * explodeRadius;
        });
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        gsap.to(entranceState, {
            progress: 1,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
                const t = entranceState.progress;
                particleData.forEach((p, i) => {
                    const startRadius = 8 + Math.random() * 4;
                    const startAngle = Math.random() * Math.PI * 2;
                    const startY = (Math.random() - 0.5) * 10;

                    const endRadius = p.radius;
                    const endAngle = p.angle;
                    const endY = p.yOffset;

                    const easeT = 1 - Math.pow(1 - t, 3);

                    positions[i * 3] = Math.cos(startAngle + (endAngle - startAngle) * easeT) * (startRadius + (endRadius - startRadius) * easeT);
                    positions[i * 3 + 1] = startY + (endY - startY) * easeT;
                    positions[i * 3 + 2] = Math.sin(startAngle + (endAngle - startAngle) * easeT) * (startRadius + (endRadius - startRadius) * easeT);
                });
                pointsRef.current!.geometry.attributes.position.needsUpdate = true;
            }
        });
    }, [particleData]);

    useFrame(() => {
        if (!pointsRef.current) return;

        const scrollTime = scrollState.progress * 20;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        if (entranceState.progress > 0.5) {
            particleData.forEach((p, i) => {
                const newAngle = p.angle + scrollTime * p.speed + p.offset;
                positions[i * 3] = Math.cos(newAngle) * p.radius;
                positions[i * 3 + 1] = p.yOffset + Math.sin(scrollTime * 0.5 + p.offset) * 0.3;
                positions[i * 3 + 2] = Math.sin(newAngle) * p.radius;
            });
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }

        const s = 1 - scrollState.progress * 0.3;
        pointsRef.current.scale.set(s, s, s);
    });

    return (
        <group ref={groupRef}>
            <Points ref={pointsRef} positions={initialPositions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

function ParticleRing() {
    const ref = useRef<THREE.Points>(null);
    const count = 200;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 3.5;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = Math.sin(angle * 3) * 0.2;
            pos[i * 3 + 2] = Math.sin(angle) * radius;
        }
        return pos;
    }, []);

    useFrame(() => {
        if (!ref.current) return;
        const scrollTime = scrollState.progress * 20;
        ref.current.rotation.y = scrollTime * 0.1;
        ref.current.rotation.x = Math.sin(scrollTime * 0.2) * 0.1;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#888888"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null);

    const shapes = useMemo(() => [
        { type: 'octa' as const, pos: [-3, 2, -2] as [number, number, number], scale: 0.15, speed: 0.3 },
        { type: 'octa' as const, pos: [3.5, -1, -1] as [number, number, number], scale: 0.1, speed: 0.4 },
        { type: 'tetra' as const, pos: [-2, -2, -3] as [number, number, number], scale: 0.12, speed: 0.5 },
        { type: 'tetra' as const, pos: [2.5, 1.5, -2] as [number, number, number], scale: 0.08, speed: 0.35 },
    ], []);

    useFrame(() => {
        if (!groupRef.current) return;
        const scrollTime = scrollState.progress * 20;
        groupRef.current.children.forEach((child, i) => {
            const shape = shapes[i];
            child.rotation.x = scrollTime * shape.speed;
            child.rotation.y = scrollTime * shape.speed * 0.7;
            child.position.y = shape.pos[1] + Math.sin(scrollTime + i) * 0.2;
        });
    });

    return (
        <group ref={groupRef}>
            {shapes.map((shape, i) => (
                <mesh key={i} position={shape.pos} scale={shape.scale}>
                    {shape.type === 'octa' ? <octahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
                    <meshStandardMaterial color="#444466" wireframe opacity={0.4} transparent />
                </mesh>
            ))}
        </group>
    );
}

function Scene({ onOrbClick }: { onOrbClick: () => void }) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6666aa" />
            <directionalLight position={[0, 5, 5]} intensity={0.8} />

            <GlowingOrb onClick={onOrbClick} />
            <OrbitingParticles />
            <ParticleRing />
            <FloatingShapes />
            <MousePosition />
        </>
    );
}

export default function Scene3D() {
    const [showClickEffect, setShowClickEffect] = useState(false);
    const [clickEffectText, setClickEffectText] = useState("");

    const messages = [
        "Focused.",
        "Deliberate.",
        "Operator-led.",
        "Long-term.",
        "We build.",
        "We operate."
    ];

    const handleOrbClick = useCallback(() => {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setClickEffectText(randomMsg);
        setShowClickEffect(true);
        setTimeout(() => setShowClickEffect(false), 1500);
    }, [messages]);

    useEffect(() => {
        updateScrollProgress();
        const onScroll = () => updateScrollProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    gl={{ alpha: true, antialias: true }}
                    dpr={[1, 2]}
                >
                    <fog attach="fog" args={["#fafafa", 5, 15]} />
                    <Scene onOrbClick={handleOrbClick} />
                    <EffectComposer>
                        <Bloom
                            intensity={0.8}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                    </EffectComposer>
                </Canvas>
            </div>

            {showClickEffect && (
                <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                    <div className="text-6xl md:text-8xl font-bold text-black animate-ping-slow">
                        {clickEffectText}
                    </div>
                </div>
            )}
        </>
    );
}
