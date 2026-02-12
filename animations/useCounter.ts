"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterOptions {
    start?: number;
    end: number;
    duration?: number;
    triggerStart?: string;
    suffix?: string;
}

export function useCounter<T extends HTMLElement>(options: CounterOptions) {
    const ref = useRef<T>(null);
    const { start = 0, end, duration = 2, triggerStart = "top 85%", suffix = "" } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obj = { value: start };

        const ctx = gsap.context(() => {
            gsap.to(obj, {
                value: end,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: triggerStart,
                    once: true,
                },
                onUpdate: () => {
                    el.textContent = Math.round(obj.value) + suffix;
                },
            });
        });

        return () => ctx.revert();
    }, [start, end, duration, triggerStart, suffix]);

    return ref;
}
