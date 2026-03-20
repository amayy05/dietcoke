"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Zap className="text-white w-8 h-8" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400 hidden sm:block">
                        Beverage Co.
                    </span>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex space-x-6 text-sm font-medium text-white/80">
                        <a href="#" className="hover:text-white transition-colors">Our Story</a>
                        <a href="#" className="hover:text-white transition-colors">Process</a>
                        <a href="#" className="hover:text-white transition-colors">Sustainability</a>
                    </div>
                    <ThemeToggle />
                    <button className="relative group px-6 py-2 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95">
                        <span className="relative z-10">Order Now</span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
}
