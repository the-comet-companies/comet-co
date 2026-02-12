"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LineRevealOptions {
    duration?: number;
    delay?: number;
    start?: string;
}

export function useLineReveal<T extends HTMLElement>(
    options: LineRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const { duration = 1.5, delay = 0, start = "top 85%" } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const lines = el.querySelectorAll(".hr-animated");
            if (lines.length === 0) return;

            gsap.to(lines, {
                scaleX: 1,
                duration,
                delay,
                stagger: 0.2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: el,
                    start,
                    once: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [duration, delay, start]);

    return ref;
}
