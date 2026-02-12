"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
    speed?: number; // positive = slower, negative = faster
    start?: string;
    end?: string;
}

export function useParallax<T extends HTMLElement>(
    options: ParallaxOptions = {}
) {
    const ref = useRef<T>(null);
    const { speed = 50, start = "top bottom", end = "bottom top" } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.to(el, {
                y: speed,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start,
                    end,
                    scrub: 0.5,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [speed, start, end]);

    return ref;
}
