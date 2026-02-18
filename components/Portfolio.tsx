"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems } from "@/lib/data";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card) => {
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
                <TextReveal
                    text="Our Portfolio"
                    as="h2"
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        color: "#9ca3af",
                    }}
                />
            </div>

            {/* Grid — 2 columns for 6 items (3 rows) */}
            <div
                className="portfolio-grid"
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
                    <PortfolioCard
                        key={item.slug}
                        item={item}
                        index={index}
                        ref={(el) => { cardsRef.current[index] = el; }}
                        isActive={activeSlug === item.slug}
                        isTouchDevice={isTouchDevice}
                        onTap={(slug) => setActiveSlug(slug)}
                    />
                ))}
            </div>
        </section>
    );
}

import { forwardRef } from "react";

interface PortfolioCardProps {
    item: (typeof portfolioItems)[number];
    index: number;
    isActive: boolean;
    isTouchDevice: boolean;
    onTap: (slug: string) => void;
}

const PortfolioCard = forwardRef<HTMLDivElement, PortfolioCardProps>(
    function PortfolioCard({ item, index, isActive, isTouchDevice, onTap }, ref) {
        const router = useRouter();

        const handleClick = useCallback((e: React.MouseEvent) => {
            if (!isTouchDevice) return; // Desktop — let Link handle it normally

            e.preventDefault();

            if (isActive) {
                // Second tap → navigate
                router.push(`/portfolio/${item.slug}`);
            } else {
                // First tap → activate (show hover state)
                onTap(item.slug);
            }
        }, [isTouchDevice, isActive, item.slug, onTap, router]);

        return (
            <div ref={ref} style={{ opacity: 0 }}>
                <Link
                    href={`/portfolio/${item.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={handleClick}
                >
                    <div
                        className={`portfolio-card${isActive ? " active" : ""}`}
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
                    >
                        {/* Background screenshot — hidden by default, revealed on hover/active */}
                        <div
                            className="portfolio-card-bg"
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${item.screenshot})`,
                                backgroundSize: "cover",
                                backgroundPosition: "top center",
                                opacity: 0,
                                transition: "opacity 0.4s ease, transform 0.6s ease",
                                transform: "scale(1)",
                            }}
                        />

                        {/* Dark overlay for text legibility on hover */}
                        <div
                            className="portfolio-card-overlay"
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0, 0, 0, 0.55)",
                                opacity: 0,
                                transition: "opacity 0.4s ease",
                            }}
                        />

                        {/* Content (always visible) */}
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <span
                                className="portfolio-card-idx"
                                style={{
                                    display: "block",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.2em",
                                    color: "#9ca3af",
                                    marginBottom: "1.5rem",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3
                                className="portfolio-card-name"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                    color: "#111827",
                                    marginBottom: "0.75rem",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {item.name}
                            </h3>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p
                                    className="portfolio-card-tag"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        color: "#6b7280",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item.tagline}
                                </p>

                                {/* Arrow — hidden by default, slides in on hover */}
                                <span
                                    className="portfolio-card-arrow"
                                    style={{
                                        fontSize: "1.25rem",
                                        color: "#fff",
                                        opacity: 0,
                                        transform: "translateX(-10px)",
                                        transition: "opacity 0.4s ease, transform 0.4s ease",
                                    }}
                                >
                                    →
                                </span>
                            </div>

                            {/* URL label — appears on hover below tagline */}
                            <span
                                className="portfolio-card-url"
                                style={{
                                    display: "block",
                                    marginTop: "0.75rem",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    color: "rgba(255, 255, 255, 0.6)",
                                    opacity: 0,
                                    transform: "translateY(10px)",
                                    transition: "opacity 0.4s ease, transform 0.4s ease",
                                }}
                            >
                                {item.url.replace("https://", "")}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
);
