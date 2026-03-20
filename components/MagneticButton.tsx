"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export default function MagneticButton({
    children,
    className = "",
    onClick,
    strength = 0.3,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;
            setTransform(`translate(${deltaX}px, ${deltaY}px)`);
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        setTransform("translate(0px, 0px)");
    }, []);

    return (
        <button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            style={{
                transform,
                transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
            }}
        >
            {children}
        </button>
    );
}
