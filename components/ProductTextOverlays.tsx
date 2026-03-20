"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

// Decorative patterns for each section index
const decorations = [
    // Section 0: Large outlined text behind + horizontal lines
    { bgText: true, lines: false, ring: false, dots: false },
    // Section 1: Floating rings + gradient divider
    { bgText: false, lines: true, ring: true, dots: false },
    // Section 2: Dot grid pattern
    { bgText: false, lines: false, ring: false, dots: true },
    // Section 3: Accent lines + ring
    { bgText: true, lines: true, ring: false, dots: false },
];

export default function ProductTextOverlays({ product }: { product: Product }) {
    const sections = [
        product.section1,
        product.section2,
        product.section3,
        product.section4,
    ];

    return (
        <div className="relative z-10 w-full">
            {sections.map((section, idx) => (
                <ParallaxSection
                    key={idx}
                    section={section}
                    index={idx}
                    themeColor={product.themeColor}
                />
            ))}
        </div>
    );
}

function ParallaxSection({
    section,
    index,
    themeColor,
}: {
    section: { title: string; subtitle: string };
    index: number;
    themeColor: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

    // Decorative element parallax
    const decoY1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const decoY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const decoRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const decoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    const deco = decorations[index % decorations.length];

    return (
        <div
            ref={ref}
            className="relative flex flex-col items-center justify-center p-8 text-center min-h-[70vh] py-32 overflow-hidden"
        >
            {/* Background gradient glow */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]) }}
                className="absolute inset-0 pointer-events-none"
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20"
                    style={{ background: themeColor }}
                />
            </motion.div>

            {/* Large faded background text */}
            {deco.bgText && (
                <motion.div
                    style={{ y: decoY1, opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0]), scale: decoScale }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                >
                    <span className="text-[12rem] md:text-[20rem] font-black text-white whitespace-nowrap leading-none">
                        {section.title.replace(".", "")}
                    </span>
                </motion.div>
            )}

            {/* Floating rings */}
            {deco.ring && (
                <>
                    <motion.div
                        style={{ y: decoY1, rotate: decoRotate, opacity }}
                        className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 pointer-events-none"
                    />
                    <motion.div
                        style={{ y: decoY2, rotate: decoRotate, opacity }}
                        className="absolute bottom-20 left-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/[0.07] pointer-events-none"
                    />
                </>
            )}

            {/* Horizontal accent lines */}
            {deco.lines && (
                <>
                    <motion.div
                        style={{ opacity, scaleX: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]) }}
                        className="absolute top-1/2 left-0 w-full h-px pointer-events-none origin-left"
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 0.5, 0.5, 0]) }}
                        className="absolute top-[calc(50%+40px)] left-[20%] right-[20%] h-px pointer-events-none"
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </motion.div>
                </>
            )}

            {/* Dot grid pattern */}
            {deco.dots && (
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]), y: decoY2 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${themeColor}40 1px, transparent 1px)`,
                            backgroundSize: "30px 30px",
                        }}
                    />
                </motion.div>
            )}

            {/* Animated top accent bar */}
            <motion.div
                className="w-16 h-[2px] mb-8 origin-center rounded-full"
                style={{
                    background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                    scaleX: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]),
                    opacity,
                }}
            />

            {/* Title */}
            <motion.h2
                style={{ y: titleY, opacity, scale }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white relative z-10"
            >
                {section.title}
            </motion.h2>

            {/* Subtitle */}
            {section.subtitle && (
                <motion.p
                    style={{ y: subtitleY, opacity }}
                    className="max-w-xl text-xl md:text-2xl font-medium text-white/70 drop-shadow-md relative z-10"
                >
                    {section.subtitle}
                </motion.p>
            )}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>
    );
}
