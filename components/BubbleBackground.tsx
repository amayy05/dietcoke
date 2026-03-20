"use client";

import { useEffect, useRef } from "react";

interface BubbleBackgroundProps {
    themeColor: string;
}

interface Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    wobbleSpeed: number;
    wobbleAmount: number;
    phase: number;
}

export default function BubbleBackground({ themeColor }: BubbleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const animRef = useRef<number>(0);
    const colorRef = useRef(themeColor);

    // Update color ref without re-initializing
    useEffect(() => {
        colorRef.current = themeColor;
    }, [themeColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create bubbles
        const bubbleCount = 35;
        const bubbles: Bubble[] = [];
        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * canvas.height,
                radius: Math.random() * 4 + 1,
                speed: Math.random() * 0.6 + 0.2,
                opacity: Math.random() * 0.15 + 0.03,
                wobbleSpeed: Math.random() * 0.02 + 0.005,
                wobbleAmount: Math.random() * 30 + 10,
                phase: Math.random() * Math.PI * 2,
            });
        }
        bubblesRef.current = bubbles;

        let time = 0;

        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const b of bubblesRef.current) {
                b.y -= b.speed;
                b.x += Math.sin(time * b.wobbleSpeed + b.phase) * 0.3;

                // Reset when off screen
                if (b.y < -20) {
                    b.y = canvas.height + 20;
                    b.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(
                    b.x + Math.sin(time * b.wobbleSpeed + b.phase) * b.wobbleAmount,
                    b.y,
                    b.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = colorRef.current + Math.round(b.opacity * 255).toString(16).padStart(2, "0");
                ctx.fill();

                // Highlight ring
                ctx.beginPath();
                ctx.arc(
                    b.x + Math.sin(time * b.wobbleSpeed + b.phase) * b.wobbleAmount,
                    b.y,
                    b.radius,
                    0,
                    Math.PI * 2
                );
                ctx.strokeStyle = "rgba(255,255,255," + (b.opacity * 0.5) + ")";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
        />
    );
}
