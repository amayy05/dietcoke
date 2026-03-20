"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface PreloaderProps {
    progress: number;
    isLoaded: boolean;
}

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                    }}
                >
                    {/* Ambient glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                            }}
                        />
                    </div>

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative mb-12"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-20 h-20 rounded-full border border-white/10"
                            style={{ borderTopColor: "rgba(255,255,255,0.5)" }}
                        />
                        <div className="w-20 h-20 flex items-center justify-center">
                            <Zap className="w-8 h-8 text-white/80" />
                        </div>
                    </motion.div>

                    {/* Brand */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-2xl font-bold text-white/90 tracking-wider mb-2"
                    >
                        BEVERAGE CO.
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="text-sm text-white/40 tracking-widest uppercase mb-12"
                    >
                        Loading Experience
                    </motion.p>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="relative h-[2px] bg-white/10 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 to-white rounded-full"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </motion.div>

                    {/* Percentage */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-xs text-white/30 font-mono tabular-nums"
                    >
                        {Math.round(progress)}%
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
