"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const philosophyData = [
    {
        statement: "We build.",
        rotatingWords: ["INFRASTRUCTURE", "RELATIONSHIPS", "SYSTEMS", "VALUE"],
        outcome: "Foundations that last decades, not quarters",
    },
    {
        statement: "We operate.",
        rotatingWords: ["WITH INTENT", "AT SCALE", "FOR IMPACT", "WITH PRECISION"],
        outcome: "Efficient execution across all business verticals",
    },
    {
        statement: "We focus.",
        rotatingWords: ["ON WHAT MATTERS", "ON GROWTH", "ON SUSTAINABILITY", "ON OUTCOMES"],
        outcome: "Laser-sharp prioritization drives results",
    },
    {
        statement: "We remove noise.",
        rotatingWords: ["CLUTTER", "FRICTION", "UNCERTAINTY", "COMPLEXITY"],
        outcome: "Clarity emerges when distraction disappears",
    },
    {
        statement: "We compound.",
        rotatingWords: ["EFFORTS", "KNOWLEDGE", "NETWORKS", "CAPITAL"],
        outcome: "Small consistent wins become transformative outcomes",
    },
];

export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    
    const outlineWordsRefs = useRef<(HTMLSpanElement | null)[][]>([]);
    const solidWordsRefs = useRef<(HTMLSpanElement | null)[][]>([]);

    const setOutlineWordRef = useCallback((el: HTMLSpanElement | null, itemIndex: number, wordIndex: number) => {
        if (!outlineWordsRefs.current[itemIndex]) {
            outlineWordsRefs.current[itemIndex] = [];
        }
        if (el) outlineWordsRefs.current[itemIndex][wordIndex] = el;
    }, []);

    const setSolidWordRef = useCallback((el: HTMLSpanElement | null, itemIndex: number, wordIndex: number) => {
        if (!solidWordsRefs.current[itemIndex]) {
            solidWordsRefs.current[itemIndex] = [];
        }
        if (el) solidWordsRefs.current[itemIndex][wordIndex] = el;
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(headingRef.current, { opacity: 0, x: 20 });
            gsap.set(dividerRef.current, { scaleX: 0 });
            itemsRef.current.forEach((item) => {
                if (item) {
                    gsap.set(item, { opacity: 0, y: 60 });
                }
            });

            // Set rotating words initial state
            outlineWordsRefs.current.forEach((wordArray) => {
                if (wordArray) {
                    wordArray.forEach((w, i) => {
                        gsap.set(w, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
                    });
                }
            });
            solidWordsRefs.current.forEach((wordArray) => {
                if (wordArray) {
                    wordArray.forEach((w, i) => {
                        gsap.set(w, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
                    });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top top",
                    end: "+=400%",
                    pin: true,
                    scrub: 1,
                }
            });

            // 1. Heading slide in
            tl.to(headingRef.current, { opacity: 1, x: 0, duration: 0.5 });
            
            // 2. Divider draws
            tl.to(dividerRef.current, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, ">-0.3");

            // 3. Items animate in sequence with rotating words
            const itemsPerScroll = 100 / philosophyData.length;
            
            philosophyData.forEach((_, itemIndex) => {
                const itemStart = itemsPerScroll * itemIndex;
                
                // Animate item in
                tl.to(itemsRef.current[itemIndex], { 
                    opacity: 1, 
                    y: 0, 
                    duration: itemsPerScroll * 0.6,
                    ease: "power2.out"
                }, `>+${itemStart * 0.1}`);

                // Animate rotating words for this item
                const rotatingWords = philosophyData[itemIndex].rotatingWords;
                const outlineWords = outlineWordsRefs.current[itemIndex];
                const solidWords = solidWordsRefs.current[itemIndex];

                if (outlineWords && solidWords) {
                    for (let i = 0; i < rotatingWords.length - 1; i++) {
                        const wordStart = itemStart + (itemsPerScroll * 0.3) + (i * itemsPerScroll * 0.15);
                        
                        // Animate out current word
                        tl.to([outlineWords[i], solidWords[i]], {
                            opacity: 0,
                            y: -20,
                            duration: itemsPerScroll * 0.1,
                            ease: "power2.inOut"
                        }, `>+${wordStart * 0.01}`);

                        // Animate in next word
                        tl.to([outlineWords[i + 1], solidWords[i + 1]], {
                            opacity: 1,
                            y: 0,
                            duration: itemsPerScroll * 0.1,
                            ease: "power2.inOut"
                        }, "<");
                    }
                }
            });

            // Final hold
            tl.to({}, { duration: 5 });

        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="philosophy" className="h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 overflow-hidden bg-neutral-50">
            <div className="philosophy-inner w-full max-w-7xl mx-auto">
                <h2 ref={headingRef} className="mb-16 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 text-right">
                    Philosophy
                </h2>

                <div ref={dividerRef} className="w-full border-t border-neutral-200 mb-16 origin-right" style={{ transform: "scaleX(0" }} />

                <div className="philosophy-items flex flex-col space-y-12">
                    {philosophyData.map((item, index) => (
                        <div
                            key={item.statement}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className="philosophy-item flex flex-col items-end"
                        >
                            <div className="statement-wrapper flex flex-col items-end">
                                <div className="statement-main flex flex-wrap items-baseline justify-end gap-3">
                                    <span className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-neutral-900">
                                        {item.statement}
                                    </span>
                                    
                                    {/* Rotating Keywords */}
                                    <div className="rotating-keywords-container relative inline-block overflow-hidden h-[1.2em]">
                                        {/* Bottom Layer - Outline */}
                                        <span className="absolute top-0 left-0 inline-block" aria-hidden="true">
                                            {item.rotatingWords.map((rw, ri) => (
                                                <span
                                                    key={ri}
                                                    ref={(el) => setOutlineWordRef(el, index, ri)}
                                                    className="inline-block font-sans font-bold text-transparent text-2xl sm:text-3xl md:text-4xl"
                                                    style={{
                                                        WebkitTextStroke: "1px #9ca3af",
                                                        opacity: ri === 0 ? 1 : 0,
                                                    }}
                                                >
                                                    {rw}
                                                </span>
                                            ))}
                                        </span>
                                        
                                        {/* Top Layer - Solid */}
                                        <span className="rotating-solid-layer absolute top-0 left-0 inline-block clip-wipe">
                                            {item.rotatingWords.map((rw, ri) => (
                                                <span
                                                    key={ri}
                                                    ref={(el) => setSolidWordRef(el, index, ri)}
                                                    className="inline-block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-neutral-500"
                                                    style={{
                                                        clipPath: "inset(0 0 0 0)",
                                                    }}
                                                >
                                                    {rw}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Business Outcome */}
                            <p className="outcome-text mt-4 font-sans text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl text-right tracking-tight">
                                {item.outcome}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
