"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    style?: React.CSSProperties;
}

export default function TextReveal({
    text,
    className = "",
    as: Component = "span",
    style = {},
}: TextRevealProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial state - slide up from 100%
            gsap.set(textRef.current, {
                y: "100%",
                opacity: 0,
            });

            // Animate on scroll
            gsap.to(textRef.current, {
                y: "0%",
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    once: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <Component
            ref={containerRef as any}
            className={className}
            style={{
                ...style,
                display: "inline-block",
                overflow: "hidden", // Essential for the slide-up effect
                verticalAlign: "bottom", // Fix inline-block alignment issues
            }}
        >
            <span
                ref={textRef}
                style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                }}
            >
                {text}
            </span>
        </Component>
    );
}
