"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const SUBJECT_OPTIONS = [
    "General Inquiry",
    "Partnership Opportunity",
    "Investment Discussion",
    "Media & Press",
    "Careers",
    "Other",
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const topBorderRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subjectLine = form.subject || "General Inquiry";
        const body = `Name: ${form.name}%0D%0A%0D%0A${form.message}`;
        window.location.href = `mailto:hello@thecometcompanies.com?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
    };

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Animated top border
            gsap.fromTo(
                topBorderRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            // Left column — text/info
            if (leftColRef.current) {
                const leftElements = leftColRef.current.querySelectorAll("[data-reveal]");
                gsap.fromTo(
                    Array.from(leftElements),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );
            }

            // Right column — form
            if (rightColRef.current) {
                const rightElements = rightColRef.current.querySelectorAll("[data-reveal]");
                gsap.fromTo(
                    Array.from(rightElements),
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        delay: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );
            }
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="px-6 py-28 sm:px-12 md:px-24 md:py-36 lg:px-32 overflow-hidden"
            id="contact"
        >
            {/* Animated top border */}
            <div
                ref={topBorderRef}
                className="w-full h-px bg-neutral-200 mb-20 origin-left"
                style={{ transform: "scaleX(0)" }}
            />

            <div className="contact-grid" style={{ maxWidth: "1400px", margin: "0 auto" }}>
                {/* ── Left Column — Info ── */}
                <div ref={leftColRef} className="flex flex-col gap-12">
                    <div className="max-w-md">
                        <TextReveal
                            text="Get in Touch"
                            as="h2"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.625rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.25em",
                                color: "#9ca3af",
                                marginBottom: "1.5rem",
                            }}
                        />

                        <p
                            data-reveal
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                fontWeight: 800,
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                                color: "#111827",
                                opacity: 0,
                            }}
                        >
                            Let&apos;s build something
                            <br />
                            together.
                        </p>
                    </div>

                    <div data-reveal style={{ opacity: 0 }}>
                        <h4
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                color: "#9ca3af",
                                marginBottom: "1rem",
                            }}
                        >
                            Direct Inquiries
                        </h4>
                        <a
                            href="mailto:hello@thecometcompanies.com"
                            className="email-link relative inline-block text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight"
                            style={{ textDecoration: "none" }}
                        >
                            hello@thecometcompanies.com
                        </a>

                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                color: "#9ca3af",
                                marginTop: "1.5rem",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Serious inquiries only.
                        </p>
                    </div>
                </div>

                {/* ── Right Column — Form ── */}
                <div ref={rightColRef}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                        {/* Name + Email row */}
                        <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", opacity: 0 }} className="contact-form-row">
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="block mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-400"
                                >
                                    Name
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className="contact-input"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="block mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-400"
                                >
                                    Email
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="contact-input"
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div data-reveal style={{ opacity: 0 }}>
                            <label
                                htmlFor="contact-subject"
                                className="block mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-400"
                            >
                                Subject
                            </label>
                            <select
                                id="contact-subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="contact-input"
                                style={{ cursor: "pointer" }}
                            >
                                <option value="" disabled>
                                    Select a topic
                                </option>
                                {SUBJECT_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Message */}
                        <div data-reveal style={{ opacity: 0 }}>
                            <label
                                htmlFor="contact-message"
                                className="block mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-400"
                            >
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us about your project or inquiry..."
                                rows={5}
                                className="contact-textarea"
                            />
                        </div>

                        {/* Submit */}
                        <div data-reveal style={{ opacity: 0 }}>
                            <button type="submit" className="contact-submit w-full sm:w-auto">
                                Send Message
                                <span style={{ marginLeft: "0.75rem", transition: "transform 0.3s ease" }}>→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
