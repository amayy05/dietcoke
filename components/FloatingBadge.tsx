"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface FloatingBadgeProps {
    product: Product;
}

export default function FloatingBadge({ product }: FloatingBadgeProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            // Show after scrolling past 1 viewport height, hide near top
            setVisible(scrollY > viewportHeight && scrollY < document.body.scrollHeight - viewportHeight * 2);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/15 shadow-2xl"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                    }}
                >
                    <div
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ backgroundColor: product.themeColor }}
                    />
                    <span className="text-sm font-semibold text-white/90 tracking-wide">
                        {product.name}
                    </span>
                    <span className="text-sm text-white/50">•</span>
                    <span className="text-sm font-bold text-white/80">
                        {product.price}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
