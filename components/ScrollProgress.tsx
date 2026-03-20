"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
    themeColor: string;
}

export default function ScrollProgress({ themeColor }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
            style={{
                scaleX,
                background: `linear-gradient(90deg, ${themeColor}, ${themeColor}cc, white)`,
            }}
        />
    );
}
