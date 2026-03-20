"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const words = text.split(" ");

    return (
        <motion.span
            className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.5,
                                delay: delay + i * 0.08,
                                ease: [0.25, 0.1, 0.25, 1],
                            },
                        },
                    }}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}
