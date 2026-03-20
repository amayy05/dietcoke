"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: string;
    className?: string;
    duration?: number;
}

export default function AnimatedCounter({ value, className = "", duration = 1.5 }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("0");

    // Extract numeric part and suffix
    const numericMatch = value.match(/^(\d+\.?\d*)/);
    const numericPart = numericMatch ? parseFloat(numericMatch[1]) : 0;
    const suffix = numericMatch ? value.slice(numericMatch[0].length) : value;
    const isDecimal = value.includes(".");

    useEffect(() => {
        if (!isInView || numericPart === 0) {
            if (numericPart === 0 && isInView) setDisplayValue("0");
            return;
        }

        let startTime: number | null = null;
        let animId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * numericPart;

            if (isDecimal) {
                setDisplayValue(current.toFixed(1));
            } else {
                setDisplayValue(Math.floor(current).toString());
            }

            if (progress < 1) {
                animId = requestAnimationFrame(animate);
            }
        };

        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [isInView, numericPart, duration, isDecimal]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {displayValue}{suffix}
        </motion.span>
    );
}
