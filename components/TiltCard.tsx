"use client";

import { useRef, useState, useCallback } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltAmount?: number;
}

export default function TiltCard({ children, className = "", tiltAmount = 10 }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");
    const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * tiltAmount;
        const rotateY = (x - 0.5) * tiltAmount;

        setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        setGlareStyle({
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: 1,
        });
    }, [tiltAmount]);

    const handleMouseLeave = useCallback(() => {
        setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
        setGlareStyle({ opacity: 0 });
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={{
                transform,
                transition: "transform 0.2s ease-out",
                transformStyle: "preserve-3d",
            }}
        >
            {children}
            <div
                className="absolute inset-0 pointer-events-none rounded-inherit z-10"
                style={{
                    ...glareStyle,
                    transition: "opacity 0.3s ease-out",
                }}
            />
        </div>
    );
}
