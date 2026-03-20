"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import BubbleBackground from "@/components/BubbleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollToTop from "@/components/ScrollToTop";
import SoundToggle, { playFizz } from "@/components/SoundToggle";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import ProductComparison from "@/components/ProductComparison";
import TiltCard from "@/components/TiltCard";
import GlowCard from "@/components/GlowCard";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Leaf, ShieldCheck, Zap } from "lucide-react";

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const product = products[currentIndex];

    // Mobile swipe
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            handleNext();
        } else {
            handlePrev();
        }
    };

    const handleLoadProgress = useCallback((progress: number) => {
        setLoadProgress(progress);
        if (progress >= 100) {
            setTimeout(() => setIsLoaded(true), 400);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.setProperty("--product-gradient", product.gradient);
    }, [currentIndex, product]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        if (soundEnabled) playFizz();
    }, [soundEnabled]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
        if (soundEnabled) playFizz();
    }, [soundEnabled]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                handlePrev();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    // Sound toggle handler
    const handleSoundToggle = useCallback(() => {
        setSoundEnabled((prev) => !prev);
    }, []);

    return (
        <main
            className="min-h-screen font-sans selection:bg-orange-500 selection:text-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Preloader progress={loadProgress} isLoaded={isLoaded} />
            <CustomCursor themeColor={product.themeColor} />
            <BubbleBackground themeColor={product.themeColor} />
            <ScrollProgress themeColor={product.themeColor} />
            <FloatingBadge product={product} />
            <ScrollToTop />
            <SoundToggle />
            <Navbar />

            {/* Navigation Arrows */}
            <div className="fixed inset-y-0 left-4 flex items-center z-40 pointer-events-none hidden md:flex">
                <MagneticButton
                    onClick={handlePrev}
                    className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110 active:scale-90"
                >
                    <ChevronLeft className="w-6 h-6" />
                </MagneticButton>
            </div>
            <div className="fixed inset-y-0 right-4 flex items-center z-40 pointer-events-none hidden md:flex">
                <MagneticButton
                    onClick={handleNext}
                    className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110 active:scale-90"
                >
                    <ChevronRight className="w-6 h-6" />
                </MagneticButton>
            </div>

            {/* Bottom Nav Pill */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                {products.map((p, idx) => (
                    <button
                        key={p.id}
                        onClick={() => {
                            setCurrentIndex(idx);
                            if (soundEnabled) playFizz();
                        }}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white scale-125 md:w-8" : "bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to ${p.name}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative w-full"
                >
                    {/* Hero Scrollytelling Section */}
                    <div className="relative">
                        <ProductBottleScroll product={product} onLoadProgress={handleLoadProgress} />
                    </div>

                    {/* Text Sections (appear after scroll animation) */}
                    <ProductTextOverlays product={product} />

                    {/* Product Details Section */}
                    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm">
                                    <TextReveal text={product.detailsSection.title} />
                                </h2>
                                <p className="text-lg text-white/80 leading-relaxed mb-8">
                                    <TextReveal text={product.detailsSection.description} delay={0.3} />
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.stats.map((stat, i) => (
                                        <TiltCard key={i} className="rounded-2xl">
                                            <GlowCard className="rounded-2xl" themeColor={product.themeColor}>
                                                <div className="text-center p-4">
                                                    <div className="text-2xl font-bold text-white mb-1">
                                                        <AnimatedCounter value={stat.val} />
                                                    </div>
                                                    <div className="text-sm font-medium text-white/60 tracking-wider uppercase">{stat.label}</div>
                                                </div>
                                            </GlowCard>
                                        </TiltCard>
                                    ))}
                                </div>
                            </div>
                            <TiltCard className="rounded-3xl" tiltAmount={6}>
                                <div className="relative h-96 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center shadow-2xl">
                                    <div className="text-center p-8">
                                        <Leaf className="w-16 h-16 mx-auto mb-4 text-white/50" />
                                        <h3 className="text-2xl font-bold text-white/80 mb-2">{product.detailsSection.imageAlt}</h3>
                                        <p className="text-white/50">Premium Quality Ingredients</p>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    </section>

                    {/* Freshness Section */}
                    <section className="py-24 px-6 md:px-12 bg-black/20 text-white relative z-20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <Zap className="w-12 h-12 mx-auto mb-6 text-white/70" />
                            <h2 className="text-4xl font-bold mb-6">
                                <TextReveal text={product.freshnessSection.title} />
                            </h2>
                            <p className="text-xl text-white/80 leading-relaxed">
                                <TextReveal text={product.freshnessSection.description} delay={0.2} />
                            </p>
                        </motion.div>
                    </section>

                    {/* Product Comparison Section */}
                    <ProductComparison />

                    {/* Buy Now Section */}
                    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
                        <TiltCard className="rounded-[3rem]" tiltAmount={4}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-[3rem] p-10 md:p-16 text-center border border-white/20 shadow-2xl"
                                style={{
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)`,
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <h2 className="text-5xl md:text-7xl font-extrabold mb-4">{product.name}</h2>
                                <p className="text-2xl text-white/80 mb-12">{product.subName}</p>

                                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                                    <GlowCard className="rounded-3xl w-full md:w-auto" themeColor={product.themeColor}>
                                        <div className="text-left px-8 py-6">
                                            <div className="text-5xl font-black text-white mb-2">
                                                <AnimatedCounter value={product.buyNowSection.price.replace("₹", "")} className="" />
                                                <span className="text-5xl font-black text-white"> ₹</span>
                                            </div>
                                            <div className="text-white/60 font-medium">{product.buyNowSection.unit}</div>
                                        </div>
                                    </GlowCard>

                                    <div className="flex flex-col gap-4 text-left w-full md:w-auto">
                                        {product.buyNowSection.processingParams.map((param, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                                className="flex items-center gap-3 text-white/90"
                                            >
                                                <ShieldCheck className="w-6 h-6 text-green-400" />
                                                <span className="font-semibold text-lg">{param}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <MagneticButton
                                    className="group relative w-full md:w-auto px-12 py-5 rounded-full bg-white text-black text-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
                                    strength={0.2}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <ShoppingCart className="w-6 h-6" /> Add to Box
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></div>
                                </MagneticButton>

                                <div className="mt-12 text-sm text-white/60 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <p>🚚 {product.buyNowSection.deliveryPromise}</p>
                                    <p>✨ {product.buyNowSection.returnPolicy}</p>
                                </div>
                            </motion.div>
                        </TiltCard>
                    </section>

                    {/* Next Flavor Button */}
                    <div className="relative z-20 w-full bg-black">
                        <MagneticButton
                            onClick={handleNext}
                            className="w-full text-center py-20 px-6 group transition-colors duration-500 hover:bg-white/5"
                            strength={0.05}
                        >
                            <p className="text-white/50 text-sm tracking-widest uppercase mb-4 font-bold">Continue Journey</p>
                            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/50 group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                                Discover Next Flavor
                            </h3>
                        </MagneticButton>
                    </div>
                </motion.div>
            </AnimatePresence>

            <Footer />
        </main>
    );
}
