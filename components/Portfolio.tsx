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
            // Staggered reveal on scroll
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full" id="portfolio">
            {/* Section header */}
            <div
                style={{
                    padding: "6rem 2rem 3rem",
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                <h2
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        color: "#9ca3af",
                    }}
                >
                    Our Portfolio
                </h2>
            </div>

            {/* Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1px",
                    background: "#e5e7eb",
                    maxWidth: "1400px",
                    margin: "0 auto 6rem",
                }}
            >
                {portfolioItems.map((item, index) => (
                    <div
                        key={item.slug}
                        ref={(el) => { cardsRef.current[index] = el; }}
                        style={{ opacity: 0 }}
                    >
                        <Link href={`/portfolio/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    background: "#fafafa",
                                    cursor: "pointer",
                                    minHeight: "clamp(280px, 40vh, 420px)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    padding: "2.5rem",
                                }}
                                className="portfolio-grid-card"
                                onMouseEnter={(e) => {
                                    const card = e.currentTarget;
                                    const img = card.querySelector("[data-bg]") as HTMLElement;
                                    const overlay = card.querySelector("[data-overlay]") as HTMLElement;
                                    const arrow = card.querySelector("[data-arrow]") as HTMLElement;

                                    if (img) gsap.to(img, { opacity: 1, scale: 1.05, duration: 0.6, ease: "power2.out" });
                                    if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 });
                                    if (arrow) gsap.to(arrow, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" });

                                    // Turn text white
                                    const texts = card.querySelectorAll("[data-text]");
                                    texts.forEach((t) => gsap.to(t, { color: "#fff", duration: 0.3 }));
                                }}
                                onMouseLeave={(e) => {
                                    const card = e.currentTarget;
                                    const img = card.querySelector("[data-bg]") as HTMLElement;
                                    const overlay = card.querySelector("[data-overlay]") as HTMLElement;
                                    const arrow = card.querySelector("[data-arrow]") as HTMLElement;

                                    if (img) gsap.to(img, { opacity: 0, scale: 1, duration: 0.5, ease: "power2.out" });
                                    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
                                    if (arrow) gsap.to(arrow, { opacity: 0, x: -10, duration: 0.3 });

                                    // Revert text
                                    const nameEl = card.querySelector("[data-name]") as HTMLElement;
                                    const tagEl = card.querySelector("[data-tag]") as HTMLElement;
                                    const idxEl = card.querySelector("[data-idx]") as HTMLElement;
                                    if (nameEl) gsap.to(nameEl, { color: "#111827", duration: 0.3 });
                                    if (tagEl) gsap.to(tagEl, { color: "#6b7280", duration: 0.3 });
                                    if (idxEl) gsap.to(idxEl, { color: "#9ca3af", duration: 0.3 });
                                }}
                            >
                                {/* Background image — hidden by default */}
                                <div
                                    data-bg
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        opacity: 0,
                                        willChange: "transform, opacity",
                                    }}
                                />

                                {/* Dark overlay for text legibility on hover */}
                                <div
                                    data-overlay
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "rgba(0, 0, 0, 0.55)",
                                        opacity: 0,
                                    }}
                                />

                                {/* Content (always visible) */}
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <span
                                        data-text
                                        data-idx
                                        style={{
                                            display: "block",
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.65rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.2em",
                                            color: "#9ca3af",
                                            marginBottom: "1.5rem",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <h3
                                        data-text
                                        data-name
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1,
                                            color: "#111827",
                                            marginBottom: "0.75rem",
                                        }}
                                    >
                                        {item.name}
                                    </h3>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <p
                                            data-text
                                            data-tag
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.85rem",
                                                fontWeight: 500,
                                                color: "#6b7280",
                                            }}
                                        >
                                            {item.tagline}
                                        </p>

                                        {/* Arrow — hidden by default, slides in on hover */}
                                        <span
                                            data-arrow
                                            style={{
                                                fontSize: "1.25rem",
                                                color: "#fff",
                                                opacity: 0,
                                                transform: "translateX(-10px)",
                                            }}
                                        >
                                            →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Responsive: stack on mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .portfolio-grid-card {
                        min-height: 240px !important;
                    }
                }
                @media (max-width: 640px) {
                    [style*="grid-template-columns: repeat(2"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
