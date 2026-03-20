"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "light") {
            setIsDark(false);
            document.documentElement.classList.add("light-mode");
        }
    }, []);

    const toggle = useCallback(() => {
        setIsDark((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.remove("light-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.add("light-mode");
                localStorage.setItem("theme", "light");
            }
            return next;
        });
    }, []);

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
            ) : (
                <Moon className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
            )}
        </button>
    );
}
