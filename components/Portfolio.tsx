"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Apply scale-down effect to each card as it gets covered
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Set z-index stack
                gsap.set(card, { zIndex: index + 1 });

                // Animate scale of CURRENT card as the NEXT card scrolls overlapping it
                // We trigger this based on the NEXT card's position relative to viewport
                // OR simpler: Animate this card based on scroll of container? 

                // Standard approach for sticky stack scale:
                // Animate 'scale' from 1 -> 0.95 as it moves up/stays pinned? 
                // Actually, sticky cards don't move. The next one moves ON TOP.
                // So we need to animate the card that is STUCK at top.

                gsap.to(card, {
                    scale: 0.95,
                    opacity: 0.8, // Fade slightly
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",
                        scrub: true,
                        end: `+=${window.innerHeight}`,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full px-4 md:px-0">

            {/* Section Header (Optional, or integrated into first card styling) */}
            <div className="px-6 py-24 sm:px-12 md:px-24 lg:px-32">
                <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                    Our Portfolio
                </h2>
            </div>

            <div className="flex flex-col w-full pb-24">
                {portfolioItems.map((item, index) => (
                    <div
                        key={item.slug}
                        ref={(el) => { cardsRef.current[index] = el; }}
                        className="sticky top-0 flex h-screen w-full items-center justify-center p-2 sm:p-6 md:p-12"
                    >
                        {/* Card Container */}
                        <div className="relative flex h-full w-full max-w-[90vw] flex-col overflow-hidden border border-neutral-200 bg-white/95 shadow-sm transition-all md:flex-row">

                            {/* Left: Identity */}
                            <div className="flex flex-col justify-between p-8 md:w-1/2 md:p-16 bg-neutral-50/50">
                                <div>
                                    <span className="mb-4 block font-sans text-xs font-medium tracking-[0.2em] text-neutral-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <Link href={`/portfolio/${item.slug}`}>
                                        <h3 className="font-sans text-4xl font-bold uppercase leading-none tracking-tighter text-neutral-900 md:text-6xl lg:text-7xl transition-opacity hover:opacity-70 cursor-pointer">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="mt-4 font-sans text-lg text-neutral-500 font-medium">
                                        {item.tagline}
                                    </p>
                                </div>

                                <div className="mt-12 md:mt-0">
                                    <Link
                                        href={`/portfolio/${item.slug}`}
                                        className="inline-flex items-center gap-3 border-b border-black pb-1 font-sans text-sm font-bold uppercase tracking-widest text-black transition-all hover:gap-6 hover:opacity-70"
                                    >
                                        View Case Study
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="relative flex h-full w-full flex-col justify-center border-t border-neutral-200 bg-neutral-100 md:w-1/2 md:border-l md:border-t-0">
                                <div className="relative h-full w-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
