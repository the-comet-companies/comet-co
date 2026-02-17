"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { operatingPrinciples } from "@/lib/data";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function OperatingPrinciples() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            const principleItems = itemsRef.current?.querySelectorAll("[data-principle]");
            if (principleItems) {
                gsap.fromTo(
                    principleItems,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: itemsRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            id="principles"
            style={{ padding: "6rem 0" }}
        >
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div ref={headerRef}>
                    <TextReveal
                        text="Operating Principles"
                        as="h2"
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.25em",
                            color: "#9ca3af",
                            marginBottom: "3rem",
                        }}
                    />

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200"
                    >
                        {operatingPrinciples.map((principle) => (
                            <div
                                key={principle.number}
                                data-principle
                                className="bg-neutral-50 py-12 px-8"
                            >
                                <h3
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                                        fontWeight: 700,
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                        color: "#111827",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    {principle.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.95rem",
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                        color: "#6b7280",
                                    }}
                                >
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
