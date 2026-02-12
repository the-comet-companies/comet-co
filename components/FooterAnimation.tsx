"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAV_LINKS = [
    { label: "Home", target: "#home" },
    { label: "Portfolio", target: "#portfolio" },
    { label: "Philosophy", target: "#philosophy" },
    { label: "Contact", target: "#contact" },
];

const SOCIAL_LINKS = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function FooterAnimation() {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal of footer columns
            const cols = footerRef.current?.querySelectorAll("[data-col]");
            if (cols) {
                gsap.fromTo(
                    Array.from(cols),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 90%",
                            once: true,
                        },
                    }
                );
            }

            // Bottom bar fade in
            const bottomBar = footerRef.current?.querySelector("[data-bottom]");
            if (bottomBar) {
                gsap.fromTo(
                    bottomBar,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 90%",
                            once: true,
                        },
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleNavClick = (target: string) => {
        const section = document.querySelector(target);
        if (!section) return;
        gsap.to(window, {
            scrollTo: { y: section, offsetY: 0 },
            duration: 1.2,
            ease: "power3.inOut",
        });
    };

    return (
        <footer
            ref={footerRef}
            style={{
                background: "#000",
                color: "#fff",
                padding: "5rem 2rem 2rem",
            }}
        >
            <div
                ref={contentRef}
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {/* Main columns */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
                        gap: "3rem",
                    }}
                    className="footer-grid"
                >
                    {/* Brand column */}
                    <div data-col>
                        <button
                            onClick={() => handleNavClick("#home")}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontWeight: 900,
                                fontSize: "1.2rem",
                                letterSpacing: "0.2em",
                                color: "#fff",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                marginBottom: "1.5rem",
                                display: "block",
                            }}
                        >
                            TCC
                        </button>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.85rem",
                                lineHeight: 1.7,
                                color: "#6b7280",
                                maxWidth: "280px",
                            }}
                        >
                            We build focused businesses. Operator-led, long-term, deliberate.
                        </p>
                    </div>

                    {/* Company links */}
                    <div data-col>
                        <h4
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                color: "#6b7280",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Company
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => handleNavClick(link.target)}
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            color: "#d1d5db",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                            transition: "color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "#d1d5db"; }}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect / Social */}
                    <div data-col>
                        <h4
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                color: "#6b7280",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Connect
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            color: "#d1d5db",
                                            textDecoration: "none",
                                            transition: "color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "#d1d5db"; }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div data-col>
                        <h4
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                color: "#6b7280",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Stay Updated
                        </h4>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.8rem",
                                color: "#9ca3af",
                                lineHeight: 1.6,
                                marginBottom: "1.25rem",
                            }}
                        >
                            Get periodic updates on our progress and new ventures.
                        </p>
                        <div style={{ display: "flex", gap: "0" }}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.75rem",
                                    padding: "0.65rem 1rem",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRight: "none",
                                    color: "#fff",
                                    outline: "none",
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            />
                            <button
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.15em",
                                    padding: "0.65rem 1.25rem",
                                    background: "#fff",
                                    color: "#000",
                                    border: "none",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "opacity 0.3s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                        margin: "3.5rem 0 1.5rem",
                    }}
                />

                {/* Bottom bar */}
                <div
                    data-bottom
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        opacity: 0,
                        flexWrap: "wrap",
                        gap: "0.5rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            letterSpacing: "0.15em",
                            color: "#4b5563",
                            textTransform: "uppercase",
                        }}
                    >
                        © {new Date().getFullYear()} The Comet Companies
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            letterSpacing: "0.15em",
                            color: "#4b5563",
                            textTransform: "uppercase",
                        }}
                    >
                        Built with intent.
                    </p>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </footer>
    );
}
