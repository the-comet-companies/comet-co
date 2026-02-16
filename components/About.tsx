"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent, teamMembers } from "@/lib/data";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
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

            // Typography morphing for "Who We Are" heading
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
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2rem",
                    }}
                >
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            data-team
                            style={{
                                opacity: 0,
                                textAlign: "center",
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
                                }}
                            >
                                {member.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    [style*="grid-template-columns: repeat(3"] {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
