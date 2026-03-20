"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, Product } from "@/data/products";

export default function ProductComparison() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Get max values for bar scaling
    const maxCalories = Math.max(...products.map((p) => parseInt(p.stats[0].val) || 1));
    const maxCaffeine = Math.max(...products.map((p) => parseInt(p.stats[1].val) || 1));

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 relative z-20">
            <motion.div style={{ opacity }}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
                    Compare Drinks
                </h2>
                <p className="text-center text-white/50 mb-16 text-lg">
                    Find your perfect match
                </p>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((p, idx) => (
                        <ComparisonCard
                            key={p.id}
                            product={p}
                            index={idx}
                            maxCalories={maxCalories}
                            maxCaffeine={maxCaffeine}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function ComparisonCard({
    product,
    index,
    maxCalories,
    maxCaffeine,
}: {
    product: Product;
    index: number;
    maxCalories: number;
    maxCaffeine: number;
}) {
    const calories = parseInt(product.stats[0].val) || 0;
    const caffeine = parseInt(product.stats[1].val) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative p-8 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
            style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            }}
        >
            {/* Ambient glow */}
            <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"
                style={{ background: product.themeColor }}
            />

            <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
            <p className="text-white/50 text-sm mb-6">{product.subName}</p>

            <div className="space-y-5">
                <StatBar label="Calories" value={calories} max={maxCalories} unit="" color={product.themeColor} />
                <StatBar label="Caffeine" value={caffeine} max={maxCaffeine} unit="mg" color={product.themeColor} />
                <div className="flex items-center justify-between pt-2">
                    <span className="text-white/60 text-sm">Size</span>
                    <span className="text-white font-semibold">{product.buyNowSection.unit}</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-3xl font-black text-white">{product.price}</span>
                <span className="text-sm text-white/40 uppercase tracking-wider font-medium">
                    {product.stats[2].val} {product.stats[2].label}
                </span>
            </div>
        </motion.div>
    );
}

function StatBar({
    label,
    value,
    max,
    unit,
    color,
}: {
    label: string;
    value: number;
    max: number;
    unit: string;
    color: string;
}) {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{label}</span>
                <span className="text-white font-semibold text-sm">
                    {value}{unit}
                </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    style={{
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                    }}
                />
            </div>
        </div>
    );
}
