"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/data";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Insights() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

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

            const insightItems = listRef.current?.querySelectorAll("[data-insight]");
            if (insightItems) {
                gsap.fromTo(
                    insightItems,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
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
            id="insights"
            style={{ padding: "6rem 0" }}
        >
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div ref={headerRef} style={{ opacity: 1 }}>
                    <TextReveal
                        text="Insights"
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

                    <div ref={listRef}>
                        {insights.map((insight, index) => (
                            <div
                                key={insight.title}
                                data-insight
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    padding: "1.5rem 0",
                                    borderTop: index === 0 ? "1px solid #111827" : "1px solid #e5e7eb",
                                    borderBottom: index === insights.length - 1 ? "1px solid #111827" : "none",
                                    cursor: "pointer",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                    willChange: "opacity, transform", // Hint for browser optimization
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.opacity = "0.6";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.opacity = "1";
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.75rem",
                                            fontWeight: 500,
                                            color: "#9ca3af",
                                            minWidth: "3rem",
                                        }}
                                    >
                                        {insight.date}
                                    </span>
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                                            fontWeight: 500,
                                            letterSpacing: "-0.01em",
                                            color: "#111827",
                                        }}
                                    >
                                        {insight.title}
                                    </h3>
                                </div>
                                <ArrowUpRight
                                    size={18}
                                    style={{
                                        color: "#9ca3af",
                                        flexShrink: 0,
                                        marginLeft: "1rem",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
