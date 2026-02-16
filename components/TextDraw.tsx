"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextDrawProps {
    text: string;
    className?: string;
    fontSize?: string;
    fontWeight?: number;
    letterSpacing?: string;
    color?: string;
    duration?: number;
    delay?: number;
}

export default function TextDraw({
    text,
    className = "",
    fontSize = "0.625rem",
    fontWeight = 700,
    letterSpacing = "0.25em",
    color = "#9ca3af",
    duration = 1.2,
    delay = 0,
}: TextDrawProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!pathRef.current || !containerRef.current) return;

        const path = pathRef.current;
        const pathLength = path.getTotalLength();

        // Set up initial state
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            fill: "transparent",
        });

        // Create animation
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    once: true,
                },
            });

            // Draw the stroke
            tl.to(path, {
                strokeDashoffset: 0,
                duration: duration,
                ease: "power2.inOut",
                delay: delay,
            });

            // Fade in fill color after stroke completes
            tl.to(
                path,
                {
                    fill: color,
                    duration: 0.6,
                    ease: "power2.out",
                },
                `-=${duration * 0.3}`
            );
        }, containerRef);

        return () => ctx.revert();
    }, [color, duration, delay]);

    return (
        <div ref={containerRef} className={className}>
            <svg
                width="100%"
                height="40"
                viewBox="0 0 400 40"
                preserveAspectRatio="xMinYMid meet"
                style={{ overflow: "visible" }}
            >
                <text
                    ref={pathRef as any}
                    x="0"
                    y="28"
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: fontSize,
                        fontWeight: fontWeight,
                        letterSpacing: letterSpacing,
                        textTransform: "uppercase",
                    }}
                    stroke={color}
                    strokeWidth="0.5"
                    fill="transparent"
                >
                    {text}
                </text>
            </svg>
        </div>
    );
}
