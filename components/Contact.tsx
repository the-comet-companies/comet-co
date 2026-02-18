"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { contactContent } from "@/lib/data";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const formWrapperRef = useRef<HTMLDivElement>(null);
    const successMessageRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        // Don't set isSuccess yet, wait for animation

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });

                if (formWrapperRef.current && successMessageRef.current) {
                    const tl = gsap.timeline();

                    tl.to(formWrapperRef.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: () => {
                            if (formWrapperRef.current) formWrapperRef.current.style.display = "none";
                            if (successMessageRef.current) successMessageRef.current.style.display = "block";
                            setIsSuccess(true);
                        }
                    })
                        .fromTo(successMessageRef.current,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                        );
                }
            } else {
                setError("Something went wrong. Please try again later.");
                setIsSuccess(false);
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.");
            setIsSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
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
                // Only animate if the form is visible (start of lifecycle)
                const rightElements = rightColRef.current.querySelectorAll("[data-reveal]");
                if (!isSuccess) {
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
                            text={contactContent.heading}
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
                                willChange: "opacity, transform",
                            }}
                        >
                            {contactContent.description.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i === 0 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div data-reveal style={{ opacity: 0, willChange: "opacity, transform" }}>
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
                            {contactContent.emailDescription}
                        </h4>
                        <a
                            href={`mailto:${contactContent.email}`}
                            className="email-link relative inline-block text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight"
                            style={{ textDecoration: "none" }}
                        >
                            {contactContent.email}
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
                            {contactContent.note}
                        </p>
                    </div>
                </div>

                {/* ── Right Column — Form ── */}
                <div ref={rightColRef}>
                    <div ref={formWrapperRef}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Name + Email row */}
                            <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", opacity: 0, willChange: "opacity, transform" }} className="contact-form-row">
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
                            <div data-reveal style={{ opacity: 0, willChange: "opacity, transform" }}>
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
                            <div data-reveal style={{ opacity: 0, willChange: "opacity, transform" }}>
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
                            <div data-reveal style={{ opacity: 0, willChange: "opacity, transform" }}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="contact-submit w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <span style={{ marginLeft: "0.75rem", transition: "transform 0.3s ease" }}>→</span>
                                        </>
                                    )}
                                </button>
                                {error && (
                                    <p className="mt-4 text-red-600 text-sm font-medium">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Success Message */}
                    <div ref={successMessageRef} style={{ display: "none", opacity: 0, padding: "2rem 0" }}>
                        <div style={{
                            width: "48px",
                            height: "48px",
                            background: "rgba(34, 197, 94, 0.1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1.5rem",
                            color: "#22c55e"
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h3 style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#111827",
                            marginBottom: "0.5rem"
                        }}>
                            Message Sent
                        </h3>
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "1rem",
                            color: "#6b7280",
                            maxWidth: "400px"
                        }}>
                            Thank you for reaching out. We&apos;ve received your message and will be in touch shortly.
                        </p>
                        <button
                            onClick={() => {
                                setIsSuccess(false);
                                if (successMessageRef.current) successMessageRef.current.style.display = "none";
                                if (formWrapperRef.current) {
                                    formWrapperRef.current.style.display = "block";
                                    gsap.fromTo(formWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
                                }
                            }}
                            style={{
                                marginTop: "1.5rem",
                                background: "none",
                                border: "none",
                                padding: 0,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "#111827",
                                cursor: "pointer",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px"
                            }}
                        >
                            Send another message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
