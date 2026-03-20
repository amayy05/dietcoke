"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

interface BottleScrollProps {
    product: Product;
    onLoadProgress?: (progress: number) => void;
}

export default function ProductBottleScroll({ product, onLoadProgress }: BottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameCount = 192;

    const getImageUrl = (index: number) => {
        if (product.id === "dietcoke") {
            return `${product.folderPath}/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
        }
        if (product.id === "monster" || product.id === "redbull") {
            return `${product.folderPath}/ezgif-frame-${String(index).padStart(3, "0")}.png`;
        }
        return `${product.folderPath}/${index}.webp`;
    };

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = getImageUrl(i);
            img.onload = () => {
                loadedCount++;
                onLoadProgress?.((loadedCount / frameCount) * 100);
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }

        // Draw first frame immediately if available
        const firstImg = new Image();
        firstImg.src = getImageUrl(1);
        firstImg.onload = () => {
            if (images.length === 0) renderFrame(firstImg);
        };
    }, [product]);

    const renderFrame = (img: HTMLImageElement) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw with 'cover' behavior
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas proportion - scale to match height
            drawW = h * imgRatio;
            drawH = h;
            drawX = (w - drawW) / 2;
            drawY = 0;
        } else {
            // Image is taller than canvas proportion - scale to match width
            drawW = w;
            drawH = w / imgRatio;
            drawX = 0;
            drawY = (h - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    useEffect(() => {
        if (images.length === 0) return;

        const unsubscribe = frameIndex.on("change", (latest: number) => {
            const idx = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(latest) - 1)
            );
            if (images[idx]) {
                requestAnimationFrame(() => renderFrame(images[idx]));
            }
        });

        return () => unsubscribe();
    }, [images, frameIndex, frameCount]);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Match the sticky container dimensions
                canvasRef.current.width = window.innerWidth;
                // Adjust height for text overlay space
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame
                const currentIdx = Math.min(
                    frameCount - 1,
                    Math.max(0, Math.floor(frameIndex.get()) - 1)
                );
                if (images[currentIdx]) {
                    renderFrame(images[currentIdx]);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images, frameIndex, frameCount]);

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain mix-blend-normal"
                />
            </div>
        </div>
    );
}
