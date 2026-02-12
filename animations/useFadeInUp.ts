"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInUpOptions {
    delay?: number;
    duration?: number;
    distance?: number;
    stagger?: number;
}

export function useFadeInUp<T extends HTMLElement>(
    options: FadeInUpOptions = {}
) {
    const ref = useRef<T>(null);
    /* New "Restrained" defaults - Tighter, faster, inevitable */
    const { delay = 0, duration = 0.9, distance = 12, stagger = 0.05 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const children = el.querySelectorAll("[data-animate]");
            const targets = children.length > 0 ? children : el;

            gsap.set(targets, { opacity: 0, y: distance });

            gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration,
                delay,
                stagger,
                ease: "power2.out", // "Motion must feel inevitable, not theatrical"
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    once: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [delay, duration, distance, stagger]);

    return ref;
}
