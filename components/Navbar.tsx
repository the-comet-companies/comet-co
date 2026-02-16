"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const NAV_ITEMS = [
    { label: "Home", target: "#home" },
    { label: "Portfolio", target: "#portfolio" },
    { label: "Philosophy", target: "#philosophy" },
    { label: "About", target: "#about" },
    { label: "Contact", target: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileLinkRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Entrance animation
    useEffect(() => {
        if (!navRef.current) return;
        gsap.fromTo(
            navRef.current,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 1.8, ease: "power3.out" }
        );
    }, []);

    // Active section tracking — uses scroll events for reliability with pinned sections
    useEffect(() => {
        const updateActive = () => {
            const viewportMid = window.innerHeight * 0.4;
            let best = 0;

            NAV_ITEMS.forEach((item, index) => {
                const section = document.querySelector(item.target);
                if (!section) return;
                const rect = section.getBoundingClientRect();
                // Section is "active" if its top is above the 40% mark
                if (rect.top <= viewportMid) {
                    best = index;
                }
            });

            setActiveIndex(best);
        };

        // Initial check after a tick (let pins set up)
        const timer = setTimeout(() => {
            updateActive();
            ScrollTrigger.addEventListener("refresh", updateActive);
        }, 200);

        window.addEventListener("scroll", updateActive, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", updateActive);
            ScrollTrigger.removeEventListener("refresh", updateActive);
        };
    }, []);

    // Move active indicator
    useEffect(() => {
        const activeLink = linksRef.current[activeIndex];
        const indicator = indicatorRef.current;
        const container = navRef.current?.querySelector("[data-links]");

        if (!activeLink || !indicator || !container) return;

        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        gsap.to(indicator, {
            left: linkRect.left - containerRect.left,
            width: linkRect.width,
            duration: 0.4,
            ease: "power3.out",
        });
    }, [activeIndex]);

    // Smooth scroll handler
    const handleNavClick = (target: string) => {
        setMobileOpen(false);
        const section = document.querySelector(target);
        if (!section) return;

        gsap.to(window, {
            scrollTo: { y: section, offsetY: 0 },
            duration: 1.2,
            ease: "power3.inOut",
        });
    };

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            gsap.to(mobileMenuRef.current, {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.6,
                ease: "power4.inOut",
            });
            gsap.fromTo(
                mobileLinkRefs.current.filter(Boolean),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: "power3.out" }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.5,
                ease: "power4.inOut",
                onComplete: () => { document.body.style.overflow = ""; },
            });
        }
    }, [mobileOpen]);

    // Handle Escape key to close menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && mobileOpen) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen]);

    return (
        <>
            {/* ── Main Navbar ── */}
            <nav
                ref={navRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 2.5rem",
                    pointerEvents: "none",
                    opacity: 0,
                }}
            >
                {/* Brand */}
                <button
                    onClick={() => handleNavClick("#home")}
                    aria-label="Go to Home"
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 900,
                        fontSize: "0.7rem",
                        letterSpacing: "0.25em",
                        color: "#000",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        padding: "0.5rem 0",
                    }}
                >
                    TCC
                </button>

                {/* Desktop floating pill */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.65)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        borderRadius: "100px",
                        padding: "6px 8px",
                        pointerEvents: mobileOpen ? "none" : "auto", // Disable clicks when hidden
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                        opacity: mobileOpen ? 0 : 1, // Fade out when menu is open
                        transition: "opacity 0.3s ease",
                    }}
                    className="hidden md:block" // Keep it hidden on mobile, visible on desktop (until faded out)
                >
                    <div
                        data-links
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                            position: "relative",
                        }}
                    >
                        {NAV_ITEMS.map((item, i) => (
                            <button
                                key={item.label}
                                ref={(el) => { linksRef.current[i] = el; }}
                                onClick={() => handleNavClick(item.target)}
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase" as const,
                                    color: activeIndex === i ? "#000" : "#9ca3af",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "8px 18px",
                                    borderRadius: "100px",
                                    transition: "color 0.3s ease",
                                    position: "relative",
                                    whiteSpace: "nowrap" as const,
                                    zIndex: 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (activeIndex !== i) e.currentTarget.style.color = "#374151";
                                }}
                                onMouseLeave={(e) => {
                                    if (activeIndex !== i) e.currentTarget.style.color = "#9ca3af";
                                }}
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Active pill background indicator */}
                        <div
                            ref={indicatorRef}
                            style={{
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                borderRadius: "100px",
                                background: "rgba(0, 0, 0, 0.05)",
                                pointerEvents: "none",
                                transition: "none",
                            }}
                        />
                    </div>
                </div>

                {/* Hamburger (visible on all screens now) */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        padding: "0.5rem",
                        zIndex: 9002,
                        position: "relative",
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            width: "24px",
                            height: "1.5px",
                            background: "#000",
                            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            transformOrigin: "center",
                            transform: mobileOpen ? "translateY(3.75px) rotate(45deg)" : "none",
                        }}
                    />
                    <span
                        style={{
                            display: "block",
                            width: "24px",
                            height: "1.5px",
                            background: "#000",
                            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            transformOrigin: "center",
                            transform: mobileOpen ? "translateY(-3.75px) rotate(-45deg)" : "none",
                        }}
                    />
                </button>
            </nav>

            {/* ── Fullscreen Overlay (visible on all screens) ── */}
            <div
                ref={mobileMenuRef}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9001,
                    background: "rgba(250, 250, 250, 0.97)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    clipPath: "inset(0 0 100% 0)",
                    willChange: "clip-path",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
                    {NAV_ITEMS.map((item, i) => (
                        <button
                            key={item.label}
                            ref={(el) => { mobileLinkRefs.current[i] = el; }}
                            onClick={() => handleNavClick(item.target)}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "2.5rem",
                                fontWeight: 800,
                                textTransform: "uppercase" as const,
                                letterSpacing: "-0.02em",
                                color: activeIndex === i ? "#000" : "#d1d5db",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "baseline",
                                gap: "1rem",
                                transition: "color 0.3s ease, transform 0.3s ease",
                                textAlign: "left" as const,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#000";
                                e.currentTarget.style.transform = "translateX(8px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = activeIndex === i ? "#000" : "#d1d5db";
                                e.currentTarget.style.transform = "none";
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.15em",
                                    color: "#9ca3af",
                                    minWidth: "1.5rem",
                                }}
                            >
                                →
                            </span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div >
        </>
    );
}
