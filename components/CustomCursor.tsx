"use client";

import { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
    themeColor: string;
}

export default function CustomCursor({ themeColor }: CustomCursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const handleMouseMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest("button, a, [role='button'], input, [data-cursor-hover]")) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest("button, a, [role='button'], input, [data-cursor-hover]")) {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);
        document.documentElement.addEventListener("mouseleave", handleMouseOut);
        document.documentElement.addEventListener("mouseenter", () => setIsVisible(true));

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            document.documentElement.removeEventListener("mouseleave", handleMouseOut);
        };
    }, [isVisible]);

    useEffect(() => {
        if (isTouchDevice) return;

        let animId: number;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }
            if (glowRef.current) {
                glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Glow */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: isHovering ? 80 : 40,
                    height: isHovering ? 80 : 40,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${themeColor}40 0%, transparent 70%)`,
                    transition: "width 0.3s ease, height 0.3s ease, background 0.5s ease",
                    opacity: isVisible ? 1 : 0,
                }}
            />
            {/* Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: isHovering ? 16 : 8,
                    height: isHovering ? 16 : 8,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: `0 0 12px 2px ${themeColor}80`,
                    transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.5s ease",
                    opacity: isVisible ? 1 : 0,
                    mixBlendMode: "difference",
                }}
            />
        </>
    );
}
