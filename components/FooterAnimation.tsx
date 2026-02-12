"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterAnimation() {
    const footerRef = useRef<HTMLElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLParagraphElement>(null);
    const rightRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate border line
            if (borderRef.current) {
                gsap.fromTo(
                    borderRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 95%",
                            once: true,
                        },
                    }
                );
            }

            // Animate footer text
            [leftRef.current, rightRef.current].forEach((el, i) => {
                if (el) {
                    gsap.fromTo(
                        el,
                        { opacity: 0, y: 10 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: 0.3 + i * 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: footerRef.current,
                                start: "top 95%",
                                once: true,
                            },
                        }
                    );
                }
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="px-6 py-12 sm:px-12 md:px-24 lg:px-32"
        >
            <div
                ref={borderRef}
                className="w-full h-px bg-neutral-100 mb-12 origin-left"
                style={{ transform: "scaleX(0)" }}
            />
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p
                    ref={leftRef}
                    className="font-sans text-[10px] font-medium tracking-[0.2em] text-neutral-300 uppercase"
                    style={{ opacity: 0 }}
                >
                    © {new Date().getFullYear()} The Comet Companies
                </p>
                <p
                    ref={rightRef}
                    className="font-sans text-[10px] font-medium tracking-[0.2em] text-neutral-300 uppercase"
                    style={{ opacity: 0 }}
                >
                    Built with intent.
                </p>
            </div>
        </footer>
    );
}
