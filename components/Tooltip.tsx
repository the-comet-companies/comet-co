"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && tooltipRef.current) {
            gsap.fromTo(
                tooltipRef.current,
                { opacity: 0, y: 10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
            );
        }
    }, [isVisible]);

    return (
        <div
            className="relative inline-flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                        padding: "0.5rem 0.75rem",
                        backgroundColor: "#111827",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        borderRadius: "0.375rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        zIndex: 50,
                        pointerEvents: "none",
                    }}
                >
                    {content}
                    {/* Arrow */}
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderWidth: "4px",
                            borderStyle: "solid",
                            borderColor: "#111827 transparent transparent transparent",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
