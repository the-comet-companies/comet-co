"use client";

import { useLayoutEffect, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "@/lib/data";
import Scene3D from "@/components/Scene3D";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = heroContent.rotatingWords;

export default function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Refs for rotating word spans (outline layer)
    const outlineWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    // Refs for rotating word spans (solid layer)
    const solidWordsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const setOutlineWordRef = useCallback((el: HTMLSpanElement | null, i: number) => {
        outlineWordsRef.current[i] = el;
    }, []);

    const setSolidWordRef = useCallback((el: HTMLSpanElement | null, i: number) => {
        solidWordsRef.current[i] = el;
    }, []);

    // Entrance animation
    useLayoutEffect(() => {
        // If startAnimation is provided and false, do not animate yet
        if (startAnimation === false) return;

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

            // Text slides up after curtain
            const wordWrappers = headlineRef.current?.querySelectorAll(".word-wrapper");
            if (wordWrappers) {
                tl.fromTo(
                    wordWrappers,
                    { yPercent: 110, rotateX: -20, opacity: 0 },
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.06,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );
            }

            // Subtext fades in
            tl.fromTo(
                subtextRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.4"
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
    }, [startAnimation]);

    // Pinned Scroll Interaction + Rotating Words
    useEffect(() => {
        const ctx = gsap.context(() => {
            const solidLayers = headlineRef.current?.querySelectorAll(".solid-layer");
            const outlineWordEls = outlineWordsRef.current.filter(Boolean) as HTMLSpanElement[];
            const solidWordEls = solidWordsRef.current.filter(Boolean) as HTMLSpanElement[];

            // Set initial state: first word visible, all others hidden
            outlineWordEls.forEach((el, i) => {
                gsap.set(el, {
                    opacity: i === 0 ? 1 : 0,
                    y: i === 0 ? 0 : 40,
                });
            });
            solidWordEls.forEach((el, i) => {
                gsap.set(el, {
                    opacity: i === 0 ? 1 : 0,
                    y: i === 0 ? 0 : 40,
                });
            });

            // Build the main pinned timeline
            const totalWords = rotatingWords.length;
            // Each word gets an equal portion of scroll.
            const scrollPerWord = 80;
            const totalScroll = scrollPerWord * totalWords;

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${totalScroll}%`,
                    pin: true,
                    scrub: 1,
                    // markers: true, // Debug
                },
            });

            // 1) Solid → Outline wipe runs across the FULL scroll duration (simultaneous with word rotation)
            if (solidLayers && solidLayers.length > 0) {
                solidLayers.forEach((layer) => {
                    masterTl.to(layer, {
                        clipPath: "inset(0 100% 0 0)",
                        duration: totalScroll,
                        ease: "none",
                    }, 0);
                });
            }

            // 2) Rotating words: animate transitions between each word (runs concurrently with wipe)
            for (let i = 0; i < totalWords - 1; i++) {
                const segmentStart = scrollPerWord * i + scrollPerWord * 0.65; // hold then transition
                const transitionDuration = scrollPerWord * 0.35;

                // Animate outgoing word (both layers)
                [outlineWordEls[i], solidWordEls[i]].forEach((el) => {
                    if (!el) return;
                    masterTl.to(el, {
                        opacity: 0,
                        y: -40,
                        duration: transitionDuration,
                        ease: "power2.inOut",
                    }, segmentStart);
                });

                // Animate incoming word (both layers)
                [outlineWordEls[i + 1], solidWordEls[i + 1]].forEach((el) => {
                    if (!el) return;
                    masterTl.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: transitionDuration,
                        ease: "power2.inOut",
                    }, segmentStart);
                });
            }

            // 3) Hold the last word for a moment before unpin (add empty time)
            masterTl.to({}, { duration: scrollPerWord * 0.5 });

            // Fade subtext out during the pin
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

            // Typography morphing - weight and tracking changes on scroll
            const wordWrappers = headlineRef.current?.querySelectorAll(".word-wrapper span");
            if (wordWrappers) {
                wordWrappers.forEach((word) => {
                    // Start lighter and wider
                    gsap.set(word, {
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                    });

                    // Morph to bold and tighter as section locks
                    gsap.to(word, {
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: "+=60%",
                            scrub: 1,
                        },
                    });
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const words = heroContent.headline;

    return (
        <section
            ref={containerRef}
            className="relative flex h-screen w-full flex-col justify-center md:justify-start md:pt-20 px-4 sm:px-6 md:px-8 overflow-hidden z-50 pointer-events-none"
            id="home"
        >
            {/* Curtain overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[#fafafa] z-10 origin-top"
            />

            <div className="bg-neutral-200/60 rounded-3xl p-4 sm:p-10 md:p-16 lg:p-20 z-50 relative overflow-hidden min-h-[75vh] sm:min-h-[80vh] md:min-h-0 flex flex-col justify-center md:block">
                <div className="absolute inset-0 z-10">
                    <Scene3D />
                </div>

                <div ref={headlineRef} className="flex flex-col relative z-10">
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
                                            i === words.length - 1 || i === 2
                                                ? "clamp(2rem, 10vw, 10rem)"
                                                : "clamp(2.5rem, 11vw, 11rem)",
                                        WebkitTextStroke: "1px #000000",
                                    }}
                                >
                                    {i === 2 ? (
                                        <span className="rotating-word-container inline-block relative">
                                            {rotatingWords.map((rw, ri) => (
                                                <span
                                                    key={ri}
                                                    ref={(el) => setOutlineWordRef(el, ri)}
                                                    className={`${ri === 0 ? 'relative opacity-100' : 'absolute top-0 left-0 opacity-0'}`}
                                                    style={{
                                                        display: 'inline-block',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {rw}
                                                </span>
                                            ))}
                                        </span>
                                    ) : word}
                                </span>

                                {/* Top Layer: Solid */}
                                <span
                                    className="solid-layer inline-block font-sans font-bold text-[#000000] relative z-10"
                                    style={{
                                        fontSize:
                                            i === words.length - 1 || i === 2
                                                ? "clamp(2rem, 10vw, 10rem)"
                                                : "clamp(2.5rem, 11vw, 11rem)",
                                        willChange: "clip-path",
                                    }}
                                >
                                    {i === 2 ? (
                                        <span className="inline-block relative">
                                            {rotatingWords.map((rw, ri) => (
                                                <span
                                                    key={ri}
                                                    ref={(el) => setSolidWordRef(el, ri)}
                                                    className={`${ri === 0 ? 'relative opacity-100' : 'absolute top-0 left-0 opacity-0'}`}
                                                    style={{
                                                        display: 'inline-block',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {rw}
                                                </span>
                                            ))}
                                        </span>
                                    ) : word}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <p
                    ref={subtextRef}
                    className="mt-10 font-sans text-[10px] font-bold tracking-[0.3em] text-neutral-400 sm:text-xs uppercase relative z-10"
                >
                    {heroContent.subtext}
                </p>
            </div>
        </section >
    );
}
