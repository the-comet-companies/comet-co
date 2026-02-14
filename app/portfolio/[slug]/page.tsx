"use client";

import { use, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioItemPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const item = portfolioItems.find((p) => p.slug === slug);
    const containerRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!item) {
            notFound();
        }
    }, [item]);

    useEffect(() => {
        if (!item || !containerRef.current) return;

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

            // Title reveals word by word
            const words = titleRef.current?.querySelectorAll(".word-reveal > span");
            if (words) {
                tl.fromTo(
                    words,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 1.1,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
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

        }, containerRef);

        return () => ctx.revert();
    }, [item]);

    if (!item) return null;

    const titleWords = item.name.split(" ");

    return (
        <main className="min-h-screen w-full bg-[#fafafa] px-6 py-12 sm:px-12 md:px-24 lg:px-32 overflow-hidden">
            <div ref={containerRef} className="mx-auto w-full max-w-7xl pt-12 md:pt-24">

                {/* Top Section Use Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">

                    {/* Left: Content */}
                    <div className="flex flex-col justify-center">
                        {/* Navigation */}
                        <div ref={backRef} className="mb-12" style={{ opacity: 0 }}>
                            <Link
                                href="/"
                                className="group inline-flex items-center text-sm font-medium text-neutral-400 transition-colors hover:text-black"
                            >
                                <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
                                    ←
                                </span>
                                Back to Portfolio
                            </Link>
                        </div>

                        {/* Title */}
                        <header className="mb-8">
                            <div ref={titleRef} className="flex flex-wrap gap-x-4 gap-y-2">
                                {titleWords.map((word, i) => (
                                    <div key={word + i} className="word-reveal overflow-hidden">
                                        <span className="inline-block font-sans text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl will-change-transform">
                                            {word}
                                        </span>
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

                {/* Divider */}
                <div className="my-24 h-px w-full bg-neutral-200" />

                {/* Bottom Section: Details Grid */}
                <div ref={contentRef} className="grid grid-cols-1 gap-12 md:grid-cols-3">

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
                            Comet's Role
                        </h4>
                        <p className="font-sans text-lg text-neutral-800">
                            {item.cometRole}
                        </p>
                    </div>

                </div>

            </div>
        </main>
    );
}
