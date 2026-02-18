"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortfolioItem } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioClient({ item }: { item: PortfolioItem }) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            // Back link slides in
            tl.fromTo(
                backRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8 }
            );

            // Title reveals (Outline & Solid)
            const outlines = titleRef.current?.querySelectorAll(".word-wrapper > span:not(.solid-layer)");
            const solids = titleRef.current?.querySelectorAll(".solid-layer");

            if (outlines && solids) {
                // Set initial state
                gsap.set([outlines, solids], { yPercent: 110, rotateX: -20, opacity: 0 });

                // Animate in
                tl.to([outlines, solids], {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                }, "-=0.4");

                // Wipe effect for solid layer after they appear
                if (solids.length > 0) {
                    tl.fromTo(solids,
                        { clipPath: "inset(100% 0 0 0)" },
                        {
                            clipPath: "inset(0% 0 0 0)",
                            duration: 1.0,
                            ease: "power2.inOut",
                            stagger: 0.1
                        },
                        "-=0.8"
                    );
                }
            }

            // Tagline clips in
            tl.fromTo(
                taglineRef.current,
                { opacity: 0, y: 15, clipPath: "inset(0 0 100% 0)" },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.9,
                },
                "-=0.5"
            );

            // Meta (Industry + Location) clips in
            tl.fromTo(
                metaRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.3"
            );

            // Image reveal
            tl.fromTo(
                imageRef.current,
                { opacity: 0, scale: 0.95, clipPath: "inset(100% 0 0 0)" },
                {
                    opacity: 1,
                    scale: 1,
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    ease: "power2.out"
                },
                "-=0.8"
            );

            // Mission statement reveal
            if (missionRef.current) {
                gsap.fromTo(
                    missionRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: missionRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Content details stagger in
            const details = contentRef.current?.querySelectorAll(".detail-item");
            if (details) {
                gsap.fromTo(
                    details,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Service tags stagger in
            const tags = servicesRef.current?.querySelectorAll(".service-tag");
            if (tags) {
                gsap.fromTo(
                    tags,
                    { opacity: 0, y: 10, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.06,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: servicesRef.current,
                            start: "top 90%",
                        }
                    }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, [item]);

    const titleWords = item.name.split(" ");

    return (
        <main className="min-h-screen w-full bg-[#fafafa] px-6 py-12 sm:px-12 md:px-24 lg:px-32">
            <div ref={containerRef} className="mx-auto w-full max-w-7xl pt-12 md:pt-24">

                {/* Top Section Use Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">

                    {/* Left: Content */}
                    <div className="flex flex-col justify-center">
                        {/* Navigation */}
                        <div ref={backRef} className="mb-12" style={{ opacity: 0 }}>
                            <button
                                onClick={() => router.push("/?target=portfolio")}
                                className="group inline-flex items-center text-sm font-medium text-neutral-400 transition-colors hover:text-black bg-transparent border-none cursor-pointer p-0 font-sans"
                            >
                                <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
                                    ←
                                </span>
                                Back to Portfolio
                            </button>
                        </div>

                        {/* Title */}
                        <header className="mb-8">
                            <div ref={titleRef} className="flex flex-wrap gap-x-4 gap-y-2 relative z-10">
                                {titleWords.map((word, i) => (
                                    <div
                                        key={word + i}
                                        className="word-container overflow-hidden relative"
                                        style={{ perspective: "600px" }}
                                    >
                                        <div className="word-wrapper relative inline-block leading-[0.85] tracking-tighter">
                                            {/* Bottom Layer: Outline */}
                                            <span
                                                aria-hidden="true"
                                                className="inline-block font-sans font-bold text-transparent absolute top-0 left-0 select-none"
                                                style={{
                                                    fontSize: "clamp(3rem, 8vw, 6rem)",
                                                    WebkitTextStroke: "1px #000000",
                                                }}
                                            >
                                                {word}
                                            </span>

                                            {/* Top Layer: Solid */}
                                            <span
                                                className="solid-layer inline-block font-sans font-bold text-[#000000] relative z-10"
                                                style={{
                                                    fontSize: "clamp(3rem, 8vw, 6rem)",
                                                    willChange: "clip-path"
                                                }}
                                            >
                                                {word}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p
                                ref={taglineRef}
                                className="mt-8 text-lg font-medium text-neutral-500 sm:text-xl md:text-2xl"
                                style={{ opacity: 0 }}
                            >
                                {item.tagline}
                            </p>

                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-black"
                                >
                                    Visit Site
                                    <span className="text-base">↗</span>
                                </a>
                            )}

                            {/* Industry + Location metadata */}
                            <div ref={metaRef} className="mt-8 flex items-center gap-3" style={{ opacity: 0 }}>
                                <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                                    {item.industry}
                                </span>
                                {item.location && (
                                    <>
                                        <span className="text-neutral-300">·</span>
                                        <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                                            {item.location}
                                        </span>
                                    </>
                                )}
                            </div>
                        </header>
                    </div>

                    {/* Right: Image */}
                    <div className="flex items-center justify-center">
                        <div ref={imageRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-200" style={{ opacity: 0 }}>
                            <img
                                src={item.screenshot || item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                            />
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                <div ref={missionRef} className="my-24 py-12" style={{ opacity: 0 }}>
                    <p className="font-sans text-2xl font-light leading-relaxed text-neutral-700 sm:text-3xl md:text-4xl lg:text-[2.5rem] max-w-4xl">
                        {item.mission}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-neutral-200" />

                {/* Details Grid */}
                <div ref={contentRef} className="grid grid-cols-1 gap-12 md:grid-cols-3 py-24">

                    {/* Problem */}
                    <div className="detail-item space-y-4" style={{ opacity: 0 }}>
                        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400">
                            The Problem
                        </h4>
                        <p className="font-sans text-lg text-neutral-800">
                            {item.problemItSolves}
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="detail-item space-y-4" style={{ opacity: 0 }}>
                        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400">
                            What It Does
                        </h4>
                        <p className="font-sans text-lg text-neutral-800">
                            {item.whatItDoes}
                        </p>
                    </div>

                    {/* Role */}
                    <div className="detail-item space-y-4" style={{ opacity: 0 }}>
                        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400">
                            Comet&apos;s Role
                        </h4>
                        <p className="font-sans text-lg text-neutral-800">
                            {item.cometRole}
                        </p>
                    </div>

                </div>

                {/* Divider */}
                <div className="h-px w-full bg-neutral-200" />

                {/* Service Tags */}
                {item.services && item.services.length > 0 && (
                    <div ref={servicesRef} className="py-16">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                            Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {item.services.map((service) => (
                                <span
                                    key={service}
                                    className="service-tag inline-block rounded-full border border-neutral-200 px-5 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700"
                                    style={{ opacity: 0 }}
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
