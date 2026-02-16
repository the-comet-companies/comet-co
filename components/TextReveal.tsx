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
            // Set initial state
            gsap.set(textRef.current, {
                clipPath: "inset(0 100% 0 0)",
            });

            // Animate on scroll
            gsap.to(textRef.current, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1,
                ease: "power3.inOut",
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
                overflow: "hidden",
            }}
        >
            <span
                ref={textRef}
                style={{
                    display: "inline-block",
                    willChange: "clip-path",
                }}
            >
                {text}
            </span>
        </Component>
    );
}
