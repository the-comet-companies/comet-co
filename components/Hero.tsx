"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            // Initial curtain reveal
            tl.fromTo(
                overlayRef.current,
                { scaleY: 1 },
                { scaleY: 0, duration: 1.2, ease: "power4.inOut" }
            );

            // Entrance: Slide up solid words
            const wordWrappers = headlineRef.current?.querySelectorAll(".word-wrapper");
            if (wordWrappers) {
                tl.fromTo(
                    wordWrappers,
                    { yPercent: 110, rotateX: -20 },
                    {
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.2,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.6"
                );
            }

            // Subtext fades in
            tl.fromTo(
                subtextRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                },
                "-=0.5"
            );

            // Scroll indicator appears
            tl.fromTo(
                indicatorRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.3"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Pinned Scroll Interaction
    useEffect(() => {
        const ctx = gsap.context(() => {
            const solidLayers = headlineRef.current?.querySelectorAll(".solid-layer");

            if (solidLayers && solidLayers.length > 0) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top", // Start when hero hits top
                        end: "+=150%", // Pin for 150% of viewport height
                        pin: true,     // Pin the section
                        scrub: 1,      // Smooth scrubbing
                        // markers: true, // Debug
                    }
                });

                // Solid → Outline (plays once on the way down)
                solidLayers.forEach((layer) => {
                    tl.to(layer, {
                        clipPath: "inset(0 100% 0 0)", // Wipe right to hide solid
                        duration: 1,
                        ease: "none"
                    });
                });
            }

            // Fade subtext out during the pin — fromTo ensures clean reversal
            gsap.fromTo(subtextRef.current,
                { opacity: 1, y: 0 },
                {
                    opacity: 0,
                    y: -20,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=50%",
                        scrub: true,
                    },
                    immediateRender: false,
                }
            );

            // Fade indicator out
            gsap.fromTo(indicatorRef.current,
                { opacity: 1 },
                {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=20%",
                        scrub: true,
                    },
                    immediateRender: false,
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const words = ["WE", "BUILD", "FOCUSED", "BUSINESSES."];

    return (
        <section
            ref={containerRef}
            // Removed min-h-[1XXvh] because framing is handled by pin duration
            // Removed sticky class
            className="relative flex h-screen w-full flex-col justify-center md:justify-start md:pt-20 px-6 sm:px-12 md:px-24 lg:px-32 overflow-hidden"
            id="home"
        >
            {/* Curtain overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[#fafafa] z-20 origin-top"
            />

            <div ref={contentRef} className="w-full relative z-10">
                <div ref={headlineRef} className="flex flex-col">
                    {words.map((word, i) => (
                        <div
                            key={word + i}
                            className="word-container overflow-hidden relative"
                            style={{ perspective: "600px" }}
                        >
                            <div className="word-wrapper relative inline-block leading-[0.85] tracking-tighter">
                                {/* Bottom Layer: Outline */}
                                <span
                                    aria-hidden="true"
                                    className="inline-block font-sans font-bold text-transparent absolute top-0 left-0 select-none"
                                    style={{
                                        fontSize:
                                            i === words.length - 1
                                                ? "clamp(3rem, 12vw, 10rem)"
                                                : "clamp(3.5rem, 13vw, 11rem)",
                                        WebkitTextStroke: "1px #000000",
                                    }}
                                >
                                    {word}
                                </span>

                                {/* Top Layer: Solid */}
                                <span
                                    className="solid-layer inline-block font-sans font-bold text-[#000000] relative z-10"
                                    style={{
                                        fontSize:
                                            i === words.length - 1
                                                ? "clamp(3rem, 12vw, 10rem)"
                                                : "clamp(3.5rem, 13vw, 11rem)",
                                        willChange: "clip-path",
                                    }}
                                >
                                    {word}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <p
                    ref={subtextRef}
                    className="mt-10 font-sans text-[10px] font-bold tracking-[0.3em] text-neutral-400 sm:text-xs uppercase"
                >
                    Operator-led · Long-term · Deliberate
                </p>
            </div>
        </section>
    );
}
