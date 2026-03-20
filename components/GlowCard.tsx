"use client";

import { ReactNode } from "react";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    themeColor?: string;
}

export default function GlowCard({ children, className = "", themeColor = "#ffffff" }: GlowCardProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Animated gradient border */}
            <div
                className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
                style={{
                    background: `conic-gradient(from var(--glow-angle, 0deg), transparent 40%, ${themeColor}80 50%, transparent 60%)`,
                    animation: "glowSpin 3s linear infinite",
                }}
            />
            {/* Card body */}
            <div className="relative rounded-[inherit] bg-white/5 backdrop-blur-sm border border-white/10 h-full">
                {children}
            </div>
        </div>
    );
}
