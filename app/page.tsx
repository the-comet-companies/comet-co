"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }

    // Section divider animations
    const dividers = document.querySelectorAll(".section-divider");
    dividers.forEach((divider) => {
      gsap.to(divider, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: divider,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Subtle grain texture overlay */}
      <div className="grain-overlay" />

      <Hero />
      <Portfolio />
      <Philosophy />
      <Contact />
    </main>
  );
}
