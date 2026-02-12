"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
    { text: "We build.", size: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" },
    { text: "We operate.", size: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" },
    { text: "We focus.", size: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" },
    {
        text: "We remove noise.",
        size: "text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[6.5rem]",
        bold: true,
    },
];

export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const statementsContainerRef = useRef<HTMLDivElement>(null);
    const statementRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Initial setup: Statements visible, start shifted LEFT (so they move right)
            statementRefs.current.forEach((stmt) => {
                if (stmt) gsap.set(stmt, { opacity: 0.25, x: -100 });
            });

            // Master timeline with pinning
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
                }
            });

            // 1. Heading slide in
            tl.fromTo(headingRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.5 }
            );

            // 2. Divider draws
            tl.fromTo(dividerRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
            );

            // 3. Statements Move Right + Fade In Sequentially
            // "Make it move to the right"
            statementRefs.current.forEach((stmt, index) => {
                if (stmt) {
                    tl.to(stmt, {
                        opacity: 1,
                        x: 0, // Moves to native right-aligned position
                        duration: 2,
                        ease: "power2.out"
                    }, ">-0.5");
                }
            });

            // 4. Hold
            tl.to({}, { duration: 1 });

        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="philosophy" className="h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 overflow-hidden">
            <div className="philosophy-inner w-full flex flex-col items-end">
                <h2
                    ref={headingRef}
                    className="mb-16 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 text-right"
                >
                    Philosophy
                </h2>

                <div
                    ref={dividerRef}
                    className="w-full border-t border-neutral-200 mb-16 origin-right"
                    style={{ transform: "scaleX(0)" }}
                />

                <div ref={statementsContainerRef} className="philosophy-section flex flex-col space-y-3 items-end overflow-hidden w-full">
                    {statements.map((statement, index) => (
                        <p
                            key={statement.text}
                            ref={(el) => { statementRefs.current[index] = el; }}
                            className={`philosophy-statement font-sans text-right tracking-tight text-neutral-900 ${statement.size} ${statement.bold ? "font-black" : "font-bold"}`}
                        // Set initial styles in CSS/JS to avoid flash
                        >
                            {statement.text}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
