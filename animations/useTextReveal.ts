"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealOptions {
    stagger?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
}

/**
 * Animates child elements with a clip-path mask reveal effect.
 * Wrap each line in a .text-reveal-line container with a <span> inside.
 */
export function useTextReveal<T extends HTMLElement>(
    options: TextRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        stagger = 0.12,
        duration = 1.2,
        delay = 0,
        ease = "power3.out",
        start = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const lines = el.querySelectorAll(".text-reveal-line > span");
            if (lines.length === 0) return;

            gsap.set(lines, { yPercent: 110 });

            gsap.to(lines, {
                yPercent: 0,
                duration,
                delay,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    once: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [stagger, duration, delay, ease, start]);

    return ref;
}
