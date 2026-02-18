"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent, teamMembers, founderContent } from "@/lib/data";
import TextReveal from "./TextReveal";
import Tooltip from "./Tooltip";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const founderPanelRef = useRef<HTMLDivElement>(null);
    const [founderOpen, setFounderOpen] = useState(false);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            const statItems = statsRef.current?.querySelectorAll("[data-stat]");
            if (statItems) {
                gsap.fromTo(
                    statItems,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }

            const teamItems = teamRef.current?.querySelectorAll("[data-team]");
            if (teamItems) {
                gsap.fromTo(
                    teamItems,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: teamRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }

            const dividerItems = teamRef.current?.querySelectorAll("[data-team-divider]");
            if (dividerItems) {
                gsap.fromTo(
                    dividerItems,
                    { opacity: 0, scaleY: 0 },
                    {
                        opacity: 1,
                        scaleY: 1,
                        duration: 0.8,
                        delay: 0.2, // Wait slightly for text to start
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: teamRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }


            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { fontWeight: 300, letterSpacing: "0.05em" },
                    {
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1,
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full" id="about" style={{ padding: "6rem 0" }}>
            <div
                ref={contentRef}
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 2rem",
                    opacity: 0,
                    willChange: "opacity, transform",
                }}
            >
                <TextReveal
                    text="About Us"
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

                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    <div>
                        <h3
                            ref={headingRef}
                            style={{
                                willChange: "font-weight, letter-spacing",
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                                fontWeight: 300,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                lineHeight: 1.1,
                                color: "#111827",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Who We Are
                        </h3>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                                fontWeight: 400,
                                lineHeight: 1.7,
                                color: "#4b5563",
                                maxWidth: "700px",
                            }}
                        >
                            {aboutContent.story}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "2rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid #e5e7eb",
                        }}
                    >
                        <div>
                            <h4
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    color: "#9ca3af",
                                    marginBottom: "1rem",
                                }}
                            >
                                Our Mission
                            </h4>
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    color: "#374151",
                                }}
                            >
                                {aboutContent.mission}
                            </p>
                        </div>

                        <div>
                            <h4
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    color: "#9ca3af",
                                    marginBottom: "1rem",
                                }}
                            >
                                Operating Model
                            </h4>
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    color: "#374151",
                                }}
                            >
                                {aboutContent.operatingModel}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={statsRef}
                style={{
                    maxWidth: "1400px",
                    margin: "4rem auto 0",
                    padding: "3rem 2rem",
                    borderTop: "1px solid #e5e7eb",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1rem",
                    }}
                >
                    {aboutContent.stats.map((stat) => (
                        <div
                            key={stat.label}
                            data-stat
                            style={{
                                textAlign: "center",
                                opacity: 0,
                                willChange: "opacity, transform",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "-0.02em",
                                    color: "#111827",
                                    lineHeight: 1,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.15em",
                                    color: "#9ca3af",
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={teamRef}
                style={{
                    maxWidth: "1400px",
                    margin: "4rem auto 0",
                    padding: "3rem 2rem",
                    borderTop: "1px solid #e5e7eb",
                }}
            >
                <h4
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#9ca3af",
                        marginBottom: "2rem",
                    }}
                >
                    Leadership
                </h4>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        gap: "0",
                    }}
                    className="leadership-grid"
                >
                    {teamMembers.map((member, index) => (
                        <div key={member.name} className="leadership-member" style={{ display: "contents" }}>
                            <div
                                data-team
                                style={{
                                    opacity: 0,
                                    textAlign: "center",
                                    flex: 1,
                                    padding: "0 1rem",
                                    willChange: "opacity, transform",
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        color: "#111827",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    {member.name}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.8rem",
                                        fontWeight: 400,
                                        color: "#6b7280",
                                        cursor: "help",
                                    }}
                                >
                                    <Tooltip content={member.fullRole}>
                                        <span style={{ borderBottom: "1px dashed #d1d5db" }}>{member.role}</span>
                                    </Tooltip>
                                </div>

                                {/* "Get to know me" trigger — only for CEO */}
                                {member.role === "CEO" && (
                                    <button
                                        onClick={() => {
                                            const panel = founderPanelRef.current;
                                            if (!panel) return;
                                            const opening = !founderOpen;
                                            setFounderOpen(opening);

                                            if (opening) {
                                                gsap.set(panel, { height: "auto", opacity: 1 });
                                                const h = panel.offsetHeight;
                                                gsap.fromTo(panel,
                                                    { height: 0, opacity: 0 },
                                                    { height: h, opacity: 1, duration: 0.6, ease: "power3.out" }
                                                );
                                                const cards = panel.querySelectorAll("[data-trait]");
                                                gsap.fromTo(cards,
                                                    { opacity: 0, y: 15 },
                                                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.15, ease: "power3.out" }
                                                );
                                            } else {
                                                gsap.to(panel, { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut" });
                                            }
                                        }}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.35rem",
                                            marginTop: "0.75rem",
                                            padding: "0.35rem 0.75rem",
                                            background: "none",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "999px",
                                            cursor: "pointer",
                                            outline: "none",
                                            transition: "border-color 0.3s, color 0.3s",
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.7rem",
                                            fontWeight: 500,
                                            color: "#6b7280",
                                            letterSpacing: "0.02em",
                                        }}
                                        className="founder-accordion-trigger"
                                    >
                                        Get to know me
                                        <svg
                                            width="10" height="10" viewBox="0 0 14 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                transform: founderOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                        >
                                            <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Divider */}
                            {index < teamMembers.length - 1 && (
                                <div
                                    data-team-divider
                                    className="leadership-divider"
                                    style={{
                                        width: "1px",
                                        background: "#e5e7eb",
                                        opacity: 0,
                                        margin: "0 1rem",
                                        willChange: "opacity, transform",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Accordion Panel — expands below the leadership grid */}
                <div
                    ref={founderPanelRef}
                    style={{
                        height: 0,
                        opacity: 0,
                        overflow: "hidden",
                    }}
                >
                    <div style={{ paddingTop: "2rem", paddingBottom: "0.5rem", borderTop: "1px solid #e5e7eb", marginTop: "2rem" }}>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                                fontWeight: 400,
                                lineHeight: 1.7,
                                color: "#4b5563",
                                maxWidth: "700px",
                                marginBottom: "2rem",
                            }}
                        >
                            {founderContent.blurb}
                        </p>

                        <div
                            className="founder-traits-grid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1.5rem",
                            }}
                        >
                            {founderContent.traits.map((trait) => (
                                <div
                                    key={trait.label}
                                    data-trait
                                    style={{
                                        padding: "1.25rem 1.5rem",
                                        background: "#f9fafb",
                                        borderLeft: "2px solid #e5e7eb",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.85rem",
                                            fontWeight: 700,
                                            color: "#111827",
                                            marginBottom: "0.35rem",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {trait.label}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.85rem",
                                            fontWeight: 400,
                                            lineHeight: 1.5,
                                            color: "#6b7280",
                                        }}
                                    >
                                        {trait.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    [style*="grid-template-columns: repeat(3"] {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .leadership-grid {
                        flex-direction: column !important;
                        gap: 2rem !important;
                    }
                    .leadership-divider {
                        display: none !important;
                    }
                    .leadership-member {
                        display: block !important;
                        text-align: center;
                        width: 100%;
                    }
                    .founder-traits-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .founder-accordion-trigger {
                        justify-content: center !important;
                    }
                }
                .founder-accordion-trigger:hover {
                    border-color: #9ca3af !important;
                    color: #374151 !important;
                }
            `}</style>
        </section>
    );
}
