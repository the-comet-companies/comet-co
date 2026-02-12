"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLAnchorElement>(null);
    const topBorderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Animate the top border line
            gsap.fromTo(
                topBorderRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            // Label fades in
            gsap.fromTo(
                labelRef.current,
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            // Sub text fades in
            gsap.fromTo(
                subRef.current,
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            // Email link reveals with scale and clip
            gsap.fromTo(
                emailRef.current,
                { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0 0 0% 0)",
                    duration: 1.2,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            // On scroll past, slight parallax push up
            gsap.to(emailRef.current, {
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="px-6 py-28 sm:px-12 md:px-24 md:py-36 lg:px-32 overflow-hidden">
            {/* Animated top border */}
            <div
                ref={topBorderRef}
                className="w-full h-px bg-neutral-200 mb-12 origin-left"
                style={{ transform: "scaleX(0)" }}
            />

            <div className="w-full">
                <h2
                    ref={labelRef}
                    className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400"
                    style={{ opacity: 0 }}
                >
                    Start a conversation.
                </h2>

                <p
                    ref={subRef}
                    className="mb-16 font-sans text-[11px] font-normal text-neutral-400 tracking-wide"
                    style={{ opacity: 0 }}
                >
                    Serious inquiries only.
                </p>

                <a
                    ref={emailRef}
                    href="mailto:hello@thecometcompanies.com"
                    className="email-link block font-sans text-3xl font-medium text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl break-all sm:break-normal"
                    style={{ opacity: 0 }}
                >
                    hello@
                    <br className="hidden sm:block" />
                    thecometcompanies.com
                </a>
            </div>
        </section>
    );
}
