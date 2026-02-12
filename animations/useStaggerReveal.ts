"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealOptions {
    stagger?: number;
    duration?: number;
    distance?: number;
    direction?: "up" | "left" | "right";
    start?: string;
}

export function useStaggerReveal<T extends HTMLElement>(
    options: StaggerRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        stagger = 0.1,
        duration = 1,
        distance = 40,
        direction = "up",
        start = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const items = el.querySelectorAll("[data-stagger]");
            if (items.length === 0) return;

            const fromVars: Record<string, number> = { opacity: 0 };
            if (direction === "up") fromVars.y = distance;
            if (direction === "left") fromVars.x = -distance;
            if (direction === "right") fromVars.x = distance;

            gsap.set(items, fromVars);

            gsap.to(items, {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start,
                    once: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [stagger, duration, distance, direction, start]);

    return ref;
}
